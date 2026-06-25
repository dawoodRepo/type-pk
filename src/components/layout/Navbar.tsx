import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Logo from '../logo/Logo'

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const floating = scrolled || menuOpen

  return (
    <div
      ref={menuRef}
      className="fixed z-50 top-0 left-0 right-0 flex justify-center transition-all duration-700 ease-out"
      style={{
        padding: floating ? '12px 16px' : '0px',
        transition: 'padding 700ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <nav
        className={`w-full transition-all duration-700 ease-out
          ${floating
            ? 'max-w-[680px] rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-2xl border border-white/60 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.6)_inset] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.08)_inset]'
            : 'max-w-[1200px] rounded-none bg-transparent border-transparent shadow-none'
          }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500
          ${floating ? 'h-12 px-4' : 'h-16 px-4 max-w-6xl mx-auto'}`}
        >
          {/* Logo */}
          <Link to="/" aria-label="TypePK Home">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5">
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

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200
                ${floating
                  ? 'bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/50 dark:border-white/15'
                  : 'border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 hover:border-primary-500'
                }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun size={16} className="text-yellow-400" />
                : <Moon size={16} className="text-primary-600" />
              }
            </button>

            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className={`md:hidden p-2 rounded-xl transition-all duration-200
                ${floating
                  ? 'bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 border border-white/50 dark:border-white/15'
                  : 'border border-light-border dark:border-dark-border bg-light-surface/80 dark:bg-dark-surface/80 hover:border-primary-500'
                }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X size={16} className="text-light-text dark:text-dark-text" />
                : <Menu size={16} className="text-light-text dark:text-dark-text" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-4 pb-3 pt-0.5 flex flex-col gap-0.5 border-t border-white/30 dark:border-white/10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200
                  ${location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400 bg-white/40 dark:bg-white/10'
                    : 'text-light-subtext dark:text-dark-subtext hover:text-light-text dark:hover:text-dark-text hover:bg-white/30 dark:hover:bg-white/10'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
