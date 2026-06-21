import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, Keyboard, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { label: 'Practice', path: '/practice' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || menuOpen
          ? 'bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-lg shadow-sm shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
          <Keyboard size={24} />
          <span>TypePK</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200
                ${location.pathname === link.path
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle — always visible */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 hover:border-primary-500 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark'
              ? <Sun size={18} className="text-yellow-400" />
              : <Moon size={18} className="text-primary-600" />
            }
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 hover:border-primary-500 transition-all duration-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <X size={18} className="text-light-text dark:text-dark-text" />
              : <Menu size={18} className="text-light-text dark:text-dark-text" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-4 pt-1 flex flex-col gap-1 border-t border-light-border dark:border-dark-border items-center">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`w-full text-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                ${location.pathname === link.path
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar