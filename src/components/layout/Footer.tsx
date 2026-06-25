import { Link } from 'react-router-dom'
import Logo from '../logo/Logo'

const Footer = () => {
  return (
    <footer className="border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* Top Row — Brand + Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" aria-label="TypePK Home">
            <Logo className="text-base" />
          </Link>
          <div className="flex items-center gap-6 text-sm text-light-subtext dark:text-dark-subtext">
            <Link to="/about" className="hover:text-primary-500 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-primary-500 transition-colors">Privacy & Terms</Link>
            <Link to="/blog" className="hover:text-primary-500 transition-colors">Blog</Link>
          </div>
          <p className="text-sm text-light-subtext dark:text-dark-subtext">
            © {new Date().getFullYear()} TypePK. All rights reserved.
          </p>
        </div>

{/* Bottom Row — Disclaimer */}
        <p className="text-xs text-light-subtext/80 dark:text-dark-subtext/80 text-center mt-3">
          TypePK is an independent practice platform and is not affiliated with, authorized, or endorsed by ETEA or any government department of Pakistan. For educational purposes only.
        </p>

      </div>
    </footer>
  )
}

export default Footer