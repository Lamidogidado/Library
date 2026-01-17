import { Link, NavLink } from 'react-router-dom'
import { Button } from "./ui/button"
import { BookOpen, Users, PlusCircle, LogOut, LogIn, Sparkles } from "lucide-react"

const Navbar = ({ token, logout }) => {
  const linkStyles = ({ isActive }) => 
    `flex items-center px-4 h-10 w-full rounded-md transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-50 text-indigo-600 font-bold' 
        : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-indigo-600 hover:opacity-80">
          <BookOpen className="w-7 h-7" />
          <span className="font-black text-xl tracking-tight">Library</span>
        </Link>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" asChild className="p-0">
            <NavLink to="/authors" className={linkStyles}>
              <Users className="w-4 h-4 mr-2" /> Authors
            </NavLink>
          </Button>
          
          <Button variant="ghost" asChild className="p-0">
            <NavLink to="/books" className={linkStyles}>
              <BookOpen className="w-4 h-4 mr-2" /> Books
            </NavLink>
          </Button>

          {token && (
            <>
              <Button variant="ghost" asChild className="p-0">
                <NavLink to="/add" className={linkStyles}>
                  <PlusCircle className="w-4 h-4 mr-2" /> Add Book
                </NavLink>
              </Button>
              <Button variant="ghost" asChild className="p-0">
                <NavLink to="/recommend" className={linkStyles}>
                  <Sparkles className="w-4 h-4 mr-2" /> Recommend
                </NavLink>
              </Button>
            </>
          )}
        </div>
      </div>

      <div>
        {token ? (
          <Button variant="destructive" size="sm" onClick={logout} className="font-bold">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        ) : (
          <Button variant="default" size="sm" asChild className="bg-slate-900 font-bold text-white p-0">
            {/* The Link must have flex, w-full, and h-full to be clickable */}
            <Link to="/login" className="flex items-center justify-center w-full h-full px-4">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar