import SignupForm from './components/SignupForm.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-mark">c.</span> THE COMMON ROOM</a><span className="header-note">GOOD COMPANY STARTS HERE</span></header>
      <div className="page-content">
        <div className="side-note">A PLACE FOR<br />CURIOUS MINDS<span>✳</span></div>
        <SignupForm />
        <div className="side-note right-note">COME AS<br />YOU ARE<span>✳</span></div>
      </div>
      <footer className="page-footer"><span>MAKE YOURSELF AT HOME.</span><span>MEMBERSHIP / 2025</span></footer>
    </main>
  );
}
