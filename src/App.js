import Login from "./pages/Login"
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AddRecipe from "./pages/AddRecipe"
import Recipe from "./pages/Recipe"
import Navbar from "./components/Navbar"
import { auth } from "./firebase"
import { useState } from "react"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ProtectedRoute = ({ children }) => {
    if (auth.currentUser === null) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
      <BrowserRouter>
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated}/>}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>} />
          <Route path="/recipe/:id" element={
            <ProtectedRoute>
              <Recipe />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
