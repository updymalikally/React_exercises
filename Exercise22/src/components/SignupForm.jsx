import { useState } from 'react';

const initialForm = { username: '', email: '', password: '', interest: '', updates: false };

export default function SignupForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.password || !formData.interest) {
      setError('Please complete each required field before continuing.');
      return;
    }
    setSubmittedData({ ...formData, username: formData.username.trim(), email: formData.email.trim() });
  }

  function resetForm() {
    setFormData(initialForm);
    setSubmittedData(null);
    setError('');
  }

  if (submittedData) {
    return (
      <section className="form-card success-card" aria-live="polite">
        <div className="success-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">You’re on the list</p>
        <h2>Thanks for<br /><em>joining us.</em></h2>
        <p className="success-copy">Your form was submitted. Here’s what you shared:</p>
        <dl className="submitted-details">
          <div><dt>Username</dt><dd>{submittedData.username}</dd></div>
          <div><dt>Email</dt><dd>{submittedData.email}</dd></div>
          <div><dt>Password</dt><dd>{'•'.repeat(Math.min(submittedData.password.length, 12))}</dd></div>
          <div><dt>Interested in</dt><dd>{submittedData.interest}</dd></div>
          <div><dt>Email updates</dt><dd>{submittedData.updates ? 'Yes, please' : 'No, thanks'}</dd></div>
        </dl>
        <button className="submit-button" type="button" onClick={resetForm}>Submit another response <span aria-hidden="true">→</span></button>
      </section>
    );
  }

  return (
    <section className="form-card" aria-labelledby="form-title">
      <p className="eyebrow">A little introduction</p>
      <h2 id="form-title">Join the<br /><em>circle.</em></h2>
      <p className="form-intro">Fill in a few details and we’ll get you set up.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label>Username<input autoComplete="username" name="username" value={formData.username} onChange={handleChange} placeholder="How should we call you?" required /></label>
        <label>Email address<input autoComplete="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required /></label>
        <label>Password<input autoComplete="new-password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 8 characters" minLength="8" required /></label>
        <label>What are you interested in?
          <select name="interest" value={formData.interest} onChange={handleChange} required>
            <option value="" disabled>Choose a topic</option>
            <option value="Design">Design</option>
            <option value="Technology">Technology</option>
            <option value="Arts & culture">Arts &amp; culture</option>
            <option value="Everyday inspiration">Everyday inspiration</option>
          </select>
        </label>
        <label className="checkbox-label"><input type="checkbox" name="updates" checked={formData.updates} onChange={handleChange} /><span>Send me occasional notes and updates.</span></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="submit-button" type="submit">Create my account <span aria-hidden="true">→</span></button>
      </form>
      <p className="privacy-note">Your details stay private. We’ll never share them.</p>
    </section>
  );
}
