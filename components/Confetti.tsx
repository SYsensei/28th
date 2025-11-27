import React, { useEffect, useState } from 'react';

const COLORS = ['#FFC0CB', '#FFD700', '#87CEEB', '#98FB98', '#FFA07A'];

export const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animation: `fall 3s linear infinite ${p.delay}`,
          }}
        />
      ))}
    </div>
  );
};