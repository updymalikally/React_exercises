import { useEffect, useState } from 'react';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="tracker-card" aria-label="Mouse position">
      <div className="card-topline"><span className="live-dot" /> Live coordinates</div>
      <div className="coordinate-grid" aria-live="polite" aria-atomic="true">
        <div className="coordinate"><span className="axis">X</span><strong>{position.x}</strong><small>horizontal</small></div>
        <div className="coordinate"><span className="axis">Y</span><strong>{position.y}</strong><small>vertical</small></div>
      </div>
      <p className="card-hint">Move your cursor anywhere to see the coordinates update.</p>
    </section>
  );
}
