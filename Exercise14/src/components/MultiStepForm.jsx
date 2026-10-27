import { useReducer, useState } from 'react';

const initialState = {
  step: 0,
  formData: { firstName: '', lastName: '', email: '', phone: '' },
  submitted: false
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        submitted: false
      };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 2) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) };
    case 'SUBMIT_FORM':
      return { ...state, submitted: true };
    case 'RESET_FORM':
      return { ...initialState, formData: { ...initialState.formData } };
    default:
      return state;
  }
}

const steps = ['Profile', 'Contact', 'Review'];

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const { step, formData, submitted } = state;

  function updateField(event) {
    dispatch({ type: 'UPDATE_FIELD', field: event.target.name, value: event.target.value });
    setErrors((current) => ({ ...current, [event.target.name]: '' }));
  }

  function validateCurrentStep() {
    const nextErrors = {};
    if (step === 0) {
      if (!formData.firstName.trim()) nextErrors.firstName = 'Please enter your first name.';
      if (!formData.lastName.trim()) nextErrors.lastName = 'Please enter your last name.';
    } else if (step === 1) {
      if (!formData.email.trim()) nextErrors.email = 'Please enter your email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address.';
      if (!formData.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext(event) {
    event.preventDefault();
    if (validateCurrentStep()) dispatch({ type: 'NEXT_STEP' });
  }

  function handleConfirm() {
    dispatch({ type: 'SUBMIT_FORM' });
    setErrors({});
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' });
    setErrors({});
  }

  if (submitted) {
    return (
      <section className="form-card success-card" aria-live="polite">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">Registration complete</p>
        <h2>Welcome,<br /><em>{formData.firstName}.</em></h2>
        <p className="success-copy">Your details have been saved. We’re glad you’re here.</p>
        <button className="primary-button" type="button" onClick={resetForm}>Start a new registration <span aria-hidden="true">→</span></button>
      </section>
    );
  }

  return (
    <section className="form-card" aria-labelledby="form-title">
      <div className="form-heading">
        <p className="eyebrow">A few details to get started</p>
        <h2 id="form-title">Create your<br /><em>account.</em></h2>
      </div>

      <ol className="stepper" aria-label="Registration progress">
        {steps.map((label, index) => (
          <li className={`${index === step ? 'current' : ''} ${index < step ? 'complete' : ''}`} key={label} aria-current={index === step ? 'step' : undefined}>
            <span className="step-number">{index < step ? '✓' : `0${index + 1}`}</span>
            <span className="step-label">{label}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <form onSubmit={handleNext} noValidate>
          <div className="step-intro"><span>STEP 01</span><h3>Your profile</h3><p>First, tell us what to call you.</p></div>
          <div className="field-grid">
            <label>First name<input autoComplete="given-name" name="firstName" value={formData.firstName} onChange={updateField} placeholder="e.g. Jordan" aria-invalid={Boolean(errors.firstName)} />{errors.firstName && <small className="field-error">{errors.firstName}</small>}</label>
            <label>Last name<input autoComplete="family-name" name="lastName" value={formData.lastName} onChange={updateField} placeholder="e.g. Lee" aria-invalid={Boolean(errors.lastName)} />{errors.lastName && <small className="field-error">{errors.lastName}</small>}</label>
          </div>
          <div className="form-actions"><span className="action-note">You can review everything next.</span><button className="primary-button" type="submit">Continue <span aria-hidden="true">→</span></button></div>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleNext} noValidate>
          <div className="step-intro"><span>STEP 02</span><h3>How can we reach you?</h3><p>We’ll only use these details for your account.</p></div>
          <div className="field-stack">
            <label>Email address<input autoComplete="email" type="email" name="email" value={formData.email} onChange={updateField} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small className="field-error">{errors.email}</small>}</label>
            <label>Phone number<input autoComplete="tel" type="tel" name="phone" value={formData.phone} onChange={updateField} placeholder="+1 (555) 000-0000" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
          </div>
          <div className="form-actions"><button className="back-button" type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}><span aria-hidden="true">←</span> Back</button><button className="primary-button" type="submit">Review details <span aria-hidden="true">→</span></button></div>
        </form>
      )}

      {step === 2 && (
        <div>
          <div className="step-intro"><span>STEP 03</span><h3>Review your details</h3><p>Everything look right? You can edit any section.</p></div>
          <div className="review-list">
            <section className="review-group"><div className="review-heading"><span>PROFILE</span><button type="button" onClick={() => { dispatch({ type: 'PREV_STEP' }); dispatch({ type: 'PREV_STEP' }); }}>Edit</button></div><p className="review-value">{formData.firstName} {formData.lastName}</p></section>
            <section className="review-group"><div className="review-heading"><span>CONTACT</span><button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>Edit</button></div><p className="review-value">{formData.email}</p><p className="review-secondary">{formData.phone}</p></section>
          </div>
          <div className="form-actions"><button className="back-button" type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}><span aria-hidden="true">←</span> Back</button><button className="primary-button" type="button" onClick={handleConfirm}>Confirm registration <span aria-hidden="true">✓</span></button></div>
          <button className="cancel-button" type="button" onClick={resetForm}>Cancel and clear form</button>
        </div>
      )}
    </section>
  );
}
