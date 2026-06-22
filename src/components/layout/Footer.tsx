import { Link } from 'react-router-dom'
import Logo from '../logo/Logo'

const Footer = () => {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <Link to="/">
          <Logo className="text-base" />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-light-subtext dark:text-dark-subtext">
          <Link to="/about" className="hover:text-primary-500 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
          <Link to="/blog" className="hover:text-primary-500 transition-colors">Blog</Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-light-subtext dark:text-dark-subtext">
          © {new Date().getFullYear()} TypePK. All rights reserved.
        </p>

      </div>
    </footer>
  )
}

export default Footer
