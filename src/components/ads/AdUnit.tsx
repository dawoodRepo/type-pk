import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: 'top-banner' | 'results' | 'sidebar' | 'blog-inline'
  className?: string
}

// When you get Adsterra codes, paste them here and uncomment the injection in useEffect
// const AD_CODES: Record<string, string> = {
//   'top-banner': 'ADSTERRA_TOP_BANNER_CODE_HERE',
//   'results': 'ADSTERRA_RESULTS_CODE_HERE',
//   'sidebar': 'ADSTERRA_SIDEBAR_CODE_HERE',
//   'blog-inline': 'ADSTERRA_BLOG_INLINE_CODE_HERE',
// }

const AD_SIZES: Record<string, string> = {
  'top-banner': 'h-24 md:h-20',
  'results': 'h-40',
  'sidebar': 'h-64',
  'blog-inline': 'h-32',
}

const IS_PRODUCTION = import.meta.env.PROD

const AdUnit = ({ slot, className = '' }: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!IS_PRODUCTION) return
    if (!adRef.current) return

    // Inject real Adsterra script here when you have the code
    // const script = document.createElement('script')
    // script.innerHTML = AD_CODES[slot]
    // adRef.current.appendChild(script)
  }, [slot])

  if (!IS_PRODUCTION) {
    return (
      <div
        className={`w-full ${AD_SIZES[slot]} ${className} 
          flex items-center justify-center 
          border border-dashed border-light-border dark:border-dark-border 
          rounded-xl bg-light-surface/50 dark:bg-dark-surface/50`}
      >
        <span className="text-xs text-light-subtext dark:text-dark-subtext opacity-50">
          Ad — {slot}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={adRef}
      className={`w-full ${AD_SIZES[slot]} ${className}`}
    />
  )
}

export default AdUnit
