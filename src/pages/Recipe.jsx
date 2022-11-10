import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Recipe() {

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const docRef = doc(db, "recipes", id)

    useEffect(() => {
        const getRecipe = async () => {
            const docRef = doc(db, "recipes", id)
            const data = await getDoc(docRef)
            setRecipe(data.data())
        }

        getRecipe()
    }, [])

    const deleteRecipe = async () => {
        deleteDoc(docRef)
       window.location.pathname = "/add"
    }

  return (
    <div className='recipe'>
        {recipe &&
        <div className='recipe-card'>
            <h1>{recipe.title}</h1>
            <img src={recipe.img} alt={recipe.title}/>
            <p className='author'>from: {recipe.authorName}</p>
            <p>Time: {recipe.time}min</p>
            <h3 className='sub-title'>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map(ing => <li key={ing}>- {ing}</li>)}
            </ul>
            <h3 className='sub-title'>How to cook:</h3>
            <p>{recipe.steps}</p>
            <br />
            <button className='delete-btn' onClick={deleteRecipe}>DELETE RECIPE</button>
    	</div>}
    </div>
  )
}
