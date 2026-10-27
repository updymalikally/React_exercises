import { createContext, useContext, useMemo, useState } from 'react';
import { starterPosts } from '../data.js';

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(starterPosts);

  function addPost({ title, content, author }) {
    const slug = `${title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-post'}-${Date.now().toString(36)}`;
    const post = { id: slug, title: title.trim(), category: 'From the desk', date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }), readTime: `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read`, excerpt: content.trim().split(/\n|(?<=[.!?])\s/)[0].slice(0, 140), content: content.trim(), author };
    setPosts((current) => [post, ...current]);
    return post;
  }

  const value = useMemo(() => ({ posts, addPost }), [posts]);
  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider.');
  return context;
}
