import { Link, useLocation } from 'react-router-dom';

export default function NotFound(){const location=useLocation();return <section className="message-page"><span className="error-number">404</span><p className="eyebrow">THIS PAGE ISN’T IN THE JOURNAL</p><h1>Let’s find our<br/><em>way back.</em></h1><p>There’s no page at <code>{location.pathname}</code>. It may have moved or the link may be old.</p><Link className="primary-button" to="/">Back to the journal →</Link></section>;}
