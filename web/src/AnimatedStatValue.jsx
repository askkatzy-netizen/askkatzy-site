import { useEffect, useState } from 'react'

export function AnimatedStatValue({ value, duration = 560, delay = 0 }) {
  const firstDigitIndex = value.search(/\d/)
  const lastDigitIndex = value.search(/\d(?!.*\d)/)
  const hasNumber = firstDigitIndex !== -1 && lastDigitIndex !== -1
  const prefix = hasNumber ? value.slice(0, firstDigitIndex) : ''
  const numericPart = hasNumber ? value.slice(firstDigitIndex, lastDigitIndex + 1) : ''
  const suffix = hasNumber ? value.slice(lastDigitIndex + 1) : ''
  const targetValue = hasNumber ? Number(numericPart.replace(/[^\d.]/g, '')) : 0
  const [currentValue, setCurrentValue] = useState(hasNumber ? 0 : value)

  useEffect(() => {
    if (!hasNumber || Number.isNaN(targetValue)) {
      setCurrentValue(value)
      return undefined
    }

    let animationFrameId = null
    let startTimestamp = null
    const timeoutId = window.setTimeout(() => {
      const animate = (timestamp) => {
        if (startTimestamp == null) startTimestamp = timestamp
        const elapsed = timestamp - startTimestamp
        const progress = Math.min(elapsed / duration, 1)
        setCurrentValue(Math.round(targetValue * progress))

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(animate)
        }
      }

      animationFrameId = window.requestAnimationFrame(animate)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      if (animationFrameId != null) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [delay, duration, hasNumber, targetValue, value])

  if (!hasNumber || Number.isNaN(targetValue)) return value
  return `${prefix}${currentValue}${suffix}`
}
