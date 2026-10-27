import StudentRegistrationForm from './components/StudentRegistrationForm.jsx';
import './styles.css';

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header"><a className="brand" href="#top" id="top"><span className="brand-mark">n.</span> NORTHFIELD ACADEMY</a><span className="header-note">STUDENT SERVICES <i /> ENROLLMENT</span></header>
      <div className="page-content"><div className="side-note">YOUR NEXT CHAPTER<br />STARTS HERE<span>01 / 03</span></div><StudentRegistrationForm /><div className="side-note right-note">LEARN WITH<br />PURPOSE<span>✳</span></div></div>
      <footer className="page-footer"><span>STUDENT REGISTRATION · NORTHFIELD ACADEMY</span><span>QUESTIONS? STUDENT SERVICES</span></footer>
    </main>
  );
}
