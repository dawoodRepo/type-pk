import { useTheme } from '../../context/ThemeContext'

interface LogoMarkProps {
  size?: number
  className?: string
}

const LogoMark = ({ size = 32, className = '' }: LogoMarkProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const bgFill = isDark ? 'rgba(255,255,255,0.07)' : '#e4e4ed'
  const bgStroke = isDark ? 'transparent' : '#d1d1df'
  const keyFill = isDark ? '#818cf8' : '#4F46E5'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Keyboard body */}
      <rect width="88" height="70" rx="12" fill={bgFill} stroke={bgStroke} strokeWidth="1.5" />

      {/* Three keys — fading in opacity */}
      <rect x="14" y="13" width="16" height="14" rx="3" fill={keyFill} opacity="0.25" />
      <rect x="35" y="13" width="16" height="14" rx="3" fill={keyFill} opacity="0.65" />
      <rect x="56" y="13" width="16" height="14" rx="3" fill={keyFill} />

      {/* Spacebar — slimmer */}
      <rect x="14" y="33" width="58" height="10" rx="3" fill={keyFill} />
    </svg>
  )
}

interface LogoProps {
  className?: string
}

const Logo = ({ className = '' }: LogoProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <span className={`flex items-center gap-2 font-bold text-xl ${className}`}>
      <LogoMark size={32} />
      <span style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
        Type<span style={{ color: isDark ? '#818cf8' : '#4f46e5' }}>PK</span>
      </span>
    </span>
  )
}

export { LogoMark }
export default Logo
