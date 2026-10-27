import ProductCatalog from './components/ProductCatalog.jsx';
import CartSummary from './components/CartSummary.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './styles.css';

export default function App() {
  return (
    <CartProvider>
      <main className="page-shell">
        <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-mark">o.</span> OBJECTS / HOME</a><nav aria-label="Main navigation"><a href="#collection">Collection</a><a href="#about">Our approach</a><span className="nav-bag">THE BAG <span>↗</span></span></nav></header>
        <section className="hero"><div><p className="hero-kicker"><span /> THE EVERYDAY EDITION</p><h1>Keep what<br />feels <em>like home.</em></h1><p>A few useful, beautiful things. Chosen to stay with you.</p></div><div className="hero-orbit" aria-hidden="true"><span>USEFUL<br />BY NATURE</span><i>✳</i></div></section>
        <div className="content-layout" id="collection"><ProductCatalog /><CartSummary /></div>
        <footer className="site-footer"><span>THOUGHTFULLY CHOSEN. MADE TO LAST.</span><span>OBJECTS / HOME &nbsp;·&nbsp; 2025</span></footer>
      </main>
    </CartProvider>
  );
}
