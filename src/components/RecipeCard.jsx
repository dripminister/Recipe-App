import React from 'react'
import { Link } from 'react-router-dom'

export default function RecipeCard({recipe}) {
  return (
    <Link className='recipe-link' to={`recipe/${recipe.id}`}>
        <div key={recipe.id} className="home-recipe-card">
            <img src={recipe.img} />
            <h3>{recipe.title}</h3>
        </div>
    </Link>
  )
}
