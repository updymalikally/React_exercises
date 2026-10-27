import { useMemo, useReducer, useState } from 'react';

const initialContacts = [
  { id: 'c1', name: 'Amara Okafor', email: 'amara.okafor@example.com', phone: '+1 (415) 555-0132', favorite: true },
  { id: 'c2', name: 'Leo Martin', email: 'leo.martin@example.com', phone: '+1 (212) 555-0198', favorite: false },
  { id: 'c3', name: 'Sofia Chen', email: 'sofia.chen@example.com', phone: '+1 (646) 555-0144', favorite: true },
  { id: 'c4', name: 'Noah Patel', email: 'noah.patel@example.com', phone: '+1 (312) 555-0176', favorite: false },
  { id: 'c5', name: 'Isabella Kim', email: 'isabella.kim@example.com', phone: '+1 (206) 555-0125', favorite: false }
];

function contactsReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { ...action.contact, id: crypto.randomUUID(), favorite: false }];
    case 'edit':
      return state.map((contact) => contact.id === action.contact.id
        ? { ...contact, ...action.contact }
        : contact
      );
    case 'delete':
      return state.filter((contact) => contact.id !== action.id);
    case 'toggleFavorite':
      return state.map((contact) => contact.id === action.id
        ? { ...contact, favorite: !contact.favorite }
        : contact
      );
    default:
      return state;
  }
}

const blankContact = { name: '', email: '', phone: '' };

function initials(name) {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

export default function ContactApp() {
  const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(blankContact);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const filteredContacts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return contacts
      .filter((contact) => contact.name.toLowerCase().includes(normalizedQuery))
      .sort((a, b) => Number(b.favorite) - Number(a.favorite) || a.name.localeCompare(b.name));
  }, [contacts, query]);

  function updateForm(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  function startEditing(contact) {
    setEditingId(contact.id);
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setError('');
  }

  function cancelEditing() {
    setEditingId(null);
    setForm(blankContact);
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const cleanContact = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim()
    };
    if (!cleanContact.name || !cleanContact.email || !cleanContact.phone) {
      setError('Please complete all three fields.');
      return;
    }
    if (editingId) {
      dispatch({ type: 'edit', contact: { ...cleanContact, id: editingId } });
    } else {
      dispatch({ type: 'add', contact: cleanContact });
    }
    cancelEditing();
  }

  function handleDelete(contact) {
    if (window.confirm(`Remove ${contact.name} from your contacts?`)) {
      dispatch({ type: 'delete', id: contact.id });
      if (editingId === contact.id) cancelEditing();
    }
  }

  const favoritesCount = contacts.filter((contact) => contact.favorite).length;

  return (
    <main className="app-shell">
      <header className="topbar"><a href="#top" className="brand" id="top"><span className="brand-mark">p.</span> PEOPLE & THINGS</a><span className="topbar-note">A LITTLE ORGANIZATION GOES A LONG WAY</span><button className="top-add" type="button" onClick={() => { cancelEditing(); document.getElementById('contact-name')?.focus(); }}>+ Add contact</button></header>
      <section className="page-intro"><div><p className="eyebrow"><span /> YOUR ADDRESS BOOK</p><h1>Good people,<br /><em>close at hand.</em></h1><p className="intro-copy">Keep the important details in one thoughtful place.</p></div><div className="people-stat"><strong>{String(contacts.length).padStart(2, '0')}</strong><span>people<br />in your circle</span></div></section>

      <div className="workspace">
        <section className="contacts-panel" aria-labelledby="contacts-title">
          <div className="panel-heading"><div><p className="eyebrow">The people</p><h2 id="contacts-title">Your contacts <span>{contacts.length}</span></h2></div><div className="favorite-stat"><span aria-hidden="true">★</span> {favoritesCount} favorites</div></div>
          <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name..." aria-label="Search contacts by name" /><kbd>⌘ K</kbd></label>

          <div className="contact-list">
            {filteredContacts.length === 0 ? (
              <div className="empty-list"><span aria-hidden="true">⌕</span><p>{contacts.length === 0 ? 'Your address book is empty.' : 'No names found.'}</p><small>{contacts.length === 0 ? 'Add someone to get started.' : 'Try another search.'}</small></div>
            ) : filteredContacts.map((contact) => (
              <article className={`contact-row${contact.favorite ? ' is-favorite' : ''}${editingId === contact.id ? ' is-editing' : ''}`} key={contact.id}>
                <div className={`avatar avatar-${contact.id.charCodeAt(1) % 5}`} aria-hidden="true">{initials(contact.name)}</div>
                <div className="contact-details"><h3>{contact.name}{contact.favorite && <span className="favorite-label">FAVORITE</span>}</h3><a href={`mailto:${contact.email}`}>{contact.email}</a><a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a></div>
                <div className="contact-actions"><button type="button" className={`icon-action favorite-action${contact.favorite ? ' active' : ''}`} onClick={() => dispatch({ type: 'toggleFavorite', id: contact.id })} aria-label={`${contact.favorite ? 'Remove' : 'Add'} ${contact.name} ${contact.favorite ? 'from' : 'to'} favorites`} aria-pressed={contact.favorite}>★</button><button type="button" className="icon-action" onClick={() => startEditing(contact)} aria-label={`Edit ${contact.name}`}>↗</button><button type="button" className="icon-action delete-action" onClick={() => handleDelete(contact)} aria-label={`Delete ${contact.name}`}>×</button></div>
              </article>
            ))}
          </div>
          <div className="list-footer"><span>SHOWING {filteredContacts.length} OF {contacts.length}</span><span><i /> ALL CONTACTS UP TO DATE</span></div>
        </section>

        <aside className="form-panel" aria-labelledby="form-title">
          <div className="form-panel-top"><p className="eyebrow">{editingId ? 'Update the details' : 'Make a connection'}</p><h2 id="form-title">{editingId ? 'Edit contact.' : <>Add someone<br /><em>to your circle.</em></>}</h2><p>{editingId ? 'Make any changes below and save.' : 'A name, an email, a way to say hello.'}</p></div>
          <form onSubmit={handleSubmit} noValidate>
            <label>Full name<input id="contact-name" autoComplete="name" name="name" value={form.name} onChange={updateForm} placeholder="e.g. Jordan Lee" /></label>
            <label>Email address<input autoComplete="email" type="email" name="email" value={form.email} onChange={updateForm} placeholder="jordan@example.com" /></label>
            <label>Phone number<input autoComplete="tel" type="tel" name="phone" value={form.phone} onChange={updateForm} placeholder="+1 (555) 000-0000" /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="save-button" type="submit">{editingId ? 'Save changes' : 'Save contact'} <span aria-hidden="true">→</span></button>
            {editingId && <button className="cancel-button" type="button" onClick={cancelEditing}>Cancel editing</button>}
          </form>
          <div className="form-note"><span aria-hidden="true">✳</span> The best connections are worth keeping.</div>
        </aside>
      </div>
      <footer className="page-footer"><span>KEEP YOUR PEOPLE CLOSE.</span><span>CONTACTS / MADE WITH CARE · 2025</span></footer>
    </main>
  );
}
