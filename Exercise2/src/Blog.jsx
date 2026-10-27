import Header from './components/Header.jsx';
import Post from './components/Post.jsx';
import Footer from './components/Footer.jsx';
import './styles.css';

const post = {
  category: 'Slow living',
  title: 'The quiet joy of making room for nothing',
  excerpt: 'A gentler kind of productivity starts with a little breathing room. Here’s what happens when we let a moment simply be.',
  author: 'Maya Bennett',
  date: 'May 18, 2025',
  readTime: '4 min',
  content: [
    'We have become very good at filling the gaps. A spare ten minutes becomes one more email, one more errand, one more thing checked off an ever-growing list. But what if the pause is the point?',
    'Making room for nothing does not have to mean a grand reset. It can be a slow cup of tea before the day begins, a walk without a destination, or a few pages read with your phone in another room.',
    'These small spaces are where ideas settle and attention returns. Start with one unhurried moment today. Let it be enough.'
  ]
};

export default function Blog() {
  return (
    <div className="page-shell" id="top">
      <Header />
      <main>
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow"><span /> Notes on living well</p>
          <h1 id="page-title">Stories to make<br />you <em>pause.</em></h1>
          <p className="intro-copy">Thoughtful reads on creativity, culture, and the little things that make a life.</p>
        </section>
        <section className="latest" aria-label="Latest blog post">
          <div className="section-label"><span>01 / The journal</span><span>One good read</span></div>
          <Post {...post} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
