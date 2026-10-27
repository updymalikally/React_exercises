const announcements = [
  { title: 'New Course Available', body: 'Check out our new TypeScript course!', time: '2 hours ago', icon: '✦', tone: 'blue' },
  { title: 'Maintenance Notice', body: 'Platform updates scheduled for tonight.', time: '5 hours ago', icon: '◷', tone: 'amber' }
];

export default function Announcements() {
  return (
    <section className="panel announcements-panel" aria-labelledby="announcements-heading">
      <div className="panel-heading"><div><p className="eyebrow">From your learning team</p><h2 id="announcements-heading">Announcements</h2></div><span className="announcement-count">02</span></div>
      <div className="announcement-list">{announcements.map((announcement) => <article className={`announcement ${announcement.tone}`} key={announcement.title}><span className="announcement-icon" aria-hidden="true">{announcement.icon}</span><div><h3>{announcement.title}</h3><p>{announcement.body}</p><time>{announcement.time}</time></div></article>)}</div>
    </section>
  );
}
