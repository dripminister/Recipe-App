import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user,setUser] = useState({})

    function signUp(email, password) {
        signInWithPopup(auth, provider)
        const collectionRef = doc(db, "users", auth.currentUser.uid)
        setDoc(collectionRef, {
            id: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email
        })
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    })

    return(
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}