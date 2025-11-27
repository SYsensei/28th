import React, { useEffect, useState } from 'react';

const COLORS = ['#FFC0CB', '#FFD700', '#87CEEB', '#98FB98', '#FFA07A'];

export const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: string; delay: string; color: string; type: 'rect' | 'bone' }>>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: Math.random() > 0.5 ? 'bone' as const : 'rect' as const,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-0"
          style={{
            left: p.left,
            animation: `fall 3s linear infinite ${p.delay}`,
            width: p.type === 'rect' ? '10px' : '20px',
            height: p.type === 'rect' ? '10px' : '10px',
          }}
        >
            {p.type === 'rect' ? (
                <div style={{ width: '100%', height: '100%', backgroundColor: p.color }} />
            ) : (
                // Simple bone SVG shape
                <svg viewBox="0 0 24 12" fill={p.color}>
                    <path d="M4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C0.9 4 0 4.9 0 6C0 7.1 0.9 8 2 8C3.1 8 4 7.1 4 6L20 6C20 7.1 20.9 8 22 8C23.1 8 24 7.1 24 6C24 4.9 23.1 4 22 4C23.1 4 24 3.1 24 2C24 0.9 23.1 0 22 0C20.9 0 20 0.9 20 2L4 2Z" />
                </svg>
            )}
        </div>
      ))}
    </div>
  );
};