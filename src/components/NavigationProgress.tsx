import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const INSTANT_THRESHOLD = 100

const NavigationProgress = () => {
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingRef = useRef(false)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto')) return
      if (href === location.pathname) return

      pendingRef.current = true

      timeoutRef.current = setTimeout(() => {
        if (!pendingRef.current) return

        if (intervalRef.current) clearInterval(intervalRef.current)
        setVisible(true)
        setProgress(10)

        let current = 10
        intervalRef.current = setInterval(() => {
          current += Math.random() * 12
          if (current >= 85) {
            current = 85
            clearInterval(intervalRef.current!)
          }
          setProgress(current)
        }, 150)
      }, INSTANT_THRESHOLD)
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === prevPathRef.current) return
    prevPathRef.current = location.pathname

    pendingRef.current = false

    if (!visible && progress === 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setProgress(100)
    timeoutRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 300)
  }, [location.pathname, visible, progress])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 bg-primary-500 pointer-events-none"
      style={{
        width: `${progress}%`,
        transition: progress === 100
          ? 'width 0.25s ease-out'
          : 'width 0.15s linear',
      }}
    />
  )
}

export default NavigationProgress
