import { useEffect, useState } from 'react'

const DeviceAlert = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window
    if (mobile) setIsMobile(true)
  }, [])

  if (!isMobile || dismissed) return null

  return (
    <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 px-4 py-2.5 flex items-center justify-between gap-3">
      <p className="text-xs text-amber-800 dark:text-amber-400 text-center flex-1">
        ⚠️ ETEA exams require a physical keyboard. Switch to a PC or laptop for proper practice.
      </p>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 text-xs shrink-0"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}

export default DeviceAlert
