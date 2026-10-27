import Countdown from './components/Countdown.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-icon" aria-hidden="true">◷</span> STILL / STUDIO</a><span className="edition">A SMALL PAUSE, JUST FOR YOU</span></header>
      <div className="page-content">
        <div className="side-note"><span className="side-rule" />LESS RUSH<br />MORE ROOM</div>
        <Countdown />
        <div className="side-note right-note">BREATHE IN<br /><span>·</span> BREATHE OUT</div>
      </div>
      <footer className="page-footer"><span>TAKE THE TIME YOU NEED.</span><span>STUDY 08 &nbsp;·&nbsp; 2025</span></footer>
    </main>
  );
}
