import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Navbar({setIsAuthenticated}) {

    const navigate = useNavigate()

    const logOut = async () => {
        await signOut(auth)
        setIsAuthenticated(false)
        navigate("/login")
    }

  return (
    <nav>
        <div>
            <Link to="/">Home</Link>
            <Link to="/add">Add Recipe</Link>
        </div>
        <button className='sign-out' onClick={logOut}>Sign Out</button>
    </nav>
  )
}
