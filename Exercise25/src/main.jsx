import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import RecipeList from './pages/RecipeList.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import Categories from './pages/Categories.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/recipes" element={<RecipeList/>}/><Route path="/recipes/:id" element={<RecipeDetail/>}/><Route path="/categories" element={<Categories/>}/><Route path="/categories/:categoryId" element={<Categories/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></BrowserRouter></React.StrictMode>);
