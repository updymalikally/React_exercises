import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  return <section className="not-found"><span className="not-found-mark">404</span><p className="eyebrow">THIS PAGE TOOK A WRONG TURN</p><h1>Nothing on<br/>the <em>menu.</em></h1><p className="not-found-copy">We couldn’t find <code>{location.pathname}</code>. Let’s get you back to something delicious.</p><Link className="primary-link" to="/">Back to the table <span>→</span></Link></section>;
}
