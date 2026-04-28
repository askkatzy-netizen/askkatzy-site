import { useEffect, useRef, useState } from 'react'
import stickerDot01 from './assets/sticker-dot-01.svg'
import stickerDot02 from './assets/sticker-dot-02.svg'
import stickerDot03 from './assets/sticker-dot-03.svg'
import stickerDot04 from './assets/sticker-dot-04.svg'
import stickerDot05 from './assets/sticker-dot-05.svg'
import stickerDot06 from './assets/sticker-dot-06.svg'

const STICKER_DOTS = [
  { key: '01', src: stickerDot01 },
  { key: '02', src: stickerDot02 },
  { key: '03', src: stickerDot03 },
  { key: '04', src: stickerDot04 },
  { key: '05', src: stickerDot05 },
  { key: '06', src: stickerDot06 },
]
const STICKER_EXIT_MS = 1200

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function DesignSprintsWordmark({ isActive = false }) {
  const [stickers, setStickers] = useState([])
  const rootRef = useRef(null)
  const isHoveringRef = useRef(false)
  const spawnTimeoutRef = useRef(null)
  const removalTimeoutsRef = useRef([])
  const countRef = useRef(0)

  const clearTimeoutRef = (timeoutRef) => {
    if (!timeoutRef.current) return
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }

  const clearAllTimers = () => {
    clearTimeoutRef(spawnTimeoutRef)
    removalTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    removalTimeoutsRef.current = []
  }

  const scheduleNext = (delayMs) => {
    clearTimeoutRef(spawnTimeoutRef)
    spawnTimeoutRef.current = window.setTimeout(() => {
      if (!isHoveringRef.current) return

      const randomDot = STICKER_DOTS[randomInt(0, STICKER_DOTS.length - 1)]
      const dotId = `${Date.now()}-${countRef.current}`
      const enterFromLeft = Math.random() < 0.5
      const nextSticker = {
        id: dotId,
        variant: randomDot.key,
        src: randomDot.src,
        left: randomInt(8, 92),
        top: randomInt(10, 90),
        rotate: randomInt(-24, 24),
        scale: randomInt(80, 120) / 100,
        fromX: `${(enterFromLeft ? -1 : 1) * randomInt(14, 34)}px`,
        fromY: `${randomInt(-10, 10)}px`,
      }

      setStickers((prev) => {
        const next = [...prev, nextSticker]

        if (next.length > 100) {
          const oldestIndex = next.findIndex((sticker) => !sticker.isExiting)
          if (oldestIndex !== -1) {
            const oldestId = next[oldestIndex].id
            next[oldestIndex] = { ...next[oldestIndex], isExiting: true }

            const removalTimeout = window.setTimeout(() => {
              setStickers((current) => current.filter((sticker) => sticker.id !== oldestId))
            }, STICKER_EXIT_MS)
            removalTimeoutsRef.current.push(removalTimeout)
          }
        }

        return next
      })
      countRef.current += 1
      const nextDelay = countRef.current < 5 ? 200 : randomInt(200, 700)
      scheduleNext(nextDelay)
    }, delayMs)
  }

  const startLoop = () => {
    isHoveringRef.current = true
    clearAllTimers()
    setStickers([])
    countRef.current = 0
    scheduleNext(0)
  }

  const stopLoop = () => {
    isHoveringRef.current = false
    clearAllTimers()
    setStickers([])
    countRef.current = 0
  }

  useEffect(() => {
    const root = rootRef.current
    const hoverTarget = root?.closest('.group') || root?.closest('.case-study-item')

    if (!hoverTarget) return () => clearAllTimers()

    hoverTarget.addEventListener('mouseenter', startLoop)
    hoverTarget.addEventListener('mouseleave', stopLoop)

    return () => {
      hoverTarget.removeEventListener('mouseenter', startLoop)
      hoverTarget.removeEventListener('mouseleave', stopLoop)
      clearAllTimers()
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      startLoop()
      return
    }

    stopLoop()
  }, [isActive])

  return (
    <div
      ref={rootRef}
      className="case-thumb__design-sprints"
      aria-hidden="true"
    >
      <div className="case-thumb__design-sprints-stickers">
        {stickers.map((sticker) => (
          <img
            key={sticker.id}
            src={sticker.src}
            alt=""
            className={`case-thumb__design-sprints-sticker sticker-dot-${sticker.variant} ${
              sticker.isExiting ? 'case-thumb__design-sprints-sticker--oldest-exit' : ''
            }`}
            style={{
              left: `${sticker.left}%`,
              top: `${sticker.top}%`,
              '--from-x': sticker.fromX,
              '--from-y': sticker.fromY,
              '--sticker-rotate': `${sticker.rotate}deg`,
              '--sticker-scale': sticker.scale,
            }}
          />
        ))}
      </div>
      <div className="case-thumb__design-sprints-stack">
        <div className="case-thumb__design-sprints-cluster">
          <div className="case-thumb__design-sprints-mark">
            <svg
              className="case-thumb__design-sprints-svg"
              width="156"
              height="59"
              viewBox="0 0 156 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
          <path
            className="sprint-fill-r1"
            d="M0 55.3323L1.07353 47.4598C1.99505 48.2759 4.57935 49.7154 7.54433 48.9436C11.2506 47.979 11.6592 40.8371 10.2432 30.6595C8.82717 20.4819 6.96866 12.8709 13.6947 4.99428C19.0756 -1.30697 27.6032 1.65159 31.1944 3.91853L26.9398 10.9968C26.5143 10.6358 25.5628 9.82095 25.1605 9.44963C24.6577 8.98547 22.2209 7.20624 18.7011 9.44963C15.1813 11.693 15.5065 19.3094 16.4608 26.4663C17.415 33.6232 19.2043 42.8078 15.5065 50.7997C12.5484 57.1931 3.93628 56.4854 0 55.3323Z"
          />
          <path
            className="sprint-fill-r2"
            d="M46.085 1.06543C48.9241 1.06543 55.7907 2.45229 54.2061 12.1582C52.6214 21.8641 50.9048 28.7975 44.3682 33.4854C39.1391 37.2353 34.7506 37.2483 33.21 36.7861L26.6729 55.3398H18.4863L37.2373 1.06543H46.085ZM42.5859 8.19629L35.1904 29.8525C35.6086 29.9186 36.6695 30.0109 37.5674 29.8525C38.6898 29.6545 41.3021 28.7132 44.6982 22.7217C48.1602 16.6139 47.2692 12.7433 46.1738 10.0547C45.5928 8.6287 43.4224 8.08635 42.5859 8.19629Z"
          />
          <path
            className="sprint-fill-r3"
            d="M72.6709 0.567905C76.7404 0.463559 82.7926 2.13314 82.584 13.0894C82.417 21.8544 75.0014 29.1235 71.3145 31.6626L67.7666 55.4536H59.9404L63.3848 34.48H60.6709L53.3672 55.4536H44.915L63.3848 1.29837C65.1241 1.08966 69.4156 0.651385 72.6709 0.567905ZM72.7158 8.51419C71.7262 8.32864 69.8387 8.35684 69.0186 8.39408L63.3838 26.8628C65.9229 26.9672 71.4814 25.4025 73.4014 18.3072C75.8013 9.43799 73.9529 8.74617 72.7158 8.51419Z"
          />
          <path
            className="sprint-fill-r4"
            d="M72.7705 54.69L91.1257 1.08594H98.9971L80.5162 54.69H72.7705Z"
          />
          <path
            className="sprint-fill-k-main"
            d="M126.475 0.560547L128.178 2.80899L109.573 56.9244H104.414L102.538 54.4456L103.543 30.6621L94.4987 56.9244H87.4642L85.6553 54.4456L104.548 0.91597H110.243L112.253 2.80899L111.449 22.9576L119.162 0.560547H126.475Z"
          />
          <path
            className="sprint-fill-accent-soft"
            d="M119.568 1.33301L108.549 33.6478L109.556 1.53405H104.892L86.8389 53.482H92.5885L104.892 16.451L103.324 53.7232H107.184L125.559 1.33301H119.568Z"
          />
          <path
            className="sprint-fill-outline"
            d="M129.067 7.28166L131.631 0.420895L152.478 0L155.394 4.52174L152.854 11.5119H146.385L129.977 58.3494H121.981L119.223 54.118L134.126 11.8208H131.631L129.067 7.28166Z"
          />
          <path
            className="sprint-fill-accent"
            d="M130.148 6.43109L132.079 1.15927L151.713 0.74707L149.608 6.43109H142.883L126.764 53.1181H120.407L136.765 6.43109H130.148Z"
          />
          <path
            className="sprint-fill-detail"
            d="M135.782 7.30935H129.154L131.639 11.8416L134.167 11.7708L135.782 7.30935Z"
          />
          <path
            className="sprint-fill-detail"
            d="M143.302 7.05273L146.417 11.5006H152.874L149.922 7.05273H143.302Z"
          />
          <path
            className="sprint-fill-detail"
            d="M127.27 54.1284H119.267L122.015 58.3065H129.944L127.27 54.1284Z"
          />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
