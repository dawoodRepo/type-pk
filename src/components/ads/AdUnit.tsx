import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: 'top-banner' | 'results' | 'sidebar' | 'blog-inline'
  className?: string
}

const AD_CONFIG: Record<string, { key: string; width: number; height: number }> = {
  'top-banner': { key: '5fb26772792f7f9ef0a07a7c44c9f8df', width: 728, height: 90 },
  'blog-inline': { key: '5fb26772792f7f9ef0a07a7c44c9f8df', width: 728, height: 90 },
  'results': { key: 'c8dd20a1b2cfc9a9726304fae79407ea', width: 300, height: 250 },
}

const AD_SIZES: Record<string, string> = {
  'top-banner': 'h-24 md:h-20',
  'results': 'h-80',
  'sidebar': 'h-64',
  'blog-inline': 'h-32',
}

const IS_PRODUCTION = import.meta.env.PROD

const AdUnit = ({ slot, className = '' }: AdUnitProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!IS_PRODUCTION) return
    if (!containerRef.current) return
    if (containerRef.current.firstChild) return

    const config = AD_CONFIG[slot]
    if (!config) return

    const configScript = document.createElement('script')
    configScript.type = 'text/javascript'
    configScript.innerHTML = `
      atOptions = {
        'key' : '${config.key}',
        'format' : 'iframe',
        'height' : ${config.height},
        'width' : ${config.width},
        'params' : {}
      };
    `

    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src = `//www.highperformanceformat.com/${config.key}/invoke.js`

    containerRef.current.appendChild(configScript)
    containerRef.current.appendChild(invokeScript)
  }, [slot])

  if (!IS_PRODUCTION) {
    const config = AD_CONFIG[slot]
    return (
      <div
        className={`w-full ${AD_SIZES[slot]} ${className}
          flex items-center justify-center
          border border-dashed border-light-border dark:border-dark-border
          rounded-xl bg-light-surface/50 dark:bg-dark-surface/50`}
      >
        <span className="text-xs text-light-subtext dark:text-dark-subtext opacity-50">
          Ad ({config?.width}x{config?.height}), {slot}
        </span>
      </div>
    )
  }

  const config = AD_CONFIG[slot]

  return (
    <div className={`w-full flex flex-col items-center gap-1.5 ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-light-subtext/60 dark:text-dark-subtext/60">
        Advertisement
      </span>
      <div
        ref={containerRef}
        style={{ width: `${config?.width}px`, height: `${config?.height}px` }}
      />
    </div>
  )
}

export default AdUnit
