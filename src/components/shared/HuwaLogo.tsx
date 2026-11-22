import Image from 'next/image';

interface HuwaLogoProps {
  iconSize?: number;
  showText?: boolean;
  className?: string;
}

export default function HuwaLogo({ iconSize = 40, showText = true, className = '' }: HuwaLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="HUWA Logo"
        width={iconSize}
        height={iconSize}
        className="object-contain"
        priority
      />
      {showText && (
        <div>
          <div className="font-extrabold text-white text-lg leading-none tracking-widest">HUWA</div>
          <div className="text-[9px] text-white/40 leading-none tracking-[0.2em] uppercase mt-0.5">
            Gebäudereinigung
          </div>
        </div>
      )}
    </div>
  );
}
