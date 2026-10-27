import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { PostsProvider } from './context/PostsContext.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import PostDetail from './pages/PostDetail.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><AuthProvider><PostsProvider><Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/posts/:postId" element={<PostDetail/>}/><Route path="/create" element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/><Route path="/login" element={<Login/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></PostsProvider></AuthProvider></BrowserRouter></React.StrictMode>);
