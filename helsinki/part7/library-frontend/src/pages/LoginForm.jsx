import { useState } from 'react'
import { useMutation } from '@apollo/client' // Standard import
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'
import { LogIn, User, Lock, AlertCircle } from 'lucide-react'

const LoginForm = ({ setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/authors') // Navigate to authors specifically
    },
    onError: (error) => {
      setError(error.graphQLErrors[0]?.message || 'Login failed')
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4 rotate-3">
            <LogIn className="w-8 h-8 text-indigo-600 -rotate-3" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Login</h2>
          <p className="text-slate-500 mt-2 font-medium">Manage your library collection</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <User className="w-4 h-4 text-slate-400" /> Username
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Your username"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
              <Lock className="w-4 h-4 text-slate-400" /> Password
            </label>
            <input
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
          <AlertCircle className="w-5 h-5 text-slate-400 shrink-0" />
          <p className="text-[11px] leading-relaxed text-slate-500 uppercase font-bold tracking-wider">
            Admin Access Only. Please contact the librarian if you have forgotten your credentials.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm