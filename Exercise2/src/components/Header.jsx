import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="The Daily Edit home">
        <span className="brand-mark" aria-hidden="true">d.</span>
        <span>The Daily Edit</span>
      </a>
      <span className="header-note">Ideas for a more considered life</span>
      <a className="header-link" href="#latest">Latest story <span aria-hidden="true">↘</span></a>
    </header>
  );
}
