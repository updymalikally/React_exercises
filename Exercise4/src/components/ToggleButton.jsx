import { useState } from 'react';

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  function handleToggle() {
    setIsOn((currentState) => !currentState);
  }

  return (
    <section className={`switch-card ${isOn ? 'is-on' : 'is-off'}`} aria-labelledby="switch-title">
      <div className="switch-topline"><span className="status-dot" /> Interactive demo</div>
      <h2 id="switch-title">A little switch.</h2>
      <p className="switch-description">One click changes everything.</p>

      <button
        className="toggle-button"
        type="button"
        onClick={handleToggle}
        aria-pressed={isOn}
      >
        <span className="toggle-label">{isOn ? 'ON' : 'OFF'}</span>
        <span className="toggle-track" aria-hidden="true"><span className="toggle-knob" /></span>
      </button>

      <p className="state-message" aria-live="polite">
        {isOn ? 'You turned it on. Looking good!' : 'It’s off for now. Give it a click.'}
      </p>
    </section>
  );
}
