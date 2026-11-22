interface HuwaLogoProps {
  iconSize?: number;
  showText?: boolean;
  className?: string;
}

export default function HuwaLogo({ iconSize = 40, showText = true, className = '' }: HuwaLogoProps) {
  const h = Math.round(iconSize * 95 / 110);
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={iconSize}
        height={h}
        viewBox="0 0 110 95"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {/* Blue chevron ^ */}
        <polygon points="5,78 46,10 88,78 73,78 46,30 21,78" fill="#4BB8F5"/>
        {/* Green diagonal band */}
        <polygon points="50,78 92,78 78,10 58,25" fill="#2DC94E"/>
      </svg>
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
