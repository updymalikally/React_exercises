export default function UserCard({ name, email }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="user-card">
      <div className="avatar" aria-hidden="true">{initials}</div>
      <div className="user-details">
        <h2>{name}</h2>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <span className="card-arrow" aria-hidden="true">↗</span>
    </article>
  );
}
