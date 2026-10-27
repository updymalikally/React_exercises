import { useState } from 'react';
import CourseProgress from './components/CourseProgress.jsx';
import Assignments from './components/Assignments.jsx';
import Announcements from './components/Announcements.jsx';
import './styles.css';

const stats = [
  { label: 'Average Grade', value: '88%', icon: '▥', color: 'blue', note: '+4% this month' },
  { label: 'Courses', value: '3', icon: '▤', color: 'violet', note: 'All in progress' },
  { label: 'Study Hours', value: '45h', icon: '◷', color: 'amber', note: '+6h this week' },
  { label: 'Assignments', value: '12', icon: '✎', color: 'rose', note: '2 due soon' }
];

export default function App() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className="dashboard">
      <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">s</span><span>studyspace<span className="brand-dot">.</span></span></a><nav className="top-nav" aria-label="Main navigation"><a className="active" href="#home">Dashboard</a><a href="#courses">My courses</a><a href="#assignments">Assignments</a></nav><div className="top-actions"><button className={`notification-button${showNotifications ? ' active' : ''}`} type="button" onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} aria-label="Notifications">♧<i /></button>{showNotifications && <div className="popover notification-popover"><strong>You’re all caught up</strong><span>We’ll let you know when there’s something new.</span></div>}<button className="profile-button" type="button" onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }} aria-label="Open student profile">S</button>{showProfile && <div className="popover profile-popover"><strong>Student account</strong><span>student@studyspace.edu</span></div>}</div></header>
      <section className="welcome-card" id="home"><div><p className="welcome-kicker">MONDAY, MARCH 17, 2025 <span>·</span> YOUR LEARNING SNAPSHOT</p><h1>Welcome back, Student!</h1><p>Here’s what’s happening with your courses today.</p></div><div className="welcome-art" aria-hidden="true"><span className="sparkle">✳</span><span className="art-book">▱</span><span className="art-leaf">⌁</span></div></section>
      <section className="stats-grid" aria-label="Learning statistics">{stats.map((stat) => <article className="stat-card" key={stat.label}><div className={`stat-icon ${stat.color}`} aria-hidden="true">{stat.icon}</div><div className="stat-copy"><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.note}</small></div><span className="stat-trend" aria-hidden="true">↗</span></article>)}</section>
      <div className="dashboard-grid" id="courses"><CourseProgress /><div className="right-column" id="assignments"><Assignments /><Announcements /></div></div>
      <footer className="footer"><span>© 2025 STUDYSPACE</span><span>ONE STEP AT A TIME <b>✳</b></span></footer>
    </main>
  );
}
