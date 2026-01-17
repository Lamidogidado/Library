import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div className="p-10 text-center text-slate-500">Loading catalog...</div>

  const books = result.data?.allBooks || []

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h2 className="text-4xl font-black text-slate-900">Books</h2>
        <p className="text-slate-500 mt-1">Explore our collection of historical and scientific works.</p>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Author</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-900 uppercase tracking-wider text-right">Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-indigo-600">{b.title}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{b.author.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono text-right">{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books