import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const index = posts.findIndex((post) => post.id === postId);
  if (index < 0) return <section className="message-page"><p className="eyebrow">STORY NOT FOUND</p><h1>This page seems<br/><em>to have wandered.</em></h1><p>We couldn’t find that post in the journal.</p><Link className="primary-button" to="/">Back to the journal →</Link></section>;
  const post = posts[index];
  const previous = posts[index - 1];
  const next = posts[index + 1];
  return <article className="post-page"><Link className="back-link" to="/">← All journal entries</Link><header className="post-hero"><p className="eyebrow"><span/> {post.category.toUpperCase()} &nbsp;·&nbsp; {post.readTime.toUpperCase()}</p><h1>{post.title}<span>.</span></h1><p className="post-deck">{post.excerpt}</p><div className="author-line"><span className="author-avatar">{(post.author || 'R').slice(0,1).toUpperCase()}</span><span><strong>{post.author || 'The Reading Room'}</strong><small>{post.date}</small></span></div></header><div className="post-cover" aria-hidden="true"><span className="cover-orbit"/><span className="cover-symbol">✳</span><span className="cover-caption">A NOTE FROM THE READING ROOM</span></div><div className="post-content">{post.content.split(/\n\s*\n/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><nav className="post-pagination" aria-label="Post navigation"><div>{previous ? <button type="button" onClick={()=>navigate(`/posts/${previous.id}`,{state:{fromPostId:post.id,direction:'previous'}})}><small>← PREVIOUS POST</small><strong>{previous.title}</strong></button>:<span className="pagination-edge">YOU’RE AT THE BEGINNING</span>}</div><div>{next ? <button className="next-post" type="button" onClick={()=>navigate(`/posts/${next.id}`,{state:{fromPostId:post.id,direction:'next'}})}><small>NEXT POST →</small><strong>{next.title}</strong></button>:<span className="pagination-edge">YOU’RE ALL CAUGHT UP</span>}</div></nav></article>;
}
