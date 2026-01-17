import { AlertCircle } from 'lucide-react'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null

  return (
    // fixed and z-[100] ensures it stays on top of the sticky Navbar
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-in slide-in-from-top duration-300">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-2xl flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-red-400">Error</p>
          <p className="text-sm font-bold text-red-800">{errorMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default Notify