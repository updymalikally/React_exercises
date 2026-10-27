import ToggleButton from './components/ToggleButton.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page">
      <header className="page-heading">
        <p className="eyebrow">A tiny interaction</p>
        <h1>On <span>or</span> off?</h1>
        <p className="intro">A simple React state demo. Tap the switch and watch it change.</p>
      </header>
      <ToggleButton />
      <footer className="page-footer"><span>LESSON 2.5</span><span>Click to change state <span aria-hidden="true">↗</span></span></footer>
    </main>
  );
}
