import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { usePosts } from '../context/PostsContext.jsx';

export default function CreatePost() {
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [error,setError]=useState('');
  const {user}=useAuth();
  const {addPost}=usePosts();
  const navigate=useNavigate();
  function submit(event){event.preventDefault();if(title.trim().length<3||content.trim().length<20){setError('Add a title and at least a few sentences to your story.');return;}const post=addPost({title,content,author:user.name});navigate('/',{replace:true,state:{createdPostId:post.id}});}
  return <section className="editor-page"><Link to="/" className="back-link">← Back to journal</Link><div className="editor-heading"><p className="eyebrow"><span/> A NEW PAGE</p><h1>Put a thought<br/>into <em>words.</em></h1><p>Write something you’d like to remember.</p></div><form className="editor-form" onSubmit={submit}><label htmlFor="post-title">Title</label><input id="post-title" value={title} onChange={(event)=>{setTitle(event.target.value);setError('');}} placeholder="Give your story a name…" maxLength={100}/><label htmlFor="post-content">Your story</label><textarea id="post-content" value={content} onChange={(event)=>{setContent(event.target.value);setError('');}} placeholder="Start wherever you are…" rows={10}/>{error&&<p className="form-error" role="alert">{error}</p>}<div className="editor-footer"><span>Posting as <strong>{user.name}</strong></span><button className="primary-button" type="submit">Publish story <span>↗</span></button></div></form></section>;
}
