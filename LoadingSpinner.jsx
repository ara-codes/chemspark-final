import React, { useEffect, useState } from 'react';

/**
 * LoadingSpinner — reusable loading state with a droplet motif.
 */
export default function LoadingSpinner({ message = 'Loading…', size = 'md' }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 350);
    return () => clearInterval(id);
  }, []);

  const sizeClass = size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className={`relative ${sizeClass}`}>
        <div className="absolute inset-0 rounded-full border-2 border-muted-green/20 animate-pulse-soft" />
        <div className="absolute inset-1 rounded-full border-2 border-t-transparent border-deep-green animate-spin" />
        <div className="absolute inset-2.5 rounded-full bg-accent-gold/40 animate-pulse-soft" />
      </div>
      <p className="text-sm text-muted-green">
        {message}
        {'.'.repeat(dots)}
      </p>
    </div>
  );
}