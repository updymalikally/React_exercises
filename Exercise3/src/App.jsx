import UserCard from './components/UserCard.jsx';
import './styles.css';

const users = [
  { id: 1, name: 'Amara Okafor', email: 'amara.okafor@example.com' },
  { id: 2, name: 'Leo Martin', email: 'leo.martin@example.com' },
  { id: 3, name: 'Sofia Chen', email: 'sofia.chen@example.com' },
  { id: 4, name: 'Noah Patel', email: 'noah.patel@example.com' },
  { id: 5, name: 'Isabella Kim', email: 'isabella.kim@example.com' },
  { id: 6, name: 'Ethan Brooks', email: 'ethan.brooks@example.com' }
];

export default function App() {
  return (
    <main className="directory">
      <header className="page-header">
        <div>
          <p className="eyebrow"><span /> Team directory</p>
          <h1>Good people.<br /><em>Good work.</em></h1>
          <p className="intro">A little place to find the people who make it all happen.</p>
        </div>
        <div className="member-count"><strong>06</strong><span>team members</span></div>
      </header>
      <section className="user-grid" aria-label="Team members">
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} email={user.email} />
        ))}
      </section>
      <footer className="page-footer"><span>THE STUDIO</span><span>People make the place · 2025</span></footer>
    </main>
  );
}
