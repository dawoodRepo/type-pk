import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 flex items-center justify-center">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        canonical="/404"
      />
      <div className="max-w-md mx-auto px-4 text-center flex flex-col items-center gap-6">
        <p className="text-7xl font-bold text-primary-500 dark:text-primary-400 font-mono">
          404
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Page Not Found
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext text-sm leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-light-border dark:border-dark-border text-light-subtext dark:text-dark-subtext text-sm hover:border-primary-500 hover:text-primary-500 transition-all"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-all"
          >
            <Home size={14} />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
