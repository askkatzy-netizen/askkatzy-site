import { Fragment, useEffect, useRef, useState } from 'react'
import { AnimatedStatValue } from './AnimatedStatValue.jsx'
import arrowLeftIcon from './assets/arrow-left.svg'
import pickMeFlowImage1 from './assets/image-1.png'
import pickMeFlowImage2 from './assets/image-2.png'
import pickMeFlowImage3 from './assets/image-3b.png'
import pickMeFlowImage4 from './assets/image-4.png'
import pickMeFlowImage5 from './assets/image-5.png'
import mailIcon from './assets/mail.svg'
import rocketSvg from './assets/rocket.svg'
import {
  formatPickMeTitle,
  getManagedCaseStudyByKey,
  getPickMeName,
} from './thumbDesigner/caseStudiesCatalog.js'
import { useCaseStudyCatalogRevision } from './thumbDesigner/useCaseStudyCatalogRevision.js'
import { PickMeHandBlobVisual } from './pickme/PickMeHandBlobVisual.jsx'

const GMAIL_COMPOSE_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=askkatzy@gmail.com&su=Let%27s%20chat'

const PICKME_APP_URL = 'https://pickme.askkatzy.com/'

const MOBILE_FLOATER_HIDE_DOWN_SCROLL_PX = 80
const MOBILE_FLOATER_ACTIVATION_UP_SCROLL_PX = 80

const PICKME_STATS = [
  { value: '1', label: 'user (me)' },
  { value: '13', label: 'preferences' },
  { value: '8', label: 'jobs competing' },
  { value: '1', label: 'job picked' },
]

const PICKME_DESIGN_GUIDELINES = ['Don’t take it seriously']

const PICKME_TOOLS = ['Figma', 'Cursor', 'Open AI/API', 'Google Maps/API']

const PICKME_FLOW_SECTIONS = [
  {
    key: 'onboarding',
    title: 'Quick onboarding',
    subtitle: 'Set your preferences',
    image: pickMeFlowImage1,
  },
  {
    key: 'ranking',
    title: 'Rank as you go',
    subtitle: 'With AI suggestions',
    image: pickMeFlowImage2,
  },
  {
    key: 'matches',
    title: 'Review your matches',
    subtitle: 'Ranked jobs, FAQs, and profile',
    image: pickMeFlowImage3,
  },
  {
    key: 'insights',
    title: 'Get job insights',
    subtitle: 'About, challenges, fit, and cover letter',
    image: pickMeFlowImage4,
  },
  {
    key: 'spin',
    title: 'Can\u2019t decide? Spin.',
    subtitle: 'For when choosing gets hard',
    image: pickMeFlowImage5,
  },
]

function PickMeBrandText({ children }) {
  return <strong className="font-bold text-black/70">{children}</strong>
}

