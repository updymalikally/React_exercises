import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return <div className="site-shell"><header className="site-header"><Link to="/" className="brand"><span className="brand-mark">s.</span><span>SUNDAY TABLE<small>RECIPES FOR SLOW DAYS</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/recipes">Recipes</NavLink><NavLink to="/categories">Categories</NavLink></nav><Link to="/recipes" className="header-cta">Find a recipe <span>↗</span></Link></header><main><Outlet /></main><footer className="site-footer"><Link to="/" className="footer-brand">SUNDAY TABLE</Link><span>GOOD FOOD, SHARED SLOWLY.</span><span>© 2025 SUNDAY TABLE</span></footer></div>;
}
