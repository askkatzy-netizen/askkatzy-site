import { useEffect, useRef, useState } from 'react'
import bubbleSvgDefault from './assets/_bubble.svg'

export function SquareFishThumbBubbles({ bubbleSrc = bubbleSvgDefault }) {
  const maxActiveBubbles = 5
  const [bubbles, setBubbles] = useState([])
  const nextBubbleIdRef = useRef(0)
  const visibilityRootRef = useRef(null)

  useEffect(() => {
    const rootEl = visibilityRootRef.current
    if (!rootEl) return undefined

    const spawnTimeouts = new Set()
    const removeTimeouts = new Set()
    let isUnmounted = false
    let isLoopRunning = false
    let loopGeneration = 0
    let inView = false
    let tabVisible = typeof document === 'undefined' ? true : document.visibilityState === 'visible'

    const clearSpawnTimers = () => {
      spawnTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
      spawnTimeouts.clear()
    }

    const clearRemoveTimers = () => {
      removeTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
      removeTimeouts.clear()
    }

    const stopBubbleLoop = (clearDom) => {
      loopGeneration += 1
      clearSpawnTimers()
      clearRemoveTimers()
      isLoopRunning = false
      if (clearDom) {
        setBubbles([])
      }
    }

    const scheduleNextSpawn = () => {
      if (isUnmounted || !isLoopRunning) return
      const nextDelayMs = 760 + Math.random() * 1040
      const timeoutId = window.setTimeout(() => {
        spawnTimeouts.delete(timeoutId)
        if (isUnmounted || !isLoopRunning) return
        spawnBubble()
        scheduleNextSpawn()
      }, nextDelayMs)
      spawnTimeouts.add(timeoutId)
    }

    const buildBubble = () => {
      const sizeScale = 0.48 + Math.random() * 0.72
      const t = (sizeScale - 0.48) / 0.72
      const opacity = 0.22 + t * 0.48
      const durationMs = Math.round(13800 - t * 8800)
      const delayMs = Math.round(Math.random() * 420)
      const rotateTo = `${(Math.random() * 40 - 20).toFixed(2)}deg`
      const id = nextBubbleIdRef.current
      nextBubbleIdRef.current += 1
      return {
        id,
        size: sizeScale,
        opacity,
        durationMs,
        delayMs,
        rotateTo,
        startX: `${10 + Math.random() * 80}%`,
        driftX1: `${(Math.random() * 64 - 32).toFixed(1)}px`,
        driftX2: `${(Math.random() * 80 - 40).toFixed(1)}px`,
        driftX3: `${(Math.random() * 96 - 48).toFixed(1)}px`,
      }
    }

    const spawnBubble = () => {
      if (isUnmounted || !isLoopRunning) return

      setBubbles((current) => {
        if (current.length >= maxActiveBubbles) return current
        const bubble = buildBubble()
        const spawnGen = loopGeneration
        queueMicrotask(() => {
          if (isUnmounted || spawnGen !== loopGeneration) return
          const removeTimeoutId = window.setTimeout(() => {
            removeTimeouts.delete(removeTimeoutId)
            if (isUnmounted || spawnGen !== loopGeneration) return
            setBubbles((next) => next.filter((item) => item.id !== bubble.id))
          }, bubble.durationMs + bubble.delayMs + 400)
          removeTimeouts.add(removeTimeoutId)
        })
        return [...current, bubble]
      })
    }

    const startBubbleLoop = () => {
      if (isUnmounted || isLoopRunning) return
      isLoopRunning = true
      const startGen = loopGeneration
      scheduleNextSpawn()
      queueMicrotask(() => {
        if (isUnmounted || !isLoopRunning || startGen !== loopGeneration) return
        spawnBubble()
      })
    }

    const refreshVisibilityGate = () => {
      const shouldRun = inView && tabVisible && !isUnmounted
      if (shouldRun) {
        startBubbleLoop()
      } else if (isLoopRunning) {
        stopBubbleLoop(true)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        refreshVisibilityGate()
      },
      { root: null, threshold: 0.08, rootMargin: '72px 0px 72px 0px' },
    )

    const onVisibilityChange = () => {
      tabVisible = document.visibilityState === 'visible'
      refreshVisibilityGate()
    }

    observer.observe(rootEl)
    document.addEventListener('visibilitychange', onVisibilityChange)
    refreshVisibilityGate()

    return () => {
      isUnmounted = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      clearSpawnTimers()
      clearRemoveTimers()
    }
  }, [])

  return (
    <span ref={visibilityRootRef} className="case-thumb__squarefish-bubbles" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="case-thumb__squarefish-bubble"
          style={{
            '--bubble-start-x': bubble.startX,
            '--bubble-drift-x-1': bubble.driftX1,
            '--bubble-drift-x-2': bubble.driftX2,
            '--bubble-drift-x-3': bubble.driftX3,
            '--bubble-rotate-end': bubble.rotateTo,
            '--bubble-size': bubble.size,
            '--bubble-opacity': bubble.opacity,
            '--bubble-duration': `${bubble.durationMs}ms`,
            '--bubble-delay': `${bubble.delayMs}ms`,
          }}
        >
          <img src={bubbleSrc} alt="" />
        </span>
      ))}
    </span>
  )
}
