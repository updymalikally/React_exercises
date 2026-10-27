import { useState } from 'react';
import { recipes } from '../data.js';
import RecipeCard from '../components/RecipeCard.jsx';

export default function RecipeList() {
  const [filter, setFilter] = useState('All');
  const filters = ['All','Breakfast','Lunch','Dinner','Dessert'];
  const visible = filter === 'All' ? recipes : recipes.filter((recipe) => recipe.categoryLabel === filter);
  return <div className="listing-page"><div className="page-hero"><p className="eyebrow"><span/> THE RECIPE INDEX</p><h1>A table full<br/>of <em>good things.</em></h1><p>Seasonal favorites, simple suppers, and sweet little endings.</p></div><div className="filter-row" role="group" aria-label="Filter recipes">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}<span>{visible.length} recipes</span></div><div className="recipe-grid listing-grid">{visible.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>)}</div></div>;
}
