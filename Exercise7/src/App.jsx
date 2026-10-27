import MouseTracker from './components/MouseTracker.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><a href="#top" className="wordmark" id="top"><span className="mark">⌖</span> FIELD NOTES <span className="edition">INTERACTION STUDY 07</span></a><span className="header-status"><i /> LISTENING</span></header>
      <section className="intro">
        <p className="eyebrow">Small study no. 07 <span>·</span> Browser coordinates</p>
        <h1>Where the<br />cursor <em>goes.</em></h1>
        <p className="intro-copy">A tiny window into movement. Move around and watch the numbers follow along.</p>
      </section>
      <MouseTracker />
      <footer className="page-footer"><span>MOVE AROUND TO EXPLORE</span><span>COORDINATES · VIEWPORT PIXELS</span></footer>
    </main>
  );
}
