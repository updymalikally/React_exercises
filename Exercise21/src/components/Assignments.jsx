const assignments = [
  { title: 'Build a Todo App', course: 'React Fundamentals', status: 'Pending', due: 'Mar 20, 2025', tone: 'pending' },
  { title: 'API Integration', course: 'JavaScript Advanced', status: 'Completed', due: 'Mar 18, 2025', tone: 'completed' },
  { title: 'Design System', course: 'UI/UX Design', status: 'In progress', due: 'Mar 25, 2025', tone: 'progress' }
];

export default function Assignments() {
  return (
    <section className="panel assignments-panel" aria-labelledby="assignments-heading">
      <div className="panel-heading"><div><p className="eyebrow">Stay on top of it</p><h2 id="assignments-heading">Upcoming Assignments</h2></div><button type="button" className="round-arrow" aria-label="View all assignments">↗</button></div>
      <ul className="assignment-list">{assignments.map((assignment) => <li className="assignment" key={assignment.title}><div className="assignment-main"><h3>{assignment.title}</h3><p>{assignment.course}</p></div><div className="assignment-meta"><span className={`status ${assignment.tone}`}>{assignment.status}</span><small>Due {assignment.due}</small></div></li>)}</ul>
      <button className="all-assignments" type="button">See all assignments <span aria-hidden="true">→</span></button>
    </section>
  );
}
