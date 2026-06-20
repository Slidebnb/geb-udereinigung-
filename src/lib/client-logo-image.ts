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

  return {
    buffer: output,
    sourceFormat: metadata.format,
    sourceSize: input.length,
    outputSize: output.length,
  };
}
