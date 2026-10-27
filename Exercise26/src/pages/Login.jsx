import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [name,setName]=useState('');
  const [error,setError]=useState('');
  const {user,login}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();
  const from=location.state?.from || {pathname:'/create'};
  if(user)return <Navigate to={from} replace/>;
  function submit(event){event.preventDefault();if(!name.trim()){setError('Enter a name to continue.');return;}login(name);navigate(from,{replace:true});}
  return <section className="login-page"><div className="login-mark">r.</div><p className="eyebrow">WELCOME TO THE READING ROOM</p><h1>Come on <em>in.</em></h1><p className="login-copy">Sign in with your name to write a story for the journal.</p><form className="login-form" onSubmit={submit}><label htmlFor="writer-name">Your name</label><input id="writer-name" autoComplete="name" value={name} onChange={(event)=>{setName(event.target.value);setError('');}} placeholder="e.g. Alex Morgan"/>{error&&<p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit">Continue to write <span>→</span></button></form><p className="login-footnote">This demo uses a simple local sign-in, no password needed.</p><Link to="/" className="login-back">← Return to the journal</Link></section>;
}
