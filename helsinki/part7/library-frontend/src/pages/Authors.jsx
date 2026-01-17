import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ result, token }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.graphQLErrors[0].message)
  })

  if (result.loading) return <div className="p-10 text-center text-slate-500">Loading authors...</div>

  const authors = result.data?.allAuthors || []

  const submit = async (event) => {
    event.preventDefault()
    if (!name) return alert("Select an author")
    changeBorn({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-4xl font-black text-slate-900">Authors</h2>
      
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase">Name</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase">Born</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase">Books</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {authors.map((a) => (
              <tr key={a.id || a.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{a.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{a.born || '-'}</td>
                <td className="px-6 py-4 text-sm text-slate-500 font-bold">{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {token && (
        <div className="max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl mt-10">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Set Birth Year</h3>
          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Select Author</label>
              <select 
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={name} 
                onChange={({ target }) => setName(target.value)}
              >
                <option value="" disabled>Choose an author...</option>
                {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Birth Year</label>
              <input
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
              Update Author
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors