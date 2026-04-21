import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import streamElementsLogo from './assets/StreamElementsLogo.svg'
import graptapLogoDefault from './assets/graptap-logo-default.svg'
import graptapLogoHover from './assets/graptap-logo-hover.svg'
import graptapBg from './assets/graptap-bg.svg'
import bossAiCog from './assets/boss-ai-cog.svg'
import campaignBriefVector from './assets/campaign-brief-vector-brief.svg'
import { DesignSprintsWordmark } from './DesignSprintsWordmark.jsx'
import { HumanDesignBanner } from './HumanDesignBanner.jsx'
import squareFishDefault from './assets/Piranha_default.png'
import squareFishHover from './assets/Piranha_hover.png'
import tooltipHorse from './assets/type_horse.png'
import tooltipAskkatzy from './assets/type_Askkatzy.png'
import tooltipLoveStory from './assets/type_LoveStory.png'
import tooltipPacman from './assets/type_pac-man.png'
import tooltipNela from './assets/type_Nela.png'
import linkedInIcon from './assets/arrow-right.svg'
import linkedInMobileIcon from './assets/linkedin.svg'
import mailIcon from './assets/mail.svg'
import profileFace from './assets/profile-face.png'
import redPopupTile from './assets/red-popup-tile.png'
import tripletsSvg from './assets/triplets.svg'
import rocketSvg from './assets/rocket.svg'
import wowShapeSvg from './assets/wow-shape.svg'
import ramsterAvatar from './assets/ramster-avatar.png'
import luluAvatar from './assets/lulu-avatar.png'

const projectCards = [
  {
    key: 'creators-spons',
    title: 'Sponsorships',
    tag: 'Helping 1M+ creators win',
    brand: 'stream',
    section: 'stream-elements',
  },
  {
    key: 'graptap',
    title: 'GrabTap',
    tag: 'Play-to-earn app',
    brand: 'graptap',
    section: 'stream-elements',
  },
  {
    key: 'boss-ai',
    title: 'BOSS.AI',
    tag: 'AI Campaign Engine',
    brand: 'boss',
    section: 'stream-elements',
  },
  {
    key: 'campaign-brief',
    title: 'Campaign brief',
    tag: 'Brief automation',
    brand: 'stream',
    section: 'stream-elements',
  },
  {
    key: 'design-sprints',
    title: 'Design Sprints prototyping',
    tag: 'Rapid prototyping',
    brand: 'red',
    section: 'red',
  },
  {
    key: 'squarefish',
    title: 'SquareFish',
    tag: 'Mobile game',
    brand: 'squarefish',
    section: 'red',
  },
]

const beyondLines = [
  'I have an identical twin brother.',
]

const GMAIL_COMPOSE_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=askkatzy@gmail.com&su=Let%27s%20chat'

const headerCtas = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: linkedInIcon,
    width: '142px',
    href: 'https://www.linkedin.com/in/eyalk65/',
  },
  {
    key: 'lets-chat',
    label: "Let's chat",
    icon: mailIcon,
    width: '150px',
    href: GMAIL_COMPOSE_URL,
  },
]

const redStats = [
  { value: '16', label: 'Years' },
  { value: '15', label: 'Team members' },
  { value: '500+', label: 'Projects delivered' },
  { value: 'Millions', label: 'Impacted users' },
]

