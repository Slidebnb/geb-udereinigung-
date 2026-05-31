export default function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div className="hero-orb-1 absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(75,184,245,0.18) 0%, transparent 70%)' }} />
      <div className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(45,201,78,0.12) 0%, transparent 70%)' }} />
      <div className="hero-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(75,184,245,0.06) 0%, transparent 60%)' }} />

      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#4BB8F5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-0 w-px h-full opacity-10"
           style={{ background: 'linear-gradient(180deg, transparent, #4BB8F5 40%, #2DC94E 60%, transparent)' }} />
    </div>
  );
}
