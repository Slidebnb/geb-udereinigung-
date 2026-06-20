import sharp from 'sharp';

const MAX_INPUT_PIXELS = 40_000_000;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 600;

export async function processClientLogo(input: Buffer) {
  const image = sharp(input, {
    animated: false,
    failOn: 'error',
    limitInputPixels: MAX_INPUT_PIXELS,
    pages: 1,
    sequentialRead: true,
  });

  const metadata = await image.metadata();
  if (!metadata.format || !metadata.width || !metadata.height) {
    throw new Error('Die Datei enthält kein lesbares Bild.');
  }

  const output = await image
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90, effort: 4, smartSubsample: true })
    .toBuffer();

  const { data: pixels, info } = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let weightedLuminance = 0;
  let alphaWeight = 0;
  for (let index = 0; index < pixels.length; index += info.channels) {
    const alpha = pixels[index + 3] / 255;
    if (alpha < 0.08) continue;
    weightedLuminance += (pixels[index] * 0.2126 + pixels[index + 1] * 0.7152 + pixels[index + 2] * 0.0722) * alpha;
    alphaWeight += alpha;
  }
  const averageLuminance = alphaWeight ? weightedLuminance / alphaWeight : 128;

  return {
    buffer: output,
    sourceFormat: metadata.format,
    sourceSize: input.length,
    outputSize: output.length,
    backdrop: averageLuminance >= 165 ? 'dark' as const : 'light' as const,
  };
}
