import React from 'react'
import { auth, provider, db } from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom"

export default function Login({setIsAuthenticated}) {

    const navigate = useNavigate()

    const signIn = async () => {
        await signInWithPopup(auth, provider)
        const collectionRef = doc(db, "users", auth.currentUser.uid)
        await setDoc(collectionRef, {
            id: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email
        })
        setIsAuthenticated(true)
        navigate("/")
    }


  return (
    <div className='login'>
        <div className='login-card'>
            <h1>Recipe App</h1>
            <button onClick={signIn}>Sign In with Google</button>
        </div>
    </div>
  )
}
