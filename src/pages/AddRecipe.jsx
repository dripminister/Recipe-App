import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { auth, db, storage } from '../firebase'
import { uploadBytesResumable, uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

export default function AddRecipe() {

    const navigate = useNavigate()
    const recipeRef = collection(db, "recipes")
    const [title, setTitle] = useState("")
    const [time, setTime] = useState(0)
    const [img, setImg] = useState(null)
    const [ingredients, setIngredients] = useState("")
    const [steps, setSteps] = useState("")

    const handleClick = async (e) => {
        e.preventDefault()

        const ingredientsArray = ingredients.split(',')

        const storageRef = ref(storage, img.name)
      
        uploadBytes(storageRef, img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                addDoc(recipeRef, {
                    authorId: auth.currentUser.uid,
                    authorName: auth.currentUser.displayName,
                    title,
                    time,
                    img: url,
                    ingredients: ingredientsArray,
                    steps
                })
            })
        })
        navigate("/")
    }

  return (
    <div className='add-recipe'>
        <div className='add-card'>
            <h1>Add a recipe</h1>
            <form>
                <label>
                    <h2 className='btn'>{img ? `Added ${img.name}` : "Add an image"}</h2>
                    <input type="file" onChange={e => setImg(e.target.files[0])} required />
                </label>
                <input 
                    type='text' 
                    className='add-input' 
                    placeholder='Recipe name' 
                    onChange={e => setTitle(e.target.value)}
                    required />
                <input 
                    type='number' 
                    className='add-input' 
                    placeholder='Time in minutes' 
                    min="1"
                    onChange={e => setTime(e.target.value)}
                    required />
                <textarea 
                    placeholder='Add the ingredients and seperate them with a comma' 
                    onChange={e => setIngredients(e.target.value)}
                    required />
                <textarea 
                    placeholder='Add the steps to cook'
                    onChange={e => setSteps(e.target.value)}
                    required/>
                <button onClick={handleClick}>Add Recipe</button>
            </form>
        </div>
    </div>
  )
}
