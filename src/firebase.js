import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCfgnhie5eXB5dd7KySpvN8hSGNt6_hDyY",
  authDomain: "recipe-app-d12ec.firebaseapp.com",
  projectId: "recipe-app-d12ec",
  storageBucket: "recipe-app-d12ec.appspot.com",
  messagingSenderId: "274301500507",
  appId: "1:274301500507:web:8e602b7177129ee616937e"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()