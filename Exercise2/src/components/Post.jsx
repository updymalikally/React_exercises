export default function Post({ category, title, excerpt, content, author, date, readTime }) {
  return (
    <article className="post" id="latest">
      <div className="post-copy">
        <div className="post-meta"><span className="category">{category}</span><span>{date}</span></div>
        <h2>{title}</h2>
        <p className="post-excerpt">{excerpt}</p>
        <div className="post-byline">
          <span className="avatar" aria-hidden="true">{author.split(' ').map((part) => part[0]).join('')}</span>
          <span><strong>{author}</strong><small>{readTime} read</small></span>
        </div>
        <div className="post-body">{content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <a className="read-link" href="#story-end">Continue reading <span aria-hidden="true">→</span></a>
      </div>
      <figure className="post-art" aria-label="Illustration of a quiet reading nook" role="img">
        <div className="art-sun" /><div className="art-window"><span /><span /><span /><span /></div>
        <div className="art-plant"><i /><i /><i /><b /></div>
        <div className="art-chair"><div className="chair-back" /><div className="chair-seat" /><div className="chair-leg left" /><div className="chair-leg right" /></div>
        <div className="art-table"><span /><i /></div>
        <div className="art-rug" />
        <figcaption>A little space to slow down</figcaption>
      </figure>
      <span id="story-end" className="story-end" aria-hidden="true" />
    </article>
  );
}
