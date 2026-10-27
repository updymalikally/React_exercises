const courses = [
  { id: 'react', name: 'React Fundamentals', progress: 75, next: 'Components & Props', instructor: 'Sarah Wilson', color: 'blue', initials: 'SW' },
  { id: 'javascript', name: 'JavaScript Advanced', progress: 45, next: 'Async/Await', instructor: 'Mike Johnson', color: 'orange', initials: 'MJ' },
  { id: 'design', name: 'UI/UX Design', progress: 90, next: 'Color Theory', instructor: 'Emily Chen', color: 'violet', initials: 'EC' }
];

export default function CourseProgress() {
  return (
    <section className="panel course-panel" aria-labelledby="course-heading">
      <div className="panel-heading"><div><p className="eyebrow">Keep your momentum</p><h2 id="course-heading">Course Progress</h2></div><button className="text-button" type="button">View all <span aria-hidden="true">↗</span></button></div>
      <div className="course-list">
        {courses.map((course) => (
          <article className="course-card" key={course.id}>
            <div className="course-top"><div className="course-title"><span className={`course-icon ${course.color}`} aria-hidden="true">{course.id === 'react' ? '⚛' : course.id === 'javascript' ? 'JS' : '✳'}</span><h3>{course.name}</h3></div><span className="progress-number">{course.progress}%</span></div>
            <div className="progress-track" role="progressbar" aria-label={`${course.name} progress`} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${course.progress}%` }} className={`progress-fill ${course.color}`} /></div>
            <div className="course-bottom"><span><small>UP NEXT</small>{course.next}</span><span className="instructor"><i>{course.initials}</i>{course.instructor}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
