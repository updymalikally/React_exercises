import { useEffect, useState } from 'react';

const STORAGE_KEY = 'exercise24-student-registration';
const emptyForm = { studentName: '', email: '', grade: '', subjects: [] };
const subjectOptions = ['Mathematics', 'Science', 'English'];

function readSavedForm() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyForm;
    const parsed = JSON.parse(saved);
    return {
      studentName: typeof parsed.studentName === 'string' ? parsed.studentName : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      grade: ['9', '10', '11', '12'].includes(parsed.grade) ? parsed.grade : '',
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects.filter((subject) => subjectOptions.includes(subject)) : []
    };
  } catch {
    return emptyForm;
  }
}

function validate(values) {
  const errors = {};
  const cleanedName = values.studentName.trim();
  if (!cleanedName) errors.studentName = 'Please enter the student’s name.';
  else if (cleanedName.length < 2) errors.studentName = 'Name must be at least 2 characters.';
  else if (!/^[\p{L} ]+$/u.test(cleanedName)) errors.studentName = 'Use letters and spaces only.';

  const cleanedEmail = values.email.trim();
  if (!cleanedEmail) errors.email = 'Please enter an email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanedEmail)) errors.email = 'Enter a valid email, such as name@example.com.';

  if (!values.grade) errors.grade = 'Please select a grade level.';
  if (values.subjects.length === 0) errors.subjects = 'Select at least one subject.';
  return errors;
}

export default function StudentRegistrationForm() {
  const [form, setForm] = useState(readSavedForm);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);
  const errors = validate(form);

  useEffect(() => {
    try {
      const savedProgress = { ...form, password: '' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProgress));
      setSaveNotice(true);
      const timeoutId = window.setTimeout(() => setSaveNotice(false), 1500);
      return () => window.clearTimeout(timeoutId);
    } catch {
      setSaveNotice(false);
      return undefined;
    }
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setSubmitted(false);
  }

  function toggleSubject(subject) {
    setForm((current) => ({
      ...current,
      subjects: current.subjects.includes(subject)
        ? current.subjects.filter((item) => item !== subject)
        : [...current.subjects, subject]
    }));
    setTouched((current) => ({ ...current, subjects: true }));
    setSubmitted(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ studentName: true, email: true, grade: true, subjects: true });
    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length > 0) return;

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    const studentData = {
      studentName: form.studentName.trim(),
      email: form.email.trim(),
      grade: `Grade ${form.grade}`,
      subjects: [...form.subjects]
    };
    console.log('Student registration submitted:', studentData);
    setIsLoading(false);
    setSubmitted(true);
    window.alert(`Registration successful!\n\nName: ${studentData.studentName}\nEmail: ${studentData.email}\nGrade: ${studentData.grade}\nSubject interests: ${studentData.subjects.join(', ')}`);
  }

  function handleReset() {
    setForm(emptyForm);
    setTouched({});
    setSubmitted(false);
    setIsLoading(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be unavailable in private browsing. */ }
  }

  function showError(field) {
    return (touched[field] || submitted) && errors[field];
  }

  return (
    <section className="form-card" aria-labelledby="registration-title">
      <div className="form-card-heading"><div><p className="eyebrow">STUDENT ENROLLMENT · 2025</p><h2 id="registration-title">A fresh start<br /><em>begins here.</em></h2></div><span className="heading-symbol" aria-hidden="true">✳</span></div>
      <p className="form-intro">Share a few details to get registered for the school year.</p>

      {submitted && <div className="success-banner" role="status"><span aria-hidden="true">✓</span><div><strong>You’re registered!</strong><small>Your details have been saved successfully.</small></div></div>}

      <form onSubmit={handleSubmit} noValidate>
        <label className="field-label" htmlFor="studentName">Student name <span>REQUIRED</span></label>
        <input id="studentName" name="studentName" value={form.studentName} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, studentName: true }))} placeholder="e.g. Jordan Lee" autoComplete="name" aria-invalid={Boolean(showError('studentName'))} aria-describedby={showError('studentName') ? 'studentName-error' : undefined} />
        {showError('studentName') && <p className="field-error" id="studentName-error" role="alert">{errors.studentName}</p>}

        <label className="field-label" htmlFor="email">Email address <span>REQUIRED</span></label>
        <input id="email" name="email" type="email" value={form.email} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, email: true }))} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(showError('email'))} aria-describedby={showError('email') ? 'email-error' : undefined} />
        {showError('email') && <p className="field-error" id="email-error" role="alert">{errors.email}</p>}

        <label className="field-label" htmlFor="grade">Grade level <span>REQUIRED</span></label>
        <select id="grade" name="grade" value={form.grade} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, grade: true }))} aria-invalid={Boolean(showError('grade'))} aria-describedby={showError('grade') ? 'grade-error' : undefined}>
          <option value="">Choose your grade</option><option value="9">Grade 9</option><option value="10">Grade 10</option><option value="11">Grade 11</option><option value="12">Grade 12</option>
        </select>
        {showError('grade') && <p className="field-error" id="grade-error" role="alert">{errors.grade}</p>}

        <fieldset className={`subject-fieldset${showError('subjects') ? ' has-error' : ''}`}>
          <legend>Subject interests <span>SELECT AT LEAST ONE</span></legend>
          <div className="subject-options">{subjectOptions.map((subject) => <label className={`subject-option${form.subjects.includes(subject) ? ' checked' : ''}`} key={subject}><input type="checkbox" checked={form.subjects.includes(subject)} onChange={() => toggleSubject(subject)} /><span className="custom-check" aria-hidden="true">✓</span>{subject}</label>)}</div>
          {showError('subjects') && <p className="field-error" id="subjects-error" role="alert">{errors.subjects}</p>}
        </fieldset>

        <div className="form-actions"><button className="reset-button" type="button" onClick={handleReset}>Reset form</button><button className="submit-button" type="submit" disabled={isLoading}>{isLoading ? <><span className="spinner" aria-hidden="true" /> Registering…</> : <>Complete registration <span aria-hidden="true">→</span></>}</button></div>
      </form>
      <p className={`save-status${saveNotice ? ' visible' : ''}`} aria-live="polite"><span /> Your progress saves on this device; your password is never stored.</p>
    </section>
  );
}
