import React from 'react';

interface SausageDogProps {
  className?: string;
}

export const SausageDog: React.FC<SausageDogProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
        {/* Tail */}
        <path 
          d="M20,50 Q10,40 10,30" 
          stroke="#8B4513" 
          strokeWidth="6" 
          fill="none" 
          className="origin-[20px_50px] animate-[tail-wag_0.2s_ease-in-out_infinite]"
        />
        
        {/* Body (Long!) */}
        <rect x="20" y="40" width="140" height="40" rx="20" fill="#8B4513" />
        
        {/* Legs */}
        <rect x="30" y="70" width="10" height="25" rx="5" fill="#654321" />
        <rect x="50" y="70" width="10" height="25" rx="5" fill="#654321" />
        <rect x="130" y="70" width="10" height="25" rx="5" fill="#654321" />
        <rect x="150" y="70" width="10" height="25" rx="5" fill="#654321" />

        {/* Head */}
        <ellipse cx="160" cy="45" rx="25" ry="22" fill="#8B4513" />
        
        {/* Snout */}
        <path d="M175,45 L195,50 L175,55 Z" fill="#8B4513" />
        <circle cx="195" cy="50" r="3" fill="#000" />

        {/* Ear (Floppy) */}
        <path d="M160,35 Q190,60 160,80" fill="#654321" />

        {/* Eye (Blinking) */}
        <g className="origin-[165px_40px] animate-[blink_4s_infinite]">
            <circle cx="165" cy="40" r="3" fill="#000" />
            <circle cx="166" cy="39" r="1" fill="#FFF" />
        </g>

        {/* Collar */}
        <rect x="145" y="40" width="5" height="40" fill="#EF4444" rx="2" />
        <circle cx="147.5" cy="65" r="3" fill="#FCD34D" />
      </svg>
    </div>
  );
};