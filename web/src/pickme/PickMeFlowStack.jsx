import { useEffect, useRef } from 'react'

/**
 * Three PickMe screens — start tight, expand horizontally on scroll to width-correct spread.
 */
export function PickMeFlowStack({ images, title }) {
  const [back, middle, front] = images
  const shellRef = useRef(null)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const stack = shell.querySelector('.pickme-flow-stack')
    if (!stack) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      stack.style.setProperty('--pm-scroll-progress', '1')
      return undefined
    }

    let raf = 0

    const updateSpread = () => {
      raf = 0
      const rect = shell.getBoundingClientRect()
      const vh = window.innerHeight
      // Long range: starts before the stack enters view, finishes well after
      const start = vh * 1.25
      const end = vh * 0.12
      const linear = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      const progress = 1 - (1 - linear) ** 1.6
      stack.style.setProperty('--pm-scroll-progress', String(progress))
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateSpread)
    }

    updateSpread()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={shellRef} className="pickme-flow-stack-shell">
      <div className="pickme-flow-stack" role="img" aria-label={`PickMe product flow — ${title}`}>
        <div className="pickme-flow-stack__frame pickme-flow-stack__frame--back">
          <img src={back} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
        <div className="pickme-flow-stack__frame pickme-flow-stack__frame--middle">
          <img src={middle} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
        <div className="pickme-flow-stack__frame pickme-flow-stack__frame--front">
          <img src={front} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  )
}
