import { useEffect, useState } from 'react';

const DEFAULT_SECONDS = 25 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function StudyTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;
    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft === 0) setIsRunning(false);
  }, [secondsLeft]);

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(DEFAULT_SECONDS);
  }

  const progress = ((DEFAULT_SECONDS - secondsLeft) / DEFAULT_SECONDS) * 100;

  return (
    <section className="mx-auto w-full max-w-xl rounded-panel bg-white px-6 py-8 text-center shadow-card sm:px-10" aria-labelledby="timer-title">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-lavender-600">A little focus time</p>
      <h1 id="timer-title" className="text-2xl font-bold tracking-tight text-ink">Study Timer</h1>
      <div className="mx-auto my-8 grid h-52 w-52 place-items-center rounded-full bg-lavender-50" style={{ background: `conic-gradient(#8738e8 ${progress}%, #f0ebff ${progress}% 100%)` }}>
        <div className="grid h-44 w-44 place-items-center rounded-full bg-white"><span className="font-mono text-5xl font-semibold tracking-tight text-ink" aria-live="polite">{formatTime(secondsLeft)}</span></div>
      </div>
      <p className="mb-6 text-sm text-slate-500">{secondsLeft === 0 ? 'Session complete — well done!' : isRunning ? 'You’re doing great. Stay with it.' : 'Ready for a focused 25-minute session?'}</p>
      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setIsRunning((running) => !running)} disabled={secondsLeft === 0} className="min-w-28 rounded-lg bg-lavender-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-lavender-700 disabled:cursor-not-allowed disabled:opacity-50">{isRunning ? 'Pause' : 'Start'}</button>
        <button type="button" onClick={resetTimer} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Reset</button>
      </div>
    </section>
  );
}
