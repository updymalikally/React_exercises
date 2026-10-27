import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Layout() {
  const { user, logout } = useAuth();
  return <div className="site-shell"><header className="site-header"><Link className="brand" to="/"><span className="brand-mark">r.</span><span>THE READING ROOM<small>NOTES FOR THE IN-BETWEEN</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Journal</NavLink><a href="/#about">About</a></nav><div className="header-actions">{user ? <><Link className="write-link" to="/create">Write a post <span>↗</span></Link><button className="user-chip" type="button" onClick={logout} title="Sign out">{user.name.slice(0,1).toUpperCase()} <span>Sign out</span></button></> : <Link className="write-link" to="/create">Write a post <span>↗</span></Link>}</div></header><main><Outlet/></main><footer className="site-footer"><Link to="/" className="footer-brand">THE READING ROOM</Link><span>A SMALL JOURNAL FOR SLOWER DAYS</span><span>© 2025 · MADE WITH CARE</span></footer></div>;
}
