import { useEffect, useState } from 'react';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function Countdown() {
  const [inputSeconds, setInputSeconds] = useState('30');
  const [initialSeconds, setInitialSeconds] = useState(30);
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (remainingSeconds === 0) setIsRunning(false);
  }, [remainingSeconds]);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputSeconds(value);

    if (value !== '' && Number(value) > 0) {
      const nextInitialSeconds = Math.floor(Number(value));
      setInitialSeconds(nextInitialSeconds);
      if (!isRunning) setRemainingSeconds(nextInitialSeconds);
    }
  }

  function startTimer() {
    if (remainingSeconds > 0) setIsRunning(true);
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setRemainingSeconds(initialSeconds);
  }

  const isComplete = remainingSeconds === 0;

  return (
    <section className="timer-card" aria-labelledby="timer-title">
      <div className="card-eyebrow"><span className={isRunning ? 'pulse-dot active' : 'pulse-dot'} /> FOCUS TIMER</div>
      <h2 id="timer-title">Make a little<br /><em>space.</em></h2>
      <p className="card-description">Choose a duration, settle in, and let the minutes be yours.</p>

      <div className={`clock-face${isRunning ? ' running' : ''}${isComplete ? ' complete' : ''}`} aria-live="polite" aria-atomic="true">
        <span className="clock-time">{formatTime(remainingSeconds)}</span>
        <span className="clock-caption">{isComplete ? 'TIME IS UP' : isRunning ? 'COUNTING DOWN' : 'MINUTES : SECONDS'}</span>
      </div>

      <label className="duration-label" htmlFor="duration">Starting time <span>(seconds)</span></label>
      <div className="duration-input-wrap">
        <input
          id="duration"
          type="number"
          min="1"
          step="1"
          value={inputSeconds}
          onChange={handleInputChange}
          disabled={isRunning}
          aria-describedby="duration-help"
        />
        <span>seconds</span>
      </div>
      <p className="input-hint" id="duration-help">Set any whole number of seconds.</p>

      <div className="timer-actions">
        <button className="start-button" type="button" onClick={startTimer} disabled={isRunning || remainingSeconds === 0}>Start <span aria-hidden="true">▶</span></button>
        <button className="stop-button" type="button" onClick={stopTimer} disabled={!isRunning}>Stop <span aria-hidden="true">Ⅱ</span></button>
        <button className="reset-button" type="button" onClick={resetTimer}>Reset <span aria-hidden="true">↺</span></button>
      </div>
      <p className="timer-status" aria-live="polite">{isComplete ? 'A moment well spent.' : isRunning ? 'Take a breath. You have this.' : 'Ready when you are.'}</p>
    </section>
  );
}
