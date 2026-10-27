import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return <Link className="recipe-card" to={`/recipes/${recipe.id}`}><div className={`recipe-art ${recipe.color}`} aria-hidden="true"><span className="art-index">SUNDAY TABLE</span><span className="food-illustration"><i /><b /></span><span className="art-caption">A RECIPE FOR THE SEASON</span></div><div className="recipe-card-copy"><div className="recipe-card-meta"><span>{recipe.categoryLabel}</span><span>{recipe.time} min</span></div><h3>{recipe.title}</h3><p>{recipe.description}</p><span className="recipe-link">Get the recipe <span>↗</span></span></div></Link>;
}
