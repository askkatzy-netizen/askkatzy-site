import humanDesignHoverSvg from './assets/human-design-hover.svg?raw'
import tool1Figma from './assets/tool1-Figma.svg'
import tool2Cursor from './assets/tool2-Cursor.svg'
import tool3Gemini from './assets/tool3-Gemini.svg'
import tool4Github from './assets/tool4-Github.svg'
import { useEffect, useState } from 'react'

export function HumanDesignBanner() {
  const [isToolsActive, setIsToolsActive] = useState(false)
  const [supportsHover, setSupportsHover] = useState(true)
  const tools = [tool1Figma, tool2Cursor, tool3Gemini, tool4Github]

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mediaQuery = window.matchMedia('(hover: hover)')
    const sync = () => setSupportsHover(mediaQuery.matches)
    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!isToolsActive || supportsHover) return undefined
    const closeOnOutsidePointerDown = (event) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (target.closest('.human-design-banner__stage')) return
      setIsToolsActive(false)
    }
    document.addEventListener('pointerdown', closeOnOutsidePointerDown, true)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown, true)
  }, [isToolsActive, supportsHover])

  return (
    <section
      className="human-design-banner pointer-events-none mt-16 flex -translate-y-[12px] justify-center px-4 pb-[56px]"
      aria-label="Human design"
    >
      <div
        className={`human-design-banner__stage pointer-events-auto shrink-0 ${
          isToolsActive ? 'human-design-banner__stage--tools-active' : ''
        }`}
        onPointerUp={(event) => {
          if (supportsHover || event.pointerType === 'mouse') return
          setIsToolsActive((prev) => !prev)
        }}
      >
        <div
          className="human-design-banner__hover-layer"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: humanDesignHoverSvg }}
        />
        <div className="human-design-banner__tools" aria-hidden="true">
          {tools.map((toolSrc, index) => (
            <span key={index} className="human-design-banner__tool-chip">
              <img src={toolSrc} alt="" className="human-design-banner__tool-icon" />
            </span>
          ))}
        </div>

        <div className="human-design-banner__idle">
          <div
            className="human-design-banner__icon-ring flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 ease-out"
            aria-hidden="true"
          >
            <svg
              className="human-design-banner__bot block shrink-0 overflow-visible"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="human-design-banner__bot-path"
                d="M27.3401 16H36.0001C37.061 16 38.0784 16.4214 38.8285 17.1716C39.5787 17.9217 40.0001 18.9391 40.0001 20V28.66M4 28H8M40 28H44M44 44L4 4M16 16H12C10.9391 16 9.92172 16.4214 9.17157 17.1716C8.42143 17.9217 8 18.9391 8 20V36C8 37.0609 8.42143 38.0783 9.17157 38.8284C9.92172 39.5786 10.9391 40 12 40H36C37.0608 39.9998 38.078 39.5782 38.828 38.828M18 26V30M19.3401 8H24.0001V12.66"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
