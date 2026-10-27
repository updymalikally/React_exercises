import { useState } from 'react';
import Greeting from './components/Greeting.jsx';
import CartDemo, { CartSummary } from './components/CartDemo.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { LanguageContext } from './context/LanguageContext.jsx';
import './styles.css';

export default function App() {
  const [language, setLanguage] = useState('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <CartProvider>
        <main className="page-shell">
          <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-mark">e.</span> EVERYDAY OBJECTS</a><div className="header-right"><span className="header-note">A SHOP FOR SLOWER DAYS</span><CartSummary /></div></header>
          <section className="hero"><div><p className="hero-eyebrow"><span /> CONTEXT / TWO SMALL DEMOS</p><h1>Thoughtful things<br />for <em>every day.</em></h1><p className="hero-copy">A little practice in sharing state across components.</p></div><div className="hero-stamp" aria-hidden="true"><span>MADE FOR</span><b>the<br />everyday</b><i>✳</i></div></section>
          <div className="demo-grid"><Greeting /><CartDemo /></div>
          <footer className="site-footer"><span>STATE, SHARED WITH CARE.</span><span>REACT STUDY 15 &nbsp;·&nbsp; 2025</span></footer>
        </main>
      </CartProvider>
    </LanguageContext.Provider>
  );
}
