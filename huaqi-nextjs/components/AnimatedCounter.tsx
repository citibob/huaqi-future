'use client'

import { useEffect, useState, useRef } from 'react'

export default function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  // After initial animation, add subtle fluctuation
  useEffect(() => {
    if (!hasAnimated.current) return
    const interval = setInterval(() => {
      setDisplay(prev => {
        const delta = Math.floor(Math.random() * 5) - 2 // -2 to +2
        return Math.max(0, prev + delta)
      })
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [display])

  return <span ref={ref}>{display.toLocaleString()}</span>
}
