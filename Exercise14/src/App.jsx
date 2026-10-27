import MultiStepForm from './components/MultiStepForm.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-mark">f.</span> FORM & FIELD</a><span className="header-note">A GOOD PLACE TO BEGIN</span></header>
      <section className="hero-copy"><p className="eyebrow"><span /> A simpler sign-up</p><h1>Start with<br /><em>the essentials.</em></h1><p>Just three small steps and you’ll be all set.</p></section>
      <MultiStepForm />
      <footer className="site-footer"><span>YOUR INFORMATION STAYS YOURS.</span><span>REGISTRATION · 2025</span></footer>
    </main>
  );
}