function RedStatsRow() {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const [rowStarts, setRowStarts] = useState([0])

  useEffect(() => {
    const updateRowStarts = () => {
      const elements = itemRefs.current.filter(Boolean)
      if (elements.length === 0) return

      let lastTop = null
      const starts = []
      elements.forEach((el, index) => {
        if (lastTop === null || Math.abs(el.offsetTop - lastTop) > 1) {
          starts.push(index)
          lastTop = el.offsetTop
        }
      })

      setRowStarts((prev) => {
        const isSame =
          prev.length === starts.length && prev.every((value, idx) => value === starts[idx])
        return isSame ? prev : starts
      })
    }

    updateRowStarts()
    const observer = new ResizeObserver(updateRowStarts)
    if (containerRef.current) observer.observe(containerRef.current)
    window.addEventListener('resize', updateRowStarts)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateRowStarts)
    }
  }, [])

  const isRowStart = (index) => rowStarts.includes(index)

  return (
    <div ref={containerRef} className="mt-4 flex flex-wrap items-start gap-y-3">
      {redStats.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          className="relative min-w-[64px] px-3 text-center"
        >
          {!isRowStart(index) && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-[calc(100%-8px)] -translate-y-1/2 border-l border-black/15"
            />
          )}
          <p className="font-roboto-slab text-[32px] leading-[1.4] font-semibold">{stat.value}</p>
          <p className="text-[12px] leading-[1.4]">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

const RED_POPUP_TRANSITION_MS = 240

function RedPopupModal({ open, onClose }) {
  const [shapeOffset, setShapeOffset] = useState({ x: 0, y: 0 })
  const [entered, setEntered] = useState(false)
  const [mounted, setMounted] = useState(open)

  useLayoutEffect(() => {
    /* DOM overlay enter/exit: reset `entered` before paint (reopen animation + closing transition). */
    /* eslint-disable react-hooks/set-state-in-effect */
    if (open) {
      setMounted(true)
      setEntered(false)
    } else if (mounted) {
      setEntered(false)
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, mounted])

  useEffect(() => {
    if (!open || !mounted) return undefined

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntered(true))
    })
    return () => window.cancelAnimationFrame(id)
  }, [open, mounted])

  useEffect(() => {
    if (open || !mounted) return undefined

    const t = window.setTimeout(() => setMounted(false), RED_POPUP_TRANSITION_MS)
    return () => window.clearTimeout(t)
  }, [open, mounted])

  useEffect(() => {
    if (!mounted) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [mounted, onClose])

  if (!mounted) return null

  const handleHeadMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rawX = -((event.clientX - centerX) / (rect.width / 2)) * 20
    const rawY = -((event.clientY - centerY) / (rect.height / 2)) * 20
    const x = Math.max(-20, Math.min(20, rawX))
    const y = Math.max(-20, Math.min(20, rawY))
    setShapeOffset({ x, y })
  }

  const handleHeadMouseLeave = () => {
    setShapeOffset({ x: 0, y: 0 })
  }

  return (
    <div
      className="fixed inset-0 z-[120] overflow-y-auto px-[56px] py-4 max-[700px]:px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`red-popup__backdrop fixed inset-0 transition-opacity duration-[240ms] ease-out ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundColor: '#AF4FFD',
          backgroundImage: `url(${redPopupTile})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '32px 32px',
        }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none relative z-10 mx-auto flex min-h-full w-full max-w-[1200px] flex-col items-center justify-start pt-14 pb-14"
        role="dialog"
        aria-modal="true"
        aria-label="About RED"
      >
        <div
          className={`red-popup__enter pointer-events-auto flex w-full flex-col items-center gap-[32px] ${
            open
              ? `transition-transform duration-[240ms] ease-out ${entered ? 'translate-y-0' : 'translate-y-[100px]'}`
              : ''
          }`}
          onClick={(event) => event.stopPropagation()}
        >
        {open && (
          <>
          <div className="red-popup__card w-full overflow-hidden rounded-[40px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div
            className="relative grid grid-cols-1 gap-[40px] overflow-hidden p-10 min-[893px]:grid-cols-2"
            onMouseMove={handleHeadMouseMove}
            onMouseLeave={handleHeadMouseLeave}
          >
            <div className="relative">
              <p className="font-roboto-slab text-[48px] leading-[1.4] font-semibold text-black/90">RED</p>
              <RedStatsRow />
              <div
                className="red-popup__shape-layer pointer-events-none absolute -left-[314px] top-[501px] hidden h-[674px] w-[680px] items-center justify-center transition-transform duration-150 ease-out min-[893px]:flex"
                style={{ transform: `translate3d(${shapeOffset.x}px, ${shapeOffset.y}px, 0)` }}
                aria-hidden="true"
              >
                <div className="red-popup__shape-enter">
                  <img
                    src={wowShapeSvg}
                    alt=""
                    aria-hidden="true"
                    className="h-[401px] w-[556px] opacity-95"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
              <p className="font-bold text-black/90">16 years in 60 seconds...</p>
              <p>
                In 2006, I co-founded RED, a digital product agency, with a simple motto:{' '}
                <strong className="italic">"Grow with a smile."</strong> Years later, once we had grown
                enough and smiled a lot, we updated our mission to what we do best:{' '}
                <strong className="italic">"Damn good Products."</strong>
              </p>
              <p>
                As co-founder and Head of Design and Operations, I balanced the creative craft with
                the operational grind. My role was to ensure we delivered high-end product work while
                successfully navigating tight deadlines, budgets, and team needs. We shipped hundreds
                of projects across a range of verticals, supporting clients in raising significant funding.
              </p>
              <p>
                In 2018, we pivoted RED toward Design Sprints and partnered with{' '}
                <strong className="text-black/90">Google Israel</strong> as their local chapter. Beyond
                running sprints, we launched an education program to train new facilitators. I
                mentored them on the <span className="text-[#2b00ff]">prototyping phase</span> - sharing
                our experience on how to turn abstract ideas into functional experiences in a matter
                of hours.
              </p>
              <p>
                That journey led to an acquisition by StreamElements, and in 2022 the RED team joined
                to help build the future of the creator economy.
              </p>
              <div className="mt-1">
                <img src={tripletsSvg} alt="" aria-hidden="true" className="mb-2 h-6 w-auto" />
                <p className="text-[12px]">Co-founded with my talented partners:</p>
                <div className="mt-2 flex gap-4">
                  <a
                    className="red-partner text-center"
                    href="https://www.linkedin.com/in/ram-almog-82513017/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="red-partner__thumb">
                      <img
                        src={ramsterAvatar}
                        alt="Ramster"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="red-partner__mask" aria-hidden="true">
                        <img src={rocketSvg} alt="" className="red-partner__rocket" />
                      </div>
                    </div>
                    <p className="red-partner__name mt-1 text-[12px] text-black/50">Ramster</p>
                  </a>
                  <a
                    className="red-partner text-center"
                    href="https://www.linkedin.com/in/oritzetouni/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="red-partner__thumb">
                      <img src={luluAvatar} alt="Lulu" className="h-16 w-16 rounded-full object-cover" />
                      <div className="red-partner__mask" aria-hidden="true">
                        <img src={rocketSvg} alt="" className="red-partner__rocket" />
                      </div>
                    </div>
                    <p className="red-partner__name mt-1 text-[12px] text-black/50">Lulu</p>
                  </a>
                </div>
                <a
                  href="http://www.red-id.com"
                  target="_blank"
                  rel="noreferrer"
                  className="header-cta--case-studies header-cta--ghost mt-3 inline-flex"
                >
                  <img src={rocketSvg} alt="" aria-hidden="true" className="header-cta__icon" />
                  <span>www.red-id.com</span>
                </a>
              </div>
            </div>
          </div>
          </div>

          <button type="button" onClick={onClose} className="red-popup__close">
            <span aria-hidden="true" className="red-popup__close-icon">
              ✕
            </span>
            <span>Close</span>
          </button>
          </>
        )}
        </div>
      </div>
    </div>
  )
}

function TooltipWord({ children, imageSrc, label }) {
  const tooltipId = useId()
  const anchorRef = useRef(null)
  const bubbleRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [shiftX, setShiftX] = useState(0)
  const [placement, setPlacement] = useState('top')

  const canHover = useCallback(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover)').matches
  }, [])

  const updatePosition = useCallback(() => {
    if (!bubbleRef.current || !anchorRef.current) return

    const bubbleRect = bubbleRef.current.getBoundingClientRect()
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const viewportPadding = 8
    const spaceAbove = anchorRect.top - viewportPadding
    const nextPlacement = spaceAbove < bubbleRect.height + 24 ? 'bottom' : 'top'

    const rawLeft = anchorRect.left + anchorRect.width / 2 - bubbleRect.width / 2
    const minLeft = viewportPadding
    const maxLeft = window.innerWidth - viewportPadding - bubbleRect.width
    const clampedLeft = Math.min(Math.max(rawLeft, minLeft), maxLeft)
    const nextShiftX = clampedLeft - rawLeft

    setShiftX(nextShiftX)
    setPlacement(nextPlacement)
  }, [])

  const openTooltip = useCallback(() => {
    if (!canHover()) return
    setIsOpen(true)
    requestAnimationFrame(updatePosition)
  }, [canHover, updatePosition])

  const closeTooltip = useCallback(() => {
    if (!canHover()) return
    setIsOpen(false)
    setShiftX(0)
    setPlacement('top')
  }, [canHover])

  const resetTooltip = useCallback(() => {
    setIsOpen(false)
    setShiftX(0)
    setPlacement('top')
  }, [])

  const toggleTooltipOnMobile = useCallback(
    (event) => {
      if (canHover()) return
      event.preventDefault()
      event.stopPropagation()
      setIsOpen((prev) => {
        const next = !prev
        if (next) {
          window.dispatchEvent(
            new CustomEvent('beyond-tooltip-open', { detail: { id: tooltipId } }),
          )
          // Wait for mobile-open styles to render before measuring/clamping.
          requestAnimationFrame(() => requestAnimationFrame(updatePosition))
        } else {
          setShiftX(0)
          setPlacement('top')
        }
        return next
      })
    },
    [canHover, tooltipId, updatePosition],
  )

  useEffect(() => {
    if (!isOpen || canHover()) return undefined

    const closeOnDocumentClick = () => resetTooltip()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') resetTooltip()
    }
    const updateOnViewportChange = () => requestAnimationFrame(updatePosition)

    document.addEventListener('click', closeOnDocumentClick)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', updateOnViewportChange)
    window.addEventListener('scroll', updateOnViewportChange, { passive: true })
    return () => {
      document.removeEventListener('click', closeOnDocumentClick)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', updateOnViewportChange)
      window.removeEventListener('scroll', updateOnViewportChange)
    }
  }, [canHover, isOpen, resetTooltip, updatePosition])

  useEffect(() => {
    const closeIfAnotherTooltipOpened = (event) => {
      if (event.detail?.id !== tooltipId) resetTooltip()
    }

    window.addEventListener('beyond-tooltip-open', closeIfAnotherTooltipOpened)
    return () => {
      window.removeEventListener('beyond-tooltip-open', closeIfAnotherTooltipOpened)
    }
  }, [resetTooltip, tooltipId])

  return (
    <span
      ref={anchorRef}
      className="beyond-tooltip-anchor"
      data-placement={placement}
      data-open={isOpen ? 'true' : 'false'}
      style={{ '--tooltip-shift-x': `${shiftX}px` }}
      onMouseEnter={openTooltip}
      onMouseLeave={closeTooltip}
      onFocus={openTooltip}
      onBlur={closeTooltip}
      onClick={toggleTooltipOnMobile}
    >
      {children}
      <span ref={bubbleRef} className="beyond-tooltip-bubble" aria-hidden="true">
        {label ? (
          <span className="beyond-tooltip-label">{label}</span>
        ) : (
          <img src={imageSrc} alt="" className="beyond-tooltip-image" />
        )}
      </span>
    </span>
  )
}

function App() {
  const streamElementsCards = projectCards.filter((project) => project.section === 'stream-elements')
  const redCards = projectCards.filter((project) => project.section === 'red')
  const [isRedModalOpen, setIsRedModalOpen] = useState(false)
  const [supportsHover, setSupportsHover] = useState(true)
  const [activeCaseIndex, setActiveCaseIndex] = useState(0)
  const caseItemRefs = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(hover: hover)')
    const updateSupportsHover = () => setSupportsHover(mediaQuery.matches)

    updateSupportsHover()
    mediaQuery.addEventListener('change', updateSupportsHover)
    return () => mediaQuery.removeEventListener('change', updateSupportsHover)
  }, [])

  useEffect(() => {
    if (supportsHover) return undefined

    let frameId = 0
    const updateActiveCard = () => {
      frameId = 0
      const viewportCenterY = window.innerHeight / 2
      let closestIndex = -1
      let closestDistance = Number.POSITIVE_INFINITY

      caseItemRefs.current.forEach((element, index) => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        const centerY = rect.top + rect.height / 2
        const distance = Math.abs(centerY - viewportCenterY)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex >= 0) setActiveCaseIndex(closestIndex)
    }

    const queueUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(updateActiveCard)
    }

    queueUpdate()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)

    return () => {
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [supportsHover])

  const renderCaseStudyCard = (project, index) => (
    <article
      key={project.key}
      ref={(el) => {
        caseItemRefs.current[index] = el
      }}
      className={`case-study-item fade-up group ${
        !supportsHover && activeCaseIndex === index ? 'case-study-item--active' : ''
      }`}
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <div
        className={`case-thumb ${
          project.key === 'creators-spons'
            ? 'case-thumb--sponsorships'
            : project.key === 'campaign-brief'
              ? 'case-thumb--campaign-brief'
              : project.brand === 'graptap'
              ? 'case-thumb--graptap'
              : project.brand === 'boss'
                ? 'case-thumb--boss'
                : project.brand === 'red'
                  ? 'case-thumb--red'
                  : project.brand === 'squarefish'
                    ? 'case-thumb--squarefish'
                    : 'case-thumb--stream'
        }`}
      >
        <div className="case-thumb__surface">
          {project.key === 'creators-spons' ? (
            <>
              <img
                src={streamElementsLogo}
                alt="StreamElements logo"
                className="case-thumb__logo case-thumb__logo--spons-idle"
              />
              <div className="case-thumb__spons-hover" aria-hidden="true">
                <img
                  src={streamElementsLogo}
                  alt=""
                  className="case-thumb__logo case-thumb__logo--spons-hover-logo"
                />
              </div>
            </>
          ) : project.key === 'boss-ai' ? (
            <>
              <div className="case-thumb__boss-mark">
                <div className="case-thumb__boss-cog" aria-hidden="true">
                  <img src={bossAiCog} alt="" className="case-thumb__boss-cog-img" />
                </div>
                <div className="case-thumb__boss-ring">
                  <svg
                    className="case-thumb__boss-ring-svg"
                    viewBox="0 0 102 102"
                    overflow="visible"
                    shapeRendering="geometricPrecision"
                    aria-hidden="true"
                  >
                    <path
                      className="case-thumb__boss-ring-path"
                      vectorEffect="nonScalingStroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M51 0C79.1665 0 102 22.8335 102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51C0 22.8335 22.8335 0 51 0Z"
                    />
                  </svg>
                </div>
                <div className="case-thumb__boss-sparkle" aria-hidden="true">
                  <svg
                    className="case-thumb__boss-sparkle-svg"
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="case-thumb__boss-sparkle-path"
                      d="M19.28 4.92478C19.355 4.52334 19.568 4.16076 19.8822 3.89984C20.1964 3.63892 20.5919 3.49609 21.0003 3.49609C21.4087 3.49609 21.8042 3.63892 22.1184 3.89984C22.4325 4.16076 22.6456 4.52334 22.7205 4.92478L24.5598 14.6513C24.6904 15.3428 25.0265 15.9789 25.5241 16.4765C26.0217 16.9741 26.6578 17.3102 27.3493 17.4408L37.0758 19.28C37.4772 19.355 37.8398 19.568 38.1007 19.8822C38.3616 20.1964 38.5045 20.5919 38.5045 21.0003C38.5045 21.4087 38.3616 21.8042 38.1007 22.1184C37.8398 22.4325 37.4772 22.6456 37.0758 22.7205L27.3493 24.5598C26.6578 24.6904 26.0217 25.0265 25.5241 25.5241C25.0265 26.0217 24.6904 26.6578 24.5598 27.3493L22.7205 37.0758C22.6456 37.4772 22.4325 37.8398 22.1184 38.1007C21.8042 38.3616 21.4087 38.5045 21.0003 38.5045C20.5919 38.5045 20.1964 38.3616 19.8822 38.1007C19.568 37.8398 19.355 37.4772 19.28 37.0758L17.4408 27.3493C17.3102 26.6578 16.9741 26.0217 16.4765 25.5241C15.9789 25.0265 15.3428 24.6904 14.6513 24.5598L4.92478 22.7205C4.52334 22.6456 4.16076 22.4325 3.89984 22.1184C3.63892 21.8042 3.49609 21.4087 3.49609 21.0003C3.49609 20.5919 3.63892 20.1964 3.89984 19.8822C4.16076 19.568 4.52334 19.355 4.92478 19.28L14.6513 17.4408C15.3428 17.3102 15.9789 16.9741 16.4765 16.4765C16.9741 15.9789 17.3102 15.3428 17.4408 14.6513L19.28 4.92478Z"
                    />
                  </svg>
                </div>
              </div>
            </>
          ) : project.key === 'campaign-brief' ? (
            <>
              <div className="case-thumb__campaign-brief-vector" aria-hidden="true">
                <img
                  src={campaignBriefVector}
                  alt=""
                  className="case-thumb__campaign-brief-vector-img"
                />
              </div>
              <div className="case-thumb__campaign-brief-mark">
                <div className="case-thumb__campaign-brief-ring">
                  <svg
                    className="case-thumb__campaign-brief-ring-svg"
                    viewBox="0 0 102 102"
                    overflow="visible"
                    shapeRendering="geometricPrecision"
                    aria-hidden="true"
                  >
                    <path
                      className="case-thumb__campaign-brief-ring-path"
                      vectorEffect="nonScalingStroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M51 0C79.1665 0 102 22.8335 102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51C0 22.8335 22.8335 0 51 0Z"
                    />
                  </svg>
                </div>
                <div className="case-thumb__campaign-brief-icon" aria-hidden="true">
                  <svg
                    className="case-thumb__campaign-brief-icon-svg"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M47.25 11.25H6.75M33.75 27H6.75M38.25 42.75H6.75"
                    />
                  </svg>
                </div>
              </div>
            </>
          ) : project.key === 'graptap' ? (
            <>
              <div className="case-thumb__graptap-deco" aria-hidden="true">
                <img src={graptapBg} alt="" className="case-thumb__graptap-pattern-bg" />
                <img
                  src="/graptap-hover-illustration.png"
                  alt=""
                  className="case-thumb__graptap-illustration"
                />
              </div>
              <div className="case-thumb__graptap-mark">
                <div className="case-thumb__graptap-ring">
                  <svg
                    className="case-thumb__graptap-ring-svg"
                    viewBox="0 0 102 102"
                    overflow="visible"
                    shapeRendering="geometricPrecision"
                    aria-hidden="true"
                  >
                    <path
                      className="case-thumb__graptap-ring-path"
                      vectorEffect="nonScalingStroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M51 0C79.1665 0 102 22.8335 102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51C0 22.8335 22.8335 0 51 0Z"
                    />
                  </svg>
                </div>
                <div className="case-thumb__graptap-glyph-idle">
                  <img src={graptapLogoDefault} alt="" />
                </div>
                <div className="case-thumb__graptap-glyph-hover">
                  <img src={graptapLogoHover} alt="" />
                </div>
              </div>
            </>
          ) : project.brand === 'squarefish' ? (
            <>
              <img
                src={squareFishDefault}
                alt="SquareFish default art"
                className="case-thumb__squarefish case-thumb__squarefish--default"
              />
              <img
                src={squareFishHover}
                alt=""
                aria-hidden="true"
                className="case-thumb__squarefish case-thumb__squarefish--hover"
              />
            </>
          ) : project.key === 'design-sprints' ? (
            <DesignSprintsWordmark />
          ) : (
            <img src={streamElementsLogo} alt="StreamElements logo" className="case-thumb__logo" />
          )}
        </div>
        <span className="case-thumb__tag">{project.tag}</span>
      </div>
      <p
        className={`mt-2 ml-[40px] text-black/40 transition-colors duration-[160ms] ease-out group-hover:text-black/90 ${
          !supportsHover && activeCaseIndex === index ? 'text-black/90' : ''
        }`}
      >
        <span className="font-roboto-slab text-[16px] font-semibold leading-none">{project.title}</span>
      </p>
    </article>
  )

  return (
    <main className="min-h-screen bg-white px-[56px] py-5 text-[#111111] max-[700px]:px-4">
      <div className="mx-auto w-full max-w-[1128px] fade-up">
        <header className="header-sticky mb-7 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[48px] w-[36px] items-center justify-center overflow-hidden">
              <img
                src={profileFace}
                alt="Eyal Katz"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="header-name-role leading-none tracking-[0.01em]">
              <span className="text-[18px] font-semibold text-black/90">Eyal Katz</span>
              <span className="header-role-separator text-[16px] font-normal text-black/70"> / </span>
              <span className="header-role-label text-[16px] font-normal text-black/70">
                Product Designer
              </span>
            </p>
          </div>

          <div className="header-cta-row flex items-center gap-2">
            {headerCtas.map((cta) => (
              <a
                key={cta.key}
                href={cta.href || undefined}
                target={cta.key === 'linkedin' ? '_blank' : undefined}
                rel={cta.key === 'linkedin' ? 'noopener noreferrer' : undefined}
                className={`header-cta--case-studies header-top-cta ${
                  cta.key === 'case-studies' ? 'header-cta-hide-under-880' : ''
                } ${
                  cta.key === 'cv'
                    ? 'header-cta-hide-under-800'
                    : ''
                } ${
                  cta.key === 'lets-chat' ? 'header-lets-chat-cta' : ''
                }`}
                style={{ '--cta-fixed-width': cta.width }}
              >
                {cta.key === 'linkedin' ? (
                  <>
                    <img
                      src={linkedInIcon}
                      alt=""
                      aria-hidden="true"
                      className="header-cta__icon header-cta__icon--linkedin-desktop"
                    />
                    <img
                      src={linkedInMobileIcon}
                      alt=""
                      aria-hidden="true"
                      className="header-cta__icon header-cta__icon--linkedin-mobile"
                    />
                  </>
                ) : (
                  <img src={cta.icon} alt="" aria-hidden="true" className="header-cta__icon" />
                )}
                <span className={cta.key === 'lets-chat' ? 'header-lets-chat-label' : ''}>
                  {cta.label}
                </span>
              </a>
            ))}
          </div>
        </header>

        <section className="case-studies-layout mb-10">
          <div className="case-studies-intro">
            <p className="mb-4 text-[20px] italic leading-[1.4] text-black/90">
              {'👋 I’m a designer and former co-founder of '}
              <button
                type="button"
                className="intro__red-action"
                aria-haspopup="dialog"
                aria-expanded={isRedModalOpen}
                onClick={() => setIsRedModalOpen(true)}
              >
                RED
              </button>
              {', combining pixel-perfect design with team leadership experience.'}
            </p>
            <p className="mb-4 text-[14px] leading-[1.4] text-black/70">
              {'With a background in 3D and animation, I still have a soft spot for thoughtful motion - and a good feel for how things should look and move.'}
            </p>
            <p className="mb-4 text-[14px] leading-[1.4] text-black/70">
              {'I led design and operations at '}
              <strong className="font-semibold text-black/70">RED</strong>
              {', helping deliver “Damn Good Products” across hundreds of projects. After the '}
              <strong className="font-semibold text-black/70">StreamElements</strong>
              {' acquisition, I stayed close to the craft - working hands-on across core products used by millions, with a focus on meaningful impact.'}
            </p>
            <p className="mb-4 text-[14px] leading-[1.4] text-black/70">
              {'My experience helps me when things get stressful; I keep things moving with clarity, focus - and just enough humor to keep everyone sane.'}
            </p>
            <p className="text-[14px] leading-[1.4] text-black/70">I genuinely enjoy what I do.</p>

            <button className="header-cta--case-studies header-cta--ghost mt-8">
              <svg
                className="header-cta__icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 20.25C4.5 16.9363 7.18629 14.25 10.5 14.25H13.5C16.8137 14.25 19.5 16.9363 19.5 20.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>See full Bio</span>
            </button>
          </div>

          <div className="case-studies-content">
            <div className="case-studies-divider" aria-hidden="true">
              <div className="case-studies-divider__line" />
              <p className="case-studies-divider__label">@ StreamElements</p>
              <div className="case-studies-divider__line" />
            </div>
            <div className="case-studies-grid">
              {streamElementsCards.map((project, index) => renderCaseStudyCard(project, index))}
            </div>

            <div className="case-studies-divider mt-8" aria-hidden="true">
              <div className="case-studies-divider__line" />
              <p className="case-studies-divider__label">@ RED</p>
              <div className="case-studies-divider__line" />
            </div>
            <div className="case-studies-grid mt-8">
              {redCards.map((project, index) =>
                renderCaseStudyCard(project, streamElementsCards.length + index),
              )}
            </div>
          </div>
        </section>

        <div className="separator-line" />

        <section
          className="px-3 py-8 text-center fade-up"
          style={{ animationDelay: '420ms' }}
        >
          <h2 className="font-roboto-slab mb-7 text-[36px] font-semibold leading-[1.05] tracking-[-0.01em] text-black/90">
            Beyond the Pixels
          </h2>
          <div className="beyond-the-pixels-copy space-y-10 py-4">
            {beyondLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <TooltipWord label="Happily married">Happily married</TooltipWord>{' '}
              and a proud dad to two amazing, curly-haired daughters.
            </p>
            <p>
              <TooltipWord imageSrc={tooltipNela}>Nela</TooltipWord>{' '}
              is a great addition to any
              office. 🐶
            </p>
            <p>
              My short 3D animation,{' '}
              <TooltipWord imageSrc={tooltipLoveStory}>‘Love Story’</TooltipWord>
              ,
              won first prize in an international competition.
            </p>
            <p>
              I’m happiest when folding cardboard into{' '}
              <TooltipWord imageSrc={tooltipHorse}>playful objects</TooltipWord>
              .
            </p>
            <p>
              At Bezalel, my team turned a physio-ball into a giant{' '}
              <TooltipWord imageSrc={tooltipPacman}>Pac-Man</TooltipWord>{' '}
              controller.
              <br />
              Even the Academy’s president, Prof. Zuckerman, couldn’t hide his joy.
            </p>
            <p>
              <TooltipWord imageSrc={tooltipAskkatzy}>‘Askkatzy’</TooltipWord>{' '}
              was born from hosting
              video sessions to help anyone solve Figma challenges.
            </p>
          </div>
        </section>

        <div className="separator-line" />

        <footer className="footer-contact-row flex items-center justify-center gap-4 px-2 py-4 text-[9.6px] tracking-[0.01em] text-[#6d6d6d]">
          <p className="text-[14px] text-black/70 font-semibold italic">🌻 Let’s do nice things together...</p>
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cta--case-studies header-cta--ghost"
          >
            <img src={mailIcon} alt="" aria-hidden="true" className="header-cta__icon" />
            <span>askkatzy@gmail.com</span>
          </a>
        </footer>

        <div className="separator-line" />

        <HumanDesignBanner />
      </div>
      <RedPopupModal open={isRedModalOpen} onClose={() => setIsRedModalOpen(false)} />
    </main>
  )
}

export default App
