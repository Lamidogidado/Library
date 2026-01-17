import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS } from './queries'

// Pages
import Authors from './pages/Authors'
import Books from './pages/Books'
import NewBook from './pages/NewBook'
import LoginForm from './pages/LoginForm'
import Recommend from './pages/Recommend'

// Components
import Navbar from './components/Navbar'
import Notify from './components/Notify'
 
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  const navigate = useNavigate()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <Notify errorMessage={errorMessage} />
      <Navbar token={token} logout={logout} />

      <main className="container mx-auto py-8 px-4">
        <Routes>
          {/* THE FIX: If path is "/", redirect to "/authors" */}
          <Route path="/" element={<Navigate replace to="/authors" />} />
          
          <Route path="/authors" element={<Authors result={result} token={token} />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<NewBook setError={notify} />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setError={notify} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App