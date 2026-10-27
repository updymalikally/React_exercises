import ShoppingCart from './components/ShoppingCart.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" id="top"><span className="brand-mark">g.</span> GOOD THINGS</a>
        <nav aria-label="Main navigation"><a href="#shop">Shop</a><a href="#story">Our story</a><button type="button" className="bag-button">Bag <span>↗</span></button></nav>
      </header>
      <div className="breadcrumb"><span>Home</span><span>/</span><strong>Your bag</strong></div>
      <ShoppingCart />
      <footer className="site-footer"><span>GOOD THINGS, EVERY DAY.</span><span>Made with care · © 2025</span></footer>
    </main>
  );
}