function PickMeStatsRow() {
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
    <div ref={containerRef} className="flex w-full max-w-[560px] flex-wrap items-start gap-y-4">
      {PICKME_STATS.map((stat, index) => (
        <div
          key={stat.label}
          ref={(el) => {
            itemRefs.current[index] = el
          }}
          className="relative w-[120px] px-3 text-center"
        >
          {index > 0 && !isRowStart(index) ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-[66px] w-px -translate-y-1/2 bg-black/15"
            />
          ) : null}
          <div className="flex flex-col items-center leading-[1.4] text-black">
            <p className="font-roboto-slab text-[32px] font-semibold leading-[1.4]">
              <AnimatedStatValue value={stat.value} delay={index * 120} />
            </p>
            <p className="text-[12px] leading-[1.4]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function PickMeCaseStudyPage({ onBack, catalogKey = 'pickme-eyal' }) {
  useCaseStudyCatalogRevision()
  const pickMeEntry = getManagedCaseStudyByKey(catalogKey)
  const pickMeName = getPickMeName(pickMeEntry)
  const pickMeTagline = pickMeEntry?.tag?.trim() || 'Jobs compete for you!'
  const pageTitle = formatPickMeTitle(pickMeName)
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const upScrollDistanceRef = useRef(0)
  const downScrollDistanceRef = useRef(0)
  const idleHideTimerRef = useRef(null)
  const isFloaterHoveredRef = useRef(false)
  const suppressFloaterOnResizeUntilRef = useRef(0)
  const [showFloatingHome, setShowFloatingHome] = useState(false)
  const [isTopHomeInView, setIsTopHomeInView] = useState(true)

  useEffect(() => {
    const topButton = topHomeButtonRef.current
    if (!topButton) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopHomeInView(entry.isIntersecting)
      },
      { root: null, threshold: 0 },
    )
    observer.observe(topButton)

    const clearIdleHideTimer = () => {
      if (!idleHideTimerRef.current) return
      window.clearTimeout(idleHideTimerRef.current)
      idleHideTimerRef.current = null
    }

    const scheduleIdleHide = () => {
      if (isFloaterHoveredRef.current) return
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        if (isFloaterHoveredRef.current) return
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      if (Date.now() < suppressFloaterOnResizeUntilRef.current) {
        lastScrollYRef.current = currentScrollY
        return
      }
      const previousScrollY = lastScrollYRef.current
      const isScrollingUp = currentScrollY < previousScrollY
      const isScrollingDown = currentScrollY > previousScrollY
      const upScrollDelta = isScrollingUp ? previousScrollY - currentScrollY : 0
      const downScrollDelta = isScrollingDown ? currentScrollY - previousScrollY : 0
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        upScrollDistanceRef.current = 0
        downScrollDistanceRef.current = 0
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        upScrollDistanceRef.current = 0
        downScrollDistanceRef.current += downScrollDelta
        if (
          downScrollDistanceRef.current >= MOBILE_FLOATER_HIDE_DOWN_SCROLL_PX &&
          !isFloaterHoveredRef.current
        ) {
          setShowFloatingHome(false)
          clearIdleHideTimer()
        }
      } else if (isScrollingUp) {
        downScrollDistanceRef.current = 0
        upScrollDistanceRef.current += upScrollDelta
        const hasEnoughUpScroll =
          upScrollDistanceRef.current >= MOBILE_FLOATER_ACTIVATION_UP_SCROLL_PX
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView && hasEnoughUpScroll
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    const onResize = () => {
      suppressFloaterOnResizeUntilRef.current = Date.now() + 500
      lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
      upScrollDistanceRef.current = 0
      downScrollDistanceRef.current = 0
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  return (
    <main
      className="pickme-case-study-page min-h-screen bg-[#B6448A] px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#B6448A' }}
    >
      <div className="mx-auto flex w-full max-w-[1128px] flex-col gap-8">
        <header className="flex items-center justify-start">
          <button
            ref={topHomeButtonRef}
            type="button"
            onClick={onBack}
            className="boss-back-cta header-cta--case-studies inline-flex"
          >
            <img src={arrowLeftIcon} alt="" aria-hidden="true" className="header-cta__icon" />
            <span>Home</span>
          </button>
        </header>

        <div
          className={`case-study-floater case-study-floater--pickme ${
            showFloatingHome ? 'case-study-floater--visible' : ''
          }`}
          onMouseEnter={() => {
            isFloaterHoveredRef.current = true
            if (!showFloatingHome || !idleHideTimerRef.current) return
            window.clearTimeout(idleHideTimerRef.current)
            idleHideTimerRef.current = null
          }}
          onMouseLeave={() => {
            isFloaterHoveredRef.current = false
            if (!showFloatingHome) return
            if (idleHideTimerRef.current) window.clearTimeout(idleHideTimerRef.current)
            idleHideTimerRef.current = window.setTimeout(() => {
              if (isFloaterHoveredRef.current) return
              setShowFloatingHome(false)
            }, 800)
          }}
        >
          <button
            type="button"
            onClick={onBack}
            onPointerDown={(event) => {
              if (event.pointerType === 'mouse') return
              event.preventDefault()
              onBack()
            }}
            className="case-study-floater__button"
            aria-label="Back to home"
          >
            <span className="case-study-floater__icon-chip">
              <img src={arrowLeftIcon} alt="" aria-hidden="true" className="case-study-floater__icon" />
            </span>
            <span className="case-study-floater__label">{pageTitle}</span>
          </button>
        </div>

        <div className="flex flex-col">
          <div className="overflow-hidden rounded-t-[40px] rounded-b-none bg-white max-[700px]:rounded-t-[32px] max-[700px]:rounded-b-none">
            <section className="bg-black/5 p-10 max-[700px]:px-4 max-[700px]:py-6">
            <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="flex min-w-0 flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <h1 className="font-roboto-slab max-w-[504px] text-[48px] leading-[1.15] font-semibold text-black/90">
                    {pageTitle}
                  </h1>
                  <p className="text-[16px] leading-[1.4] font-medium text-black/50">Self initiated, 2026</p>
                </div>

                <PickMeStatsRow />
              </div>

              <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
                <p>
                  When I suddenly found myself job hunting, I discovered that ranking companies is way more fun
                  than applying to them.
                </p>
                <p>
                  So I built <PickMeBrandText>PickMe</PickMeBrandText>
                  {' - an app where jobs ask me to pick them instead. At least in my browser.'}
                </p>
                <p>
                  I define what matters most to me, and <PickMeBrandText>PickMe</PickMeBrandText> ranks companies
                  accordingly. AI analyzes job descriptions, highlights strengths and potential concerns, and
                  generates tailored cover letters.
                </p>
                <p>
                  Turns out building <PickMeBrandText>PickMe </PickMeBrandText>
                  was a better use of my time than refreshing job boards. It helped me level up my AI skills,
                  figure out what I actually wanted in my next role, and eventually land it.
                </p>

                <div className="mt-1 flex w-full flex-col gap-3">
                  <p className="text-[12px] leading-[1.4] text-black/70">Design guidelines</p>
                  <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                    {PICKME_DESIGN_GUIDELINES.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[50px] bg-[#B6448A]/20 px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-1 flex w-full flex-col gap-3">
                  <p className="text-[12px] leading-[1.4] text-black/70">Tools</p>
                  <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                    {PICKME_TOOLS.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[50px] bg-[#B6448A]/20 px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="header-pickme-promo">
                  <p className="header-pickme-disclaimer">
                    Built primarily for high-tech roles. Still evolving.
                  </p>
                  <a
                    href={PICKME_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-pickme-cta header-cta--case-studies header-cta--ghost inline-flex w-fit"
                  >
                    <img src={rocketSvg} alt="" aria-hidden="true" className="header-cta__icon" />
                    <span>
                      PickMe{' '}
                      <span className="header-pickme-beta">BETA</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            </section>
          </div>

          <section className="overflow-hidden rounded-t-none rounded-b-[40px] bg-white px-10 py-20 max-[700px]:rounded-t-none max-[700px]:rounded-b-[32px] max-[700px]:px-4 max-[700px]:py-10">
            <div className="mx-auto flex w-full max-w-[968px] flex-col items-center gap-20 max-[700px]:gap-14">
              <div className="pickme-case-brand-card flex flex-col items-center gap-4 rounded-lg border border-black bg-white p-6 shadow-[3px_3px_0_0_#000]">
                <PickMeHandBlobVisual size="brand" />

                <div className="flex flex-col items-center gap-0.5 text-center leading-[1.4] text-black/90">
                  <div className="flex items-start justify-center gap-1 text-[20px] font-bold text-black/90">
                    <span>PickMe</span>
                    <span>{'{name}'}</span>
                  </div>
                  <p className="text-[14px] italic text-black/90">{pickMeTagline}</p>
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-14 max-[700px]:gap-10">
                {PICKME_FLOW_SECTIONS.map((section) => (
                  <Fragment key={section.key}>
                    <div aria-hidden="true" className="h-px w-full bg-black" />

                    <div className="flex w-full flex-col items-center gap-10 max-[700px]:gap-6">
                      <div className="flex w-full flex-col items-center gap-2 text-center">
                        <h2 className="text-[28px] leading-[1.4] font-medium text-black/90 max-[700px]:text-[24px]">
                          {section.title}
                        </h2>
                        <p className="text-[16px] leading-[1.4] text-black/70">{section.subtitle}</p>
                      </div>

                      <div className="mx-auto w-full max-w-[640px]">
                        <img
                          src={section.image}
                          alt={`PickMe product flow — ${section.title}`}
                          className="block h-auto w-full"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="footer-contact-row flex items-center justify-center gap-4 px-2 py-4 pb-8">
          <p className="text-[14px] font-semibold italic text-white/90">
            🌻 Let’s build nice things together...
          </p>
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="boss-back-cta header-cta--case-studies"
          >
            <img src={mailIcon} alt="" aria-hidden="true" className="header-cta__icon" />
            <span>askkatzy@gmail.com</span>
          </a>
        </footer>
      </div>
    </main>
  )
}
