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
import tooltipAskkatzy from './assets/type-askkatzy-2.png'
import tooltipLoveStory from './assets/type_LoveStory.png'
import tooltipPacman from './assets/type_pac-man.png'
import tooltipNela from './assets/type_Nela.png'
import tooltipHappilyMarried from './assets/happily-married.png'
import linkedInIcon from './assets/arrow-right.svg'
import arrowRightIcon from './assets/arrow-right.svg'
import linkedInMobileIcon from './assets/linkedin.svg'
import mailIcon from './assets/mail.svg'
import profileFace from './assets/profile-face.png'
import redPopupTile from './assets/red-popup-tile.png'
import tripletsSvg from './assets/triplets.svg'
import rocketSvg from './assets/rocket.svg'
import pointerSvg from './assets/pointer.svg'
import wowShapeSvg from './assets/wow-shape.svg'
import ramsterAvatar from './assets/ramster-avatar.png'
import luluAvatar from './assets/lulu-avatar.png'
import chevronDownIcon from './assets/chevron-down.svg'
import chevronUpIcon from './assets/chevron-up.svg'
import arrowLeftIcon from './assets/arrow-left.svg'
import boss01Image from './assets/boss-01.png'
import boss02Image from './assets/boss-02.png'
import boss03Image from './assets/boss-03.png'
import boss04Image from './assets/boss-04.png'
import boss05Image from './assets/boss-05.png'
import boss01MobileImage from './assets/boss-01-mobile.png'
import boss02MobileImage from './assets/boss-02-mobile.png'
import boss03MobileImage from './assets/boss-03-mobile.png'
import boss04MobileImage from './assets/boss-04-mobile.png'
import boss05MobileImage from './assets/boss-05-mobile.png'
import sponsListCard1Image from './assets/spons-list-card-1.png'
import sponsListCard2Image from './assets/spons-list-card-2.png'
import sponsListCard3Image from './assets/spons-list-card-3.png'
import sponsListCard4Image from './assets/spons-list-card-4.png'
import sponsListCard5Image from './assets/spons-list-card-5.png'
import sponsCampaignCardRoyalMatchIdle from './assets/spons-campaign-card-royal-match.png'
import sponsOfferMainContentImage from './assets/spons-offer-main-content.png'
import sponsPricingCardImage from './assets/spons-pricing-card.png'
import sponsTrackingOverviewImage from './assets/overview.png'
import sponsCarousel1Image from './assets/Spons-carousel-1.png'
import sponsCarousel2Image from './assets/Spons-carousel-2.png'
import sponsCarousel3Image from './assets/spons_carousel-3b.png'
import gt1Image from './assets/GT-1.png'
import gt1MobileImage from './assets/GT1-mobile.png'
import gt2Image from './assets/GT-2b.png'
import gt3Image from './assets/GT-3.png'
import gt4Image from './assets/GT-4b.png'
import gt5Image from './assets/GT-5.png'
import gtCharacterImage from './assets/GT-character.png'
import gtLogoImage from './assets/GT-logo.png'
import graptapLinkIcon from './assets/graptap-link.svg'
import briefsCheckIcon from './assets/briefs-check.png'
import briefMappingImage from './assets/brief-mapping.png'
import briefCmsImage from './assets/Brief-CMS.png'
import bzLogo from './assets/BZ-logo.svg'
import mceLogo from './assets/MCE-logo.svg'
import husLogo from './assets/HuS-logo.svg'
import bz1Image from './assets/BZ-1.png'
import bz2Image from './assets/BZ-2.png'
import bz3Image from './assets/BZ-3.png'
import bz4Image from './assets/BZ-4.png'
import bz5Image from './assets/BZ-5.png'
import dsBookImage from './assets/DS-book.png'
import mce1Image from './assets/MCE-01.png'
import mce2Image from './assets/MCE-02.png'
import mce3Image from './assets/MCE-03.png'
import mce4Image from './assets/MCE-04.png'
import hus1Image from './assets/HuS-01.png'
import hus2Image from './assets/HuS-02.png'
import hus3Image from './assets/HuS-03.png'
import hus4Image from './assets/HuS-04.png'
import twitchIcon from './assets/twitch.svg'
import youtubeIcon from './assets/youtube.svg'
import tiktokIcon from './assets/tiktok.svg'
import figmaIcon from './assets/figma.svg'
import link2Icon from './assets/link-2.svg'
import startCampaignImage from './assets/_start campaign.gif'

const bossCaseSections = [
  {
    key: 'boss-01',
    title: 'A first time friendly start',
    images: [boss01Image],
    mobileImages: [boss01MobileImage],
  },
  {
    key: 'boss-02',
    title: 'Give AI context and let it work for you',
    images: [boss02Image, boss03Image],
    mobileImages: [boss02MobileImage, boss03MobileImage],
  },
  {
    key: 'boss-03',
    title: 'Minimal campaign setup',
    images: [boss04Image],
    mobileImages: [boss04MobileImage],
  },
  {
    key: 'boss-04',
    title: 'Automated creator groups, curated for outreach',
    images: [boss05Image],
    mobileImages: [boss05MobileImage],
  },
]

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
  { value: '3', label: 'partners' },
  { value: '15', label: 'team members' },
  { value: '500+', label: 'projects delivered' },
  { value: 'Millions', label: 'impacted users' },
]

const sponsorshipStats = [
  { value: '+ 20%', label: 'Campaign starts' },
  { value: '- 95%', label: 'UX related support tickets' },
]

const CASE_STUDY_PATHS = {
  'boss-ai': '/case-studies/boss-ai',
  'creators-spons': '/case-studies/sponsorships',
  graptap: '/case-studies/graptap',
  'campaign-brief': '/case-studies/briefs',
  'design-sprints': '/case-studies/design-sprints',
}

const CASE_STUDY_BY_PATH = Object.fromEntries(
  Object.entries(CASE_STUDY_PATHS).map(([key, path]) => [path, key]),
)

const normalizePathname = (pathname) => {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized === '' ? '/' : normalized
}

const getCaseStudyFromPathname = (pathname) => CASE_STUDY_BY_PATH[normalizePathname(pathname)] ?? null

function AnimatedStatValue({ value, duration = 560, delay = 0 }) {
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

const sponsorshipOfferCards = [
  {
    key: 'hello-fresh',
    image: sponsListCard1Image,
    title: 'HelloFresh',
  },
  {
    key: 'call-of-dragons',
    image: sponsListCard2Image,
    title: 'Call of Dragons',
  },
  {
    key: 'raid-shadow-legends',
    image: sponsListCard3Image,
    title: 'Raid Shadow Legends',
  },
  {
    key: 'star-trek',
    image: sponsListCard4Image,
    title: 'Star Trek Fleet Command',
  },
  {
    key: 'royal-match',
    image: sponsListCard5Image,
    title: 'Royal Match',
  },
]

const sponsorshipBeneathSurfaceSlides = [
  {
    key: 'campaign-head-states',
    label: 'Variants / Campaign head states',
    image: sponsCarousel1Image,
    alt: 'Campaign head states variants',
  },
  {
    key: 'goal-tracking-cards',
    label: 'Variants / Goal tracking cards',
    image: sponsCarousel2Image,
    alt: 'Goal tracking card variants',
  },
  {
    key: 'my-campaign-states',
    label: 'Variants / Campaign assets: 1x1',
    image: `${sponsCarousel3Image}?v=3b-20260424-2`,
    alt: 'My campaigns state variants',
  },
]

const grabTapCaseScreens = [
  { key: 'gt-logo', title: 'Brand / GrabTap logo', image: gtLogoImage },
  { key: 'gt-1', title: 'Core flow / Screen 1', image: gt1Image },
  { key: 'gt-2', title: 'Core flow / Screen 2', image: gt2Image },
  { key: 'gt-3', title: 'Core flow / Screen 3', image: gt3Image },
  { key: 'gt-4', title: 'Core flow / Screen 4', image: gt4Image },
  { key: 'gt-5', title: 'Core flow / Screen 5', image: gt5Image },
]

function CaseStudyImageCarousel({ slides, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredArrow, setHoveredArrow] = useState(null)
  const touchStartXRef = useRef(null)
  const touchDeltaXRef = useRef(0)
  const viewportRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(0)
  const slideGap = 40

  const totalSlides = slides.length

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides)
  }

  const goToIndex = (index) => {
    setActiveIndex(index)
  }

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
    touchDeltaXRef.current = 0
  }

  const handleTouchMove = (event) => {
    if (touchStartXRef.current == null) return
    const currentX = event.touches[0]?.clientX ?? touchStartXRef.current
    touchDeltaXRef.current = currentX - touchStartXRef.current
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null) return
    if (Math.abs(touchDeltaXRef.current) > 48) {
      if (touchDeltaXRef.current < 0) goToNext()
      else goToPrev()
    }
    touchStartXRef.current = null
    touchDeltaXRef.current = 0
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const updateSlideWidth = () => {
      setSlideWidth(viewport.clientWidth)
    }

    updateSlideWidth()
    const observer = new ResizeObserver(updateSlideWidth)
    observer.observe(viewport)
    window.addEventListener('resize', updateSlideWidth)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSlideWidth)
    }
  }, [])

  if (!Array.isArray(slides) || totalSlides === 0) return null

  return (
    <section
      className={`relative flex w-full flex-col gap-4 rounded-[16px] border border-dashed border-[#2B00FF] p-4 max-[700px]:p-3 ${className}`}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') goToPrev()
        if (event.key === 'ArrowRight') goToNext()
      }}
      tabIndex={0}
      aria-label="Image carousel"
    >
      <div
        ref={viewportRef}
        className="overflow-hidden rounded-[12px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: `${slideGap}px`,
            transform: `translateX(-${activeIndex * (slideWidth + slideGap)}px)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.key}
              className="shrink-0"
              style={{ width: slideWidth > 0 ? `${slideWidth}px` : '100%' }}
            >
              <p className="mb-3 text-[14px] leading-[1.4] font-medium text-black/90">
                {slide.label}
              </p>
              <div className="flex h-[504px] w-full items-center justify-center rounded-[16px] bg-black/[0.05] px-8 py-[40px] max-[900px]:h-[432px] max-[700px]:h-[336px] max-[700px]:p-4">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="block h-[461px] w-auto max-w-full object-contain max-[900px]:h-[403px] max-[700px]:h-[317px]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => goToIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeIndex === index ? 'w-6 bg-[#A79BF8]' : 'w-2.5 bg-[#E3DEFC]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 block">
        <button
          type="button"
          onClick={goToPrev}
          onMouseEnter={() => setHoveredArrow('prev')}
          onMouseLeave={() => setHoveredArrow(null)}
          className={`pointer-events-auto absolute left-0 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
            hoveredArrow === 'prev'
              ? 'h-16 w-16 border-[#2B00FF] bg-white shadow-[0_0_0_4px_rgba(43,0,255,0.2)]'
              : 'h-12 w-12 border-black bg-white'
          }`}
          aria-label="Previous slide"
        >
          <img
            src={arrowLeftIcon}
            alt=""
            aria-hidden="true"
            className={`opacity-90 transition-all duration-200 ${
              hoveredArrow === 'prev' ? 'h-7 w-7' : 'h-5 w-5'
            }`}
          />
        </button>
        <button
          type="button"
          onClick={goToNext}
          onMouseEnter={() => setHoveredArrow('next')}
          onMouseLeave={() => setHoveredArrow(null)}
          className={`pointer-events-auto absolute right-0 top-1/2 flex translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
            hoveredArrow === 'next'
              ? 'h-16 w-16 border-[#2B00FF] bg-white shadow-[0_0_0_4px_rgba(43,0,255,0.2)]'
              : 'h-12 w-12 border-black bg-white'
          }`}
          aria-label="Next slide"
        >
          <img
            src={arrowRightIcon}
            alt=""
            aria-hidden="true"
            className={`opacity-100 transition-all duration-200 ${
              hoveredArrow === 'next' ? 'h-7 w-7' : 'h-5 w-5'
            }`}
          />
        </button>
      </div>
    </section>
  )
}

function CaseStudyFooter({ variant = 'home' }) {
  const isCaseStudy = variant === 'case-study'

  return (
    <footer className="footer-contact-row flex items-center justify-center gap-4 px-2 py-4 text-[9.6px] tracking-[0.01em] text-[#6d6d6d]">
      <p className={`text-[14px] font-semibold italic ${isCaseStudy ? 'text-white/90' : 'text-black/70'}`}>
        🌻 Let’s do nice things together...
      </p>
      <a
        href={GMAIL_COMPOSE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={
          isCaseStudy
            ? 'boss-back-cta header-cta--case-studies'
            : 'header-cta--case-studies header-cta--ghost'
        }
      >
        <img src={mailIcon} alt="" aria-hidden="true" className="header-cta__icon" />
        <span>askkatzy@gmail.com</span>
      </a>
    </footer>
  )
}

function BossAiCaseStudyPage({ onBack }) {
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const idleHideTimerRef = useRef(null)
  const suppressFloaterUntilRef = useRef(0)
  const [showFloatingHome, setShowFloatingHome] = useState(false)
  const [isTopHomeInView, setIsTopHomeInView] = useState(true)

  useEffect(() => {
    const topButton = topHomeButtonRef.current
    if (!topButton) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopHomeInView(entry.isIntersecting)
      },
      { root: null, threshold: 0 }
    )
    observer.observe(topButton)

    const clearIdleHideTimer = () => {
      if (!idleHideTimerRef.current) return
      window.clearTimeout(idleHideTimerRef.current)
      idleHideTimerRef.current = null
    }

    const scheduleIdleHide = () => {
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      const isScrollingUp = currentScrollY < lastScrollYRef.current
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingUp) {
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  return (
    <main
      className="min-h-screen bg-[#4CBBA5] px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#4CBBA5' }}
    >
      <div className="mx-auto w-full max-w-[1128px]">
        <header className="mb-8 flex items-center justify-start">
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

        <div className={`case-study-floater ${showFloatingHome ? 'case-study-floater--visible' : ''}`}>
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
            <span className="case-study-floater__label">BOSS.AI</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-t-[40px] rounded-b-none bg-[#F2F2F2] p-10 max-[700px]:rounded-t-[32px] max-[700px]:rounded-b-none max-[700px]:px-4 max-[700px]:py-6">
          <div className="grid grid-cols-1 items-start gap-[40px] min-[893px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-4">
              <p className="font-roboto-slab text-[48px] leading-[1.4] font-semibold text-black/90">BOSS.AI</p>
              <p className="text-[16px] leading-[1.4] font-medium text-black/50">StreamElements, Work in progress</p>
            </div>

            <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
              <p>
                <strong className="font-bold text-black/70">BOSS</strong>
                {' is a robust engine that manages creator campaigns at scale. Originally built for internal personnel, it required specialized training to navigate. '}
              </p>
              <p>
                We are currently transforming BOSS into an intuitive, self-service, AI-powered platform.
                By simplifying complex configurations and stripping away non-essential features, the system
                now leverages AI to identify target audiences, automate creator outreach, streamline
                content approvals, and provide data-backed performance predictions.
              </p>
              <p>
                As this project is in active development, details are limited - stay tuned for the full
                release.
              </p>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black/70">Design guidelines</p>
                <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                  {['Robust', 'Flexible', 'Smart'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] bg-[#b3ecde] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black/70">Design libraries</p>
                <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                  {['shadcn/ui', 'Lucide icons'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] bg-[#b3ecde] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-0 overflow-hidden rounded-t-none rounded-b-[40px] bg-white p-10 max-[700px]:rounded-t-none max-[700px]:rounded-b-[24px] max-[700px]:px-4 max-[700px]:py-6">
          <div className="mb-10 flex flex-col items-center gap-4 text-center max-[700px]:mb-6">
            <p className="text-[14px] leading-[1.4] font-medium text-black/70">A glimpse at the new flow</p>
            <p className="font-roboto-slab text-[36px] leading-[1.2] font-semibold text-black/90">
              Campaign creation, simplified
            </p>
          </div>

          <div className="flex flex-col gap-10 max-[700px]:gap-6">
            {bossCaseSections.map((section, index) => (
              <section key={section.key} className="boss-case-content-section">
                <div className="mb-4 flex flex-col gap-2">
                  <p className="text-[16px] leading-[1.4] font-medium text-black/90">
                    {section.title}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {section.images.map((src, imageIndex) => (
                    <div
                      key={`${section.key}-${imageIndex}`}
                      className={`boss-case-image-shell ${
                        index === bossCaseSections.length - 1 && imageIndex === section.images.length - 1
                          ? 'boss-case-image-shell--no-shadow'
                          : ''
                      }`}
                    >
                      <picture>
                        <source
                          media="(max-width: 700px)"
                          srcSet={section.mobileImages?.[imageIndex] ?? src}
                        />
                        <img
                          src={src}
                          alt={`BOSS.AI product flow section ${index + 1}, image ${imageIndex + 1}`}
                          className="boss-case-image block h-auto w-full"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-10 text-center text-[16px] leading-[1.4] text-black/70 max-[700px]:mt-6">
            Details limited - work in progress.
          </p>
        </section>

        <div className="mt-8 mb-4">
          <CaseStudyFooter variant="case-study" />
        </div>
      </div>
    </main>
  )
}

function BriefsCaseStudyPage({ onBack }) {
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const idleHideTimerRef = useRef(null)
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
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      const isScrollingUp = currentScrollY < lastScrollYRef.current
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingUp) {
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  return (
    <main
      className="min-h-screen bg-[#FF83A0] px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#FF83A0' }}
    >
      <div className="mx-auto w-full max-w-[1128px]">
        <header className="mb-8 flex items-center justify-start">
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
          className={`case-study-floater case-study-floater--briefs ${
            showFloatingHome ? 'case-study-floater--visible' : ''
          }`}
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
            <span className="case-study-floater__label">Campaign briefs</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-t-[40px] rounded-b-none bg-[#F2F2F2] p-10 max-[700px]:rounded-t-[32px] max-[700px]:rounded-b-none max-[700px]:px-4 max-[700px]:py-6">
          <div className="grid grid-cols-1 items-start gap-[40px] min-[893px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <p className="font-roboto-slab text-[48px] leading-[1.4] font-semibold text-black/90">
                  Campaign briefs
                </p>
                <p className="text-[16px] leading-[1.4] font-medium text-black/50">StreamElements, 2024</p>
              </div>

              <div className="flex w-full flex-wrap items-end gap-x-4 gap-y-4 min-[700px]:flex-nowrap">
                <div className="flex min-h-[106px] flex-col items-center justify-end text-center leading-[1.4] text-black">
                  <p className="font-roboto-slab text-[42px] font-semibold">
                    <AnimatedStatValue value="- 95%" />
                  </p>
                  <p className="mt-1 text-[12px]">related support tickets</p>
                </div>
                <span aria-hidden="true" className="h-[66px] w-px bg-black/15" />
                <div className="flex min-h-[106px] flex-col items-center justify-end text-center leading-[1.4] text-black">
                  <span className="mb-[2px] inline-flex h-[45px] w-[45px] items-center justify-center overflow-hidden">
                    <img
                      src={briefsCheckIcon}
                      alt=""
                      aria-hidden="true"
                      className="h-[40px] w-[40px] object-contain"
                    />
                  </span>
                  <p className="mt-1 text-[12px]">Increased productivity</p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
              <p>
                <strong className="font-bold text-black/70">The Problem</strong> - Previously, campaign briefs
                were &quot;locked&quot; until a creator committed. This forced them to start campaigns just to see
                details, creating friction and skewing our metrics.
              </p>
              <p>
                <strong className="font-bold text-black/70">The Iteration</strong> - We initially used manual
                Google Slides briefs to unlock information, but they were prone to human error and couldn't sync
                with our automated campaign data - like duration, goals, and supported devices.
              </p>
              <p>
                <strong className="font-bold text-black/70">The Solution</strong> - We built a dynamic system
                that auto-populates core specs while allowing CMs to add custom content.
              </p>
              <p>
                Our focus was on providing creators with the clarity needed to make informed decisions, automating
                technical data so CMs can focus on custom work, and maintaining a flexible framework that adapts
                to unique campaign needs.
              </p>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black/70">Design guidelines</p>
                <div className="flex flex-wrap gap-2">
                  {['Clear', 'Accessible', 'Intuitive'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] bg-[#FFCDD9] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-0 overflow-hidden rounded-t-none rounded-b-[40px] bg-white p-10 max-[700px]:rounded-t-none max-[700px]:rounded-b-[24px] max-[700px]:px-4 max-[700px]:py-6">
          <section className="flex w-full flex-col items-center gap-6 rounded-[16px] bg-[#131315] p-10 text-white max-[700px]:rounded-[12px] max-[700px]:p-4">
            <div className="flex w-full flex-col gap-4 p-4 max-[700px]:p-0">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold text-white/90">
                Mapping the brief
              </h2>
              <p className="text-[16px] leading-[1.4] text-white/70">
                After auditing the information creators needed, we mapped our content to distinguish between
                automated data and manual input.
              </p>
              <p className="text-[16px] leading-[1.4] text-white/70">
                We built a dedicated CMS section for custom content, allowing CMs to input unique campaign
                details. To ensure accuracy, we added a preview mode so CMs could verify the creator&apos;s view
                before going live.
              </p>
            </div>

            <div className="h-px w-full bg-white/15" />

            <p className="text-center text-[14px] leading-[1.4] text-white/70">
              Sample - YouTube short brief / content mapping👇
            </p>

            <img
              src={briefMappingImage}
              alt="Campaign brief mapping sample"
              className="block h-auto w-full max-w-[690px]"
              loading="lazy"
            />

            <div className="w-full">
              <div className="inline-flex items-center gap-1.5">
                <span className="inline-block h-[11px] w-[11px] rounded-full border-[3.2px] border-[#040404] bg-[#AEFF91] shadow-[4.8px_4px_0_rgba(0,0,0,0.7)]" />
                <p className="font-nunito-sans text-[12px] leading-[1.3] tracking-[-0.08px] text-white/70">
                  Fields inserted in brief
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 flex w-full flex-col gap-6 rounded-[16px] bg-black/5 p-10 text-black max-[700px]:rounded-[12px] max-[700px]:p-4">
            <div className="flex w-full flex-col gap-4 p-4 max-[700px]:p-0">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold text-black/90">
                The CM side
              </h2>
              <p className="text-[16px] leading-[1.4] text-black/70">
                An easy to manage CMS dedicated for briefs
              </p>
            </div>

            <img
              src={briefCmsImage}
              alt="Campaign brief CMS interface"
              className="block h-auto w-full rounded-[8px] border border-black/30"
              loading="lazy"
            />
          </section>
        </section>

        <div className="mt-8 mb-4">
          <CaseStudyFooter variant="case-study" />
        </div>
      </div>
    </main>
  )
}

function DesignSprintsCaseStudyPage({ onBack, onOpenRed }) {
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const idleHideTimerRef = useRef(null)
  const suppressFloaterUntilRef = useRef(0)
  const [showFloatingHome, setShowFloatingHome] = useState(false)
  const [isTopHomeInView, setIsTopHomeInView] = useState(true)
  const [activeDsTab, setActiveDsTab] = useState('bizzabo')
  const dsTabsetRef = useRef(null)
  const dsTabOrder = ['bizzabo', 'mce', 'hub-security']
  const dsTabs = [
    { key: 'bizzabo', label: 'Bizzabo', logo: bzLogo, logoClassName: 'h-[32px] w-auto' },
    { key: 'mce', label: 'MCE', logo: mceLogo, logoClassName: 'h-[20px] w-auto' },
    { key: 'hub-security', label: 'HUB Security', logo: husLogo, logoClassName: 'h-[32px] w-auto' },
  ]
  const dsCaseStudies = {
    bizzabo: {
      title: 'Bizzabo',
      year: '2020',
      description:
        'Challenged by the 2020 pandemic, Bizzabo needed to move fast. We ran a Design Sprint to validate a shift from physical to hybrid events. We transformed their most pressing business questions into a functional prototype, giving them the clarity needed to maintain their market leadership and adapt for the future.',
      image: bz1Image,
      images: [bz1Image, bz2Image, bz3Image, bz4Image, bz5Image],
      imageAlt: 'Bizzabo design sprint prototype sample',
    },
    mce: {
      title: 'MCE',
      year: '2022',
      description:
        'MCE needed to adapt their mobile diagnostic technology for self-service kiosks in major retail stores. We ran a Design Sprint to bridge the gap between their complex testing backend and a simplified user experience. This allowed them to validate the product requirements needed for customers to confidently trade in devices and receive instant refunds.',
      image: mce1Image,
      images: [mce1Image, mce2Image, mce3Image, mce4Image],
      imageAlt: 'MCE design sprint prototype sample',
    },
    'hub-security': {
      title: 'HUB Security',
      year: '2022',
      description:
        'Operating in the high-stakes cybersecurity sector, HUB Security needed to define its product vision from the ground up. We led a Design Sprint to transform complex security concepts into a polished, branded UI. This functional prototype served as a powerful tool for the sales team and provided the project team with a validated roadmap before development began.',
      image: hus1Image,
      images: [hus1Image, hus2Image, hus3Image, hus4Image],
      imageAlt: 'HUB Security design sprint prototype sample',
    },
  }
  const activeDsCaseStudy = dsCaseStudies[activeDsTab]
  const activeDsTabIndex = dsTabOrder.indexOf(activeDsTab)
  const nextDsTabKey = dsTabOrder[(activeDsTabIndex + 1) % dsTabOrder.length]
  const nextDsTab = dsTabs.find((tab) => tab.key === nextDsTabKey)
  const goToNextDsTab = () => {
    suppressFloaterUntilRef.current = Date.now() + 900
    setShowFloatingHome(false)
    setActiveDsTab((currentTab) => {
      const currentIndex = dsTabOrder.indexOf(currentTab)
      const safeIndex = currentIndex >= 0 ? currentIndex : 0
      return dsTabOrder[(safeIndex + 1) % dsTabOrder.length]
    })
    requestAnimationFrame(() => {
      dsTabsetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

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
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      if (Date.now() < suppressFloaterUntilRef.current) {
        setShowFloatingHome(false)
        lastScrollYRef.current = currentScrollY
        return
      }
      const isScrollingUp = currentScrollY < lastScrollYRef.current
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingUp) {
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  return (
    <main
      className="min-h-screen bg-[#036EDC] px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#036EDC' }}
    >
      <div className="mx-auto w-full max-w-[1128px]">
        <header className="mb-8 flex items-center justify-start">
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
          className={`case-study-floater case-study-floater--design-sprints ${
            showFloatingHome ? 'case-study-floater--visible' : ''
          }`}
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
            <span className="case-study-floater__label">Design Sprints Prototyping</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-t-[40px] rounded-b-none bg-[#F2F2F2] p-10 max-[700px]:rounded-t-[24px] max-[700px]:rounded-b-none max-[700px]:px-4 max-[700px]:py-6">
          <div className="grid grid-cols-1 items-start gap-8 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[980px]:gap-10">
            <div className="flex min-w-0 flex-col gap-10">
              <div className="flex flex-col gap-4 leading-[1.4]">
                <h1 className="font-roboto-slab text-[48px] font-semibold text-black/90">
                  Design Sprints Prototyping
                </h1>
                <p className="text-[16px] font-medium text-black/40">RED</p>
              </div>

              <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-4 min-[700px]:flex-nowrap">
                <div className="flex flex-col items-center text-center leading-[1.4] text-black">
                  <p className="font-roboto-slab text-[32px] font-semibold">
                    <AnimatedStatValue value="4" />
                  </p>
                  <p className="text-[12px]">Years of practice</p>
                </div>
                <span aria-hidden="true" className="h-[66px] w-px bg-black/15" />
                <div className="flex flex-col items-center text-center leading-[1.4] text-black">
                  <p className="font-roboto-slab text-[32px] font-semibold">
                    <AnimatedStatValue value="~100" delay={120} />
                  </p>
                  <p className="text-[12px]">Design Sprints</p>
                </div>
                <span aria-hidden="true" className="h-[66px] w-px bg-black/15" />
                <div className="flex flex-col items-center text-center leading-[1.4] text-black">
                  <p className="font-roboto-slab text-[32px] font-semibold">
                    <AnimatedStatValue value="~75" delay={240} />
                  </p>
                  <p className="text-[12px]">Iteration sprints</p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
              <p>
                In 2018, we shifted{' '}
                <button type="button" className="intro__red-action" onClick={onOpenRed}>
                  RED
                </button>{' '}
                towards Design Sprints - a methodology designed to test big ideas while creating immediate
                clarity and alignment for stakeholders.
              </p>
              <p>
                I led the process of transforming complex business questions into high-fidelity, functional
                prototypes <span className="font-bold text-[#FF5100B3]">in just a single day</span>.
              </p>
              <p>
                This allowed our clients to validate market fit and solve user pain points before writing a
                single line of code.
              </p>

              <a
                href="https://www.red-id.com"
                target="_blank"
                rel="noreferrer"
                className="header-cta--case-studies header-cta--ghost mt-3 inline-flex h-12 w-fit !bg-black/5 !px-[22px] !py-[14px] !text-[14px] !text-black/70 hover:!bg-white"
              >
                <img src={rocketSvg} alt="" aria-hidden="true" className="header-cta__icon" />
                www.red-id.com
              </a>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-t-none rounded-b-[40px] bg-white px-10 pt-10 pb-10 max-[700px]:rounded-t-none max-[700px]:rounded-b-[24px] max-[700px]:px-4 max-[700px]:pt-8 max-[700px]:pb-6">
          <section ref={dsTabsetRef} className="mt-4 flex w-full flex-col items-center gap-6">
            <p className="text-center text-[14px] leading-[1.4] font-medium text-black/70">
              Selected case studies
            </p>
            <div className="grid w-full max-w-[390px] grid-cols-3 gap-0.5 rounded-[80px]">
              {dsTabs.map((tab) => {
                const isCurrent = activeDsTab === tab.key
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveDsTab(tab.key)}
                    className={`group relative flex h-20 flex-col items-center justify-center overflow-hidden rounded-[4px] px-2 py-1 transition-colors duration-200 ${
                      isCurrent ? 'cursor-default bg-[#036EDC]' : 'cursor-pointer bg-black/5'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`flex flex-col items-center transition-all duration-200 ${
                          isCurrent ? 'gap-[6px] translate-y-0' : 'gap-0 translate-y-0 group-hover:gap-[6px] group-hover:translate-y-0'
                        }`}
                      >
                        <div className="flex h-8 items-center justify-center">
                          <img
                            src={tab.logo}
                            alt={tab.label}
                            className={`${tab.logoClassName} ${isCurrent ? 'brightness-0 invert' : ''}`}
                          />
                        </div>
                        <span
                          className={`overflow-hidden text-[14px] leading-none font-medium transition-all duration-200 ${
                            isCurrent
                              ? 'max-h-[14px] translate-y-0 opacity-100 text-white/90'
                              : 'max-h-0 translate-y-2 opacity-0 text-black/70 group-hover:max-h-[14px] group-hover:translate-y-0 group-hover:opacity-100'
                          }`}
                        >
                          {tab.label}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="mt-7 overflow-hidden rounded-[16px] border border-black/20 max-[700px]:rounded-[12px]">
            <div className="grid grid-cols-1 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="p-6 min-[980px]:p-8">
                <h2 className="font-roboto-slab text-[36px] leading-[1.1] font-semibold text-black/90">
                  {activeDsCaseStudy.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[1.4] text-black/70">{activeDsCaseStudy.year}</p>
              </div>
              <div className="border-t border-black/20 p-6 pt-0 text-[16px] leading-[1.4] text-black/70 max-[979px]:border-t-0 min-[980px]:border-t-0 min-[980px]:border-l min-[980px]:p-8">
                <p>{activeDsCaseStudy.description}</p>
              </div>
            </div>
            <div className="border-t border-black/20 bg-black/5 p-6 min-[980px]:p-8">
              <div className="flex flex-col items-center gap-6 min-[980px]:gap-8">
                {(activeDsCaseStudy.images ?? [activeDsCaseStudy.image]).map((imageSrc, index) => (
                  <img
                    key={`${activeDsCaseStudy.title}-${index + 1}`}
                    src={imageSrc}
                    alt={`${activeDsCaseStudy.imageAlt} ${index + 1}`}
                    className="mx-auto block h-auto w-full rounded-[8px] object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 flex w-full justify-center">
            <button
              type="button"
              onClick={goToNextDsTab}
              className="ds-next-cta header-cta--case-studies header-top-cta inline-flex"
            >
              <img src={arrowRightIcon} alt="" aria-hidden="true" className="header-cta__icon" />
              {nextDsTab?.label ?? ''}
            </button>
          </div>

          <div className="mt-10 flex w-full justify-center">
            <img
              src={dsBookImage}
              alt="Sprint book visual"
              className="block h-auto w-full max-w-[336px]"
              loading="lazy"
            />
          </div>

        </section>

        <div className="mt-8 mb-4">
          <CaseStudyFooter variant="case-study" />
        </div>
      </div>
    </main>
  )
}

function SponsorshipsCaseStudyPage({ onBack }) {
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const idleHideTimerRef = useRef(null)
  const copyFeedbackTimerRef = useRef(null)
  const [showFloatingHome, setShowFloatingHome] = useState(false)
  const [isTopHomeInView, setIsTopHomeInView] = useState(true)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches,
  )
  const [showPrototypeCopied, setShowPrototypeCopied] = useState(false)

  const pricingPrototypeUrl =
    'https://embed.figma.com/proto/sALpRqwxhV0Y4Da15q0DHR/Pricing-Card_prototype?node-id=1-21789&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A21789&embed-host=share&hide-ui=1'

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(
    () => () => {
      if (copyFeedbackTimerRef.current != null) {
        window.clearTimeout(copyFeedbackTimerRef.current)
      }
    },
    [],
  )

  const handleCopyPrototypeLink = async () => {
    if (!isMobile) return
    try {
      await navigator.clipboard.writeText(pricingPrototypeUrl)
      setShowPrototypeCopied(true)
      if (copyFeedbackTimerRef.current != null) {
        window.clearTimeout(copyFeedbackTimerRef.current)
      }
      copyFeedbackTimerRef.current = window.setTimeout(() => {
        setShowPrototypeCopied(false)
        copyFeedbackTimerRef.current = null
      }, 3000)
    } catch {
      // no-op when clipboard is unavailable
    }
  }

  useEffect(() => {
    const topButton = topHomeButtonRef.current
    if (!topButton) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopHomeInView(entry.isIntersecting)
      },
      { root: null, threshold: 0 }
    )
    observer.observe(topButton)

    const clearIdleHideTimer = () => {
      if (!idleHideTimerRef.current) return
      window.clearTimeout(idleHideTimerRef.current)
      idleHideTimerRef.current = null
    }

    const scheduleIdleHide = () => {
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      const isScrollingUp = currentScrollY < lastScrollYRef.current
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingUp) {
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  return (
    <main
      className="min-h-screen bg-[#1F00CC] px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#1F00CC' }}
    >
      <div className="mx-auto w-full max-w-[1128px]">
        <header className="mb-8 flex items-center justify-start">
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
          className={`case-study-floater case-study-floater--sponsorships ${
            showFloatingHome ? 'case-study-floater--visible' : ''
          }`}
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
            <span className="case-study-floater__label">Sponsorships</span>
          </button>
        </div>

        <section className="overflow-hidden rounded-t-[40px] rounded-b-none bg-[#F2F2F2] p-10 max-[700px]:rounded-t-[32px] max-[700px]:rounded-b-none max-[700px]:px-4 max-[700px]:py-6">
          <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col gap-10">
              <div className="flex flex-col gap-4">
                <p className="font-roboto-slab max-w-[504px] text-[48px] leading-[1.15] font-semibold text-black/90">
                  Creators Sponsorships
                </p>
                <p className="text-[16px] leading-[1.4] font-medium text-black/50">StreamElements, 2025</p>
              </div>

              <SponsorshipStatsRow />
            </div>

            <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black/70">
              <p>
                The <strong className="font-bold text-black/70">StreamElements</strong> Sponsorship program is
                built on a ‘creators first’ approach - our tools are free, and we only earn when our
                creators do. The program bridges the gap between brands and creators looking for a
                reliable way to earn from their streams.
              </p>
              <p>
                As the team’s design lead, my focus is on translating that partnership into an interface
                that actually respects a creator&apos;s time and effort.
              </p>
              <div>
                <p>We designed the experience to quickly and clearly answer three main questions for every creator:</p>
                <ul className="mt-4 list-disc pl-7 text-[16px]">
                  <li className="font-semibold text-black/80">Is there a brand fit for my community?</li>
                  <li className="font-semibold text-black/80">What exactly do I need to do?</li>
                  <li className="font-semibold text-black/80">How much will I be paid?</li>
                </ul>
              </div>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black/70">Design guidelines</p>
                <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                  {['Clarity', 'Ease', 'Simplicity', 'Flexibility'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] bg-[#D3CCF8] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black/70">Design libraries</p>
                <div className="flex max-w-[620px] flex-wrap justify-start gap-2 max-[700px]:max-w-none">
                  {['Internal, based on Material ui', 'Material design icons'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] bg-[#D3CCF8] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-t-none rounded-b-[40px] bg-white p-10 max-[700px]:rounded-b-[24px] max-[700px]:px-4 max-[700px]:py-6">
          <div className="overflow-hidden rounded-[20px] bg-[#111319] p-6 text-white max-[700px]:rounded-[16px] max-[700px]:p-4">
            <div className="hidden grid-cols-1 gap-6 min-[1080px]:grid min-[1080px]:grid-cols-3">
              <div className="flex flex-col gap-4 rounded-[16px] bg-[#111319] p-2 max-[700px]:p-0">
                <h3 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold text-white/90">
                  The offer wall
                </h3>
                <p className="text-[20px] leading-[1.4] font-semibold italic text-white/90">
                  Moving from ‘Push’ to ‘Pull’
                </p>
                <p className="w-full text-[16px] leading-[1.4] text-white/70">
                  We moved away from single offer invites to a full gallery. Now, eligible creators can
                  browse multiple campaigns and quickly pick what works best for them.
                </p>
              </div>

              {sponsorshipOfferCards.map((card) => (
                <article key={card.key} className="overflow-hidden rounded-[16px] bg-[#17191f]">
                  <img src={card.image} alt={`${card.title} sponsorship card`} className="block h-auto w-full" />
                </article>
              ))}
            </div>

            <div className="min-[1080px]:hidden">
              <div className="mb-6 flex flex-col gap-4 rounded-[16px] bg-[#111319] p-2 max-[700px]:p-0">
                <h3 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold text-white/90">
                  The offer wall
                </h3>
                <p className="text-[20px] leading-[1.4] font-semibold italic text-white/90">
                  Moving from ‘Push’ to ‘Pull’
                </p>
                <p className="w-full text-[16px] leading-[1.4] text-white/70">
                  We moved away from single offer invites to a full gallery. Now, eligible creators can
                  browse multiple campaigns and quickly pick what works best for them.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sponsorshipOfferCards.slice(0, 4).map((card) => (
                  <article key={card.key} className="overflow-hidden rounded-[16px] bg-[#17191f]">
                    <img src={card.image} alt={`${card.title} sponsorship card`} className="block h-auto w-full" />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <SponsorshipCampaignCardSection />

          <section className="mt-8 flex w-full flex-col gap-4 rounded-[16px] bg-black/[0.05] p-6 max-[700px]:rounded-[12px] max-[700px]:p-4">
            <div className="flex w-full flex-col gap-2 text-black/90">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold">The offer</h2>
              <p className="text-[20px] leading-[1.4] font-semibold italic">Designing for the "Skimmer"</p>
              <p className="max-w-[1048px] text-[16px] leading-[1.4] text-black/70">
                To respect the creator&apos;s time, we restructured the offer page into three easy-to-digest
                sections: <strong className="font-semibold text-black/80">The Game</strong>,{' '}
                <strong className="font-semibold text-black/80">The Gig</strong>, and{' '}
                <strong className="font-semibold text-black/80">The Gold</strong>. By simplifying the process
                and adding a real-time earnings calculator, we removed the guesswork, allowing creators
                to focus on the community fit rather than the fine print.
              </p>
            </div>

            <div className="overflow-hidden rounded-[12px] bg-[#111319] p-10 max-[700px]:p-4">
              <img
                src={sponsOfferMainContentImage}
                alt="Sponsorship offer details showing The Game, The Gig, and The Gold sections"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </section>

          <section className="mt-8 flex w-full flex-col gap-4 rounded-[16px] bg-black/[0.05] p-6 max-[700px]:rounded-[12px] max-[700px]:p-4">
            <div className="flex w-full flex-col items-center gap-2 text-center text-black/90">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold">Pricing card</h2>
              <p className="max-w-[760px] text-[16px] leading-[1.4] text-black/70">
                We built a modular pricing system that handles deep complexity across platforms and payout
                methods - ensuring the creator always gets a clear, consistent answer.
              </p>
            </div>

            <div className="mx-auto my-4 overflow-hidden rounded-[12px] bg-[#111319] p-10 max-[700px]:w-fit max-[700px]:max-w-full max-[700px]:p-4">
              <img
                src={sponsPricingCardImage}
                alt="Pricing card with guaranteed base, per-player payout, and join campaign action"
                className="mx-auto block h-auto w-full max-w-[360px]"
                loading="lazy"
              />
            </div>

            <div className="mt-1 border-t border-black/15">
              <div className="flex w-full items-center gap-4 border-b border-black/15 py-4 max-[700px]:flex-col max-[700px]:items-start">
                <p className="min-w-[180px] flex-1 text-[16px] font-semibold leading-[1.4] text-black/70">Platforms</p>
                <div className="ml-auto flex w-full max-w-[620px] flex-wrap justify-end gap-2 max-[700px]:ml-0 max-[700px]:max-w-none max-[700px]:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-[80px] border border-black/50 bg-white px-4 py-2">
                    <img src={twitchIcon} alt="" aria-hidden className="h-4 w-4" />
                    <span className="text-[14px] leading-[1.4] text-black/70">Twitch</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-[80px] border border-black/50 bg-white px-4 py-2">
                    <img src={youtubeIcon} alt="" aria-hidden className="h-4 w-4" />
                    <span className="text-[14px] leading-[1.4] text-black/70">YouTube</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-[80px] border border-black/50 bg-white px-4 py-2">
                    <img src={tiktokIcon} alt="" aria-hidden className="h-4 w-4" />
                    <span className="text-[14px] leading-[1.4] text-black/70">TikTok</span>
                  </span>
                </div>
              </div>

              <div className="flex w-full items-center gap-4 border-b border-black/15 py-4 max-[700px]:flex-col max-[700px]:items-start">
                <p className="min-w-[180px] flex-1 text-[16px] font-semibold leading-[1.4] text-black/70">
                  Pricing communication
                </p>
                <div className="ml-auto flex w-full max-w-[620px] flex-wrap justify-end gap-2 max-[700px]:ml-0 max-[700px]:max-w-none max-[700px]:justify-start">
                  {['Average', 'Max', 'Both'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-[50px] border border-black/50 bg-white px-4 py-[6px] text-[14px] leading-[1.4] text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center gap-4 border-b border-black/15 py-4 max-[700px]:flex-col max-[700px]:items-start">
                <p className="min-w-[180px] flex-1 text-[16px] font-semibold leading-[1.4] text-black/70">
                  Pricing methods
                </p>
                <div className="ml-auto flex w-full max-w-[620px] flex-wrap justify-end gap-2 max-[700px]:ml-0 max-[700px]:max-w-none max-[700px]:justify-start">
                  {['Base', 'Performance', 'CPM views', 'Fixed', 'Rev share'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-[50px] border border-black/50 bg-white px-4 py-[6px] text-[14px] leading-[1.4] text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex w-full items-center gap-4 border-b border-black/15 py-4 max-[700px]:flex-col max-[700px]:items-start">
                <p className="min-w-[180px] flex-1 text-[16px] font-semibold leading-[1.4] text-black/70">User types</p>
                <div className="ml-auto flex w-full max-w-[620px] flex-wrap justify-end gap-2 max-[700px]:ml-0 max-[700px]:max-w-none max-[700px]:justify-start">
                  {['Auto served', 'SE manually served', 'Has Agency'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-[50px] border border-black/50 bg-white px-4 py-[6px] text-[14px] leading-[1.4] text-black/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {isMobile ? (
              showPrototypeCopied ? (
                <div className="mx-auto mt-2 inline-flex h-12 box-border items-center justify-center gap-2 rounded-[999px] border border-[#14cc76] bg-white px-4 shadow-[0_0_0_4px_rgba(20,204,118,0.2)]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7.5"
                      stroke="#000000"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-poppins text-[14px] leading-none text-black">Link coppied</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCopyPrototypeLink}
                  className="spons-prototype-copy-cta header-cta--case-studies header-cta--ghost mx-auto mt-2 inline-flex h-12 box-border whitespace-nowrap !gap-1.5 !bg-transparent !pl-2 !pr-2 !text-[13px] !text-[#2B00FF]"
                >
                  <img
                    src={link2Icon}
                    alt=""
                    aria-hidden
                    className="header-cta__icon spons-prototype-copy-cta__icon"
                  />
                  Copy prototype link (desktop)
                </button>
              )
            ) : (
              <a
                href={pricingPrototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="header-cta--case-studies header-cta--ghost mx-auto mt-2 inline-flex !bg-black/5 hover:!bg-white"
              >
                <img src={figmaIcon} alt="" aria-hidden className="header-cta__icon" />
                View Figma prototype
              </a>
            )}
          </section>

          <section className="mt-8 flex w-full flex-col gap-4 text-black/90">
            <div className="flex w-full flex-col gap-2">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold">Tracking page</h2>
              <p className="text-[20px] leading-[1.4] font-semibold italic">Real-time Trust</p>
              <p className="max-w-[1048px] text-[16px] leading-[1.4] text-black/70">
                Trust is earned through transparency. We designed the tracking page to give creators an
                honest, real-time look at their campaign progress; by showing the exact stream duration
                and recorded events, we eliminate the &quot;black box&quot; feeling and ensure they feel
                confident in the data.
              </p>
            </div>

            <img
              src={sponsTrackingOverviewImage}
              alt="Sponsorship tracking page overview"
              className="block h-auto w-full rounded-[16px]"
              loading="lazy"
            />
          </section>

          <div className="mt-8 flex w-full justify-center">
            <img
              src={startCampaignImage}
              alt="Start campaign visual"
              className="block h-auto w-full max-w-[230px]"
              loading="lazy"
            />
          </div>

          <section className="mt-8 flex w-full flex-col gap-4 text-black/90">
            <div className="flex w-full flex-col gap-2">
              <h2 className="font-roboto-slab text-[36px] leading-[1.2] font-semibold">Beneath the surface</h2>
              <p className="max-w-[1048px] text-[16px] leading-[1.4] text-black/70">
                My first move upon joining the Sponsorship squad was to audit our components and
                libraries - refining variants, increasing accessibility, fixing gaps in mobile views, and
                <strong className="font-semibold text-black/80"> taking full ownership</strong> of every
                pixel. This foundation allowed us to keep our workflow fast and our interface predictable.
                👇
              </p>
            </div>

            <CaseStudyImageCarousel slides={sponsorshipBeneathSurfaceSlides} />
          </section>
        </section>

        <div className="mt-8">
          <CaseStudyFooter variant="case-study" />
        </div>
      </div>
    </main>
  )
}

function GrabTapCaseStudyPage({ onBack }) {
  const topHomeButtonRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const idleHideTimerRef = useRef(null)
  const kpiRowRef = useRef(null)
  const kpiItemRefs = useRef([])
  const [showFloatingHome, setShowFloatingHome] = useState(false)
  const [isTopHomeInView, setIsTopHomeInView] = useState(true)
  const [isRedeemOnNewLine, setIsRedeemOnNewLine] = useState(false)

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
      clearIdleHideTimer()
      idleHideTimerRef.current = window.setTimeout(() => {
        setShowFloatingHome(false)
      }, 5000)
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0
      const isScrollingUp = currentScrollY < lastScrollYRef.current
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      const isAtTop = currentScrollY <= 2
      const hasScrolledPastThreshold = currentScrollY >= 640

      if (isAtTop) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingDown) {
        setShowFloatingHome(false)
        clearIdleHideTimer()
      } else if (isScrollingUp) {
        setShowFloatingHome((prev) => {
          if (prev) return true
          return hasScrolledPastThreshold && !isTopHomeInView
        })
        scheduleIdleHide()
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      clearIdleHideTimer()
    }
  }, [isTopHomeInView])

  useEffect(() => {
    const rowEl = kpiRowRef.current
    if (!rowEl) return undefined

    const updateRedeemLineState = () => {
      const firstEl = kpiItemRefs.current[0]
      const redeemEl = kpiItemRefs.current[2]
      if (!firstEl || !redeemEl) return
      setIsRedeemOnNewLine(redeemEl.offsetTop > firstEl.offsetTop)
    }

    updateRedeemLineState()

    const observer = new ResizeObserver(updateRedeemLineState)
    observer.observe(rowEl)
    window.addEventListener('resize', updateRedeemLineState)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateRedeemLineState)
    }
  }, [])

  return (
    <main
      className="min-h-screen bg-black px-[56px] py-5 text-[#111111] max-[700px]:px-4"
      style={{ '--case-cta-hover-border': '#000000' }}
    >
      <div className="mx-auto w-full max-w-[1128px]">
        <header className="mb-8 flex items-center justify-start">
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
          className={`case-study-floater case-study-floater--graptap ${
            showFloatingHome ? 'case-study-floater--visible' : ''
          }`}
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
            <span className="case-study-floater__label">GrabTap</span>
          </button>
        </div>

        <section className="relative overflow-hidden rounded-t-[40px] rounded-b-none bg-[#D7FF00] px-10 pt-10 pb-0 max-[700px]:rounded-t-[32px] max-[700px]:rounded-b-none max-[700px]:px-4 max-[700px]:pt-6 max-[700px]:pb-0">
          <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="relative flex min-w-0 flex-col gap-10 min-[980px]:pb-[0px]">
              <div className="flex flex-col gap-4">
                <p className="font-roboto-slab text-[48px] leading-[1.4] font-semibold text-black">GrabTap</p>
                <p className="text-[16px] leading-[1.4] font-medium text-black">StreamElements, 2025</p>
              </div>

              <div ref={kpiRowRef} className="flex w-full max-w-[516px] flex-wrap items-center gap-x-3 gap-y-4">
                {[
                  { value: '496k', label: 'Players' },
                  { value: '330k', label: 'Games started' },
                  { value: '44k', label: 'Redeem requests' },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    ref={(el) => {
                      kpiItemRefs.current[index] = el
                    }}
                    className="flex items-center"
                  >
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className={`mr-3 h-[66px] w-px bg-black/70 ${index === 2 && isRedeemOnNewLine ? 'hidden' : ''}`}
                      />
                    ) : null}
                    <div className="flex w-[120px] flex-col items-center text-center leading-[1.4] text-black">
                      <p className="font-roboto-slab text-[32px] font-semibold leading-[1.4]">
                        <AnimatedStatValue value={stat.value} delay={index * 120} />
                      </p>
                      <p className="text-[12px] leading-[1.4]">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="flex min-w-0 flex-col gap-4 text-[18px] leading-[1.4] text-black min-[980px]:pb-10">
              <p>
                <strong className="font-bold">GrabTap</strong> is a "Play-to-Earn" platform that turns mobile
                gaming into rewards. It marked a strategic shift for <strong className="font-bold">StreamElements</strong>,
                directly engaging communities by offering gift cards in exchange for supporting their favorite creators.
              </p>
              <p>
                As the lead designer, I owned the end-to-end core experience - from user research and complex flow mapping
                to designing and building a scalable design system.
              </p>
              <p>
                I led the iterative design process, ensuring the interface remained intuitive and frictionless as the
                product rapidly expanded.
              </p>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black">Design guidelines</p>
                <div className="flex flex-wrap gap-2">
                  {['Mobile first', 'Community-Centric', 'Reliable'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] border border-[#686868] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-1 flex w-full flex-col gap-3">
                <p className="text-[12px] leading-[1.4] text-black">Design libraries</p>
                <div className="flex flex-wrap gap-2">
                  {['Internal, based on shadcn/ui', 'Lucide icons'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[50px] border border-[#686868] px-4 py-[6px] text-[16px] leading-[1.4] font-medium text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://www.grabtap.com"
                target="_blank"
                rel="noreferrer"
                className="graptap-link-cta header-cta--case-studies header-cta--ghost mt-1 inline-flex h-12 w-fit !bg-transparent !px-4 !py-3 !text-[14px] !text-black/70 hover:!bg-white focus-visible:!bg-white"
              >
                <img src={graptapLinkIcon} alt="" aria-hidden="true" className="header-cta__icon" />
                www.grabtap.com
              </a>
            </div>
          </div>

          <img
            src={gtCharacterImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none mx-auto mt-6 block h-auto w-full max-w-[298px] object-contain min-[980px]:absolute min-[980px]:bottom-0 min-[980px]:left-1/4 min-[980px]:mt-0 min-[980px]:-translate-x-1/2"
            loading="lazy"
          />
        </section>

        <section className="rounded-t-none rounded-b-[40px] bg-white p-10 max-[700px]:rounded-b-[24px] max-[700px]:px-4 max-[700px]:py-6">
          <div className="flex flex-col gap-8 max-[700px]:gap-6">
            {grabTapCaseScreens.map((screen) => (
              screen.key === 'gt-logo' || screen.key === 'gt-1' ? (
                <section key={screen.key} className="flex flex-col items-center">
                  {screen.key === 'gt-1' ? (
                    <picture className="block w-full">
                      <source media="(max-width: 699px)" srcSet={gt1MobileImage} />
                      <img
                        src={screen.image}
                        alt={`GrabTap ${screen.title}`}
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </picture>
                  ) : (
                    <img
                      src={screen.image}
                      alt={`GrabTap ${screen.title}`}
                      className="block h-auto w-full max-w-[240px]"
                      loading="lazy"
                    />
                  )}
                  {screen.key === 'gt-1' ? (
                    <p className="mt-[56px] mb-0 text-[14px] leading-[1.4] font-medium text-black/70">
                      Selected screens
                    </p>
                  ) : null}
                </section>
              ) : screen.key === 'gt-2' ? (
                <section
                  key={screen.key}
                  className="rounded-[16px] bg-[#F2F2F2] p-10 max-[700px]:p-4"
                >
                  <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[375px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-4 leading-[1.4] text-black">
                      <p className="font-roboto-slab text-[36px] font-semibold text-black/90">Games page</p>
                      <div className="flex flex-col gap-2 text-[16px] text-black/70">
                        <p>
                          Once onboarding is complete, users arrive here. We designed this page to make starting
                          a game effortless - literally one click away.
                        </p>
                        <p>
                          It serves as the primary hub where users can discover eligible games, access their
                          supported communities, or explore new ones to join.
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto w-full max-w-[375px] min-[980px]:mr-0 min-[980px]:ml-auto">
                      <img
                        src={screen.image}
                        alt="GrabTap games page mobile screen"
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>
              ) : screen.key === 'gt-3' ? (
                <section
                  key={screen.key}
                  className="rounded-[16px] bg-[#F2F2F2] p-10 max-[700px]:p-4"
                >
                  <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[375px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-4 leading-[1.4] text-black">
                      <p className="font-roboto-slab text-[36px] font-semibold text-black/90">Offer page</p>
                      <div className="flex flex-col gap-4 text-[16px] text-black/70">
                        <p>
                          Designed to eliminate friction and ensure a "game-fit," this page provides
                          transparency before users commit:
                        </p>
                        <ul className="list-disc pl-7">
                          <li>
                            <strong className="font-bold text-black/80">Community:</strong> Highlights supported
                            creators to foster belonging.
                          </li>
                          <li>
                            <strong className="font-bold text-black/80">Gameplay:</strong> Uses autoplay video for
                            instant game understanding.
                          </li>
                          <li>
                            <strong className="font-bold text-black/80">Value:</strong> Shows "effort vs. potential
                            earn" for informed decisions.
                          </li>
                        </ul>
                        <p>
                          We also introduced progressive bonuses for daily play and in-game spending to drive
                          long term retention.
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto w-full max-w-[553px] min-[980px]:mr-0 min-[980px]:ml-auto">
                      <img
                        src={screen.image}
                        alt="GrabTap offer page mobile screen"
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>
              ) : screen.key === 'gt-4' ? (
                <section
                  key={screen.key}
                  className="rounded-[16px] bg-[#F2F2F2] p-10 max-[700px]:p-4"
                >
                  <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[375px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-4 leading-[1.4] text-black">
                      <p className="font-roboto-slab text-[36px] font-semibold text-black/90">Community page</p>
                      <div className="flex flex-col gap-2 text-[16px] text-black/70">
                        <p>
                          By highlighting collective stats offering community competitions, and leaderboards,
                          we invite users to contribute.
                        </p>
                        <p>
                          Games that support the community can be started instantly, while a clear CTA
                          provides a frictionless path for new visitors to join.
                        </p>
                      </div>
                    </div>

                    <div className="mx-auto w-full max-w-[375px] min-[980px]:mr-0 min-[980px]:ml-auto">
                      <img
                        src={screen.image}
                        alt="GrabTap community page mobile screen"
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>
              ) : screen.key === 'gt-5' ? (
                <section
                  key={screen.key}
                  className="rounded-[16px] bg-[#F2F2F2] p-10 max-[700px]:p-4"
                >
                  <div className="grid grid-cols-1 items-start gap-10 min-[980px]:grid-cols-[375px_minmax(0,1fr)]">
                    <div className="flex flex-col gap-3 leading-[1.4] text-black">
                      <p className="font-roboto-slab text-[56px] font-semibold leading-[1.1] text-black/90">Missions</p>
                      <p className="text-[16px] text-black/70">
                        Missions are the core of every offer. We designed various mission types to drive retention,
                        motivating players to progress and maximize their earnings.
                      </p>
                      <p className="text-[16px] text-black/70">
                        To keep the experience predictable, we maintained a consistent for:
                      </p>
                      <ul className="list-disc pl-7 text-[40px] text-black/70">
                        <li className="text-[16px]">
                          <strong className="font-bold text-black/80">Points:</strong> Standardized display of rewards.
                        </li>
                        <li className="text-[16px]">
                          <strong className="font-bold text-black/80">Social proof:</strong> Completion counts to build trust.
                        </li>
                        <li className="text-[16px]">
                          <strong className="font-bold text-black/80">Details:</strong> Uniform info for quick scannability.
                        </li>
                      </ul>
                    </div>

                    <div className="mx-auto w-full max-w-[595px] min-[980px]:mr-0 min-[980px]:ml-auto">
                      <img
                        src={screen.image}
                        alt="GrabTap missions screen list"
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>
              ) : (
                <section key={screen.key} className="boss-case-content-section">
                  <div className="mb-4 flex flex-col gap-2">
                    <p className="text-[16px] leading-[1.4] font-medium text-black/90">{screen.title}</p>
                  </div>
                  <div className="boss-case-image-shell">
                    <img
                      src={screen.image}
                      alt={`GrabTap ${screen.title}`}
                      className="boss-case-image block h-auto w-full"
                      loading="lazy"
                    />
                  </div>
                </section>
              )
            ))}
          </div>
        </section>

        <div className="mt-8">
          <CaseStudyFooter variant="case-study" />
        </div>
      </div>
    </main>
  )
}

function SponsorshipStatsRow() {
  const [firstStat, secondStat] = sponsorshipStats

  return (
    <div className="flex flex-wrap items-start gap-y-3">
      <div className="shrink-0 pr-3 text-left">
        <p className="font-roboto-slab text-[42px] leading-[1.05] font-semibold text-black">
          <AnimatedStatValue value={firstStat.value} delay={0} />
        </p>
        <p className="mt-1 text-[12px] leading-[1.4] text-black/90">{firstStat.label}</p>
      </div>

      <span aria-hidden="true" className="h-[66px] self-center border-l border-black/15" />

      <div className="shrink-0 pl-3 text-left">
        <p className="font-roboto-slab text-[42px] leading-[1.05] font-semibold text-black">
          <AnimatedStatValue value={secondStat.value} delay={120} />
        </p>
        <p className="mt-1 text-[12px] leading-[1.4] text-black/90">{secondStat.label}</p>
      </div>
    </div>
  )
}

function SponsorshipCampaignCardSection() {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches
  )
  const hypeVideoRef = useRef(null)
  const holdTimerRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const clearHoldTimer = () => {
    if (holdTimerRef.current != null) {
      window.clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (holdTimerRef.current != null) {
        window.clearTimeout(holdTimerRef.current)
        holdTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const video = hypeVideoRef.current
    if (!video) return undefined

    if (!hovered) {
      video.pause()
      try {
        video.currentTime = 0
      } catch {
        // ignore seek errors before metadata loads
      }
      return undefined
    }

    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }

    return undefined
  }, [hovered])

  const handleCardPointerEnter = () => {
    if (!isMobile) setHovered(true)
  }

  const handleCardPointerLeave = () => {
    if (!isMobile) setHovered(false)
  }

  const handleHoldPointerDown = () => {
    clearHoldTimer()
    holdTimerRef.current = window.setTimeout(() => {
      holdTimerRef.current = null
      setHovered(true)
    }, 220)
  }

  const handleHoldPointerEnd = () => {
    clearHoldTimer()
    setHovered(false)
  }

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-8 rounded-[16px] bg-black/[0.05] px-6 py-10 max-[700px]:px-4 max-[700px]:py-8">
      <div className="flex w-full max-w-[1048px] flex-col items-center gap-4 text-center leading-[1.4] text-black/90">
        <h2 className="font-roboto-slab w-full text-[36px] font-semibold">Campaign card</h2>
        <p className="w-full text-[16px] font-normal">
          Optimized for scannability, focused on fit and trust.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <div className="mx-auto w-fit rounded-[16px] bg-[#121213] p-[24px] max-[700px]:rounded-none max-[700px]:bg-transparent max-[700px]:p-0">
          <div
            className={`w-full max-w-[324px] overflow-hidden rounded-[16px] p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] touch-manipulation ${
              hovered
                ? 'bg-[#232428] shadow-[4px_4px_16px_0_rgba(0,0,0,0.4)]'
                : 'bg-[#131315] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
            } ${hovered ? '-translate-y-2' : 'translate-y-0'}`}
            onPointerEnter={handleCardPointerEnter}
            onPointerLeave={handleCardPointerLeave}
          >
          <div className="flex flex-col gap-3">
            <div className="relative h-[164px] w-full overflow-hidden rounded-[4px] bg-black">
                <div
                  className={`absolute inset-0 z-0 origin-center transition-transform duration-300 ease-out ${
                    hovered ? 'scale-[1.2]' : 'scale-100'
                  }`}
                >
                  <img
                    src={sponsCampaignCardRoyalMatchIdle}
                    alt="Royal Match campaign artwork"
                    className="block h-full w-full object-cover"
                    draggable={false}
                  />
                </div>

                <video
                  ref={hypeVideoRef}
                  className={`pointer-events-none absolute inset-y-0 left-0 z-[1] h-full w-[calc(100%+1px)] object-cover transition-opacity duration-300 ease-out ${
                    hovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  src="/SE_HYPE_ROYAL_MATCH_20s_v01.mp4"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  aria-hidden="true"
                />

                <div
                  className={`absolute inset-x-0 bottom-0 z-10 flex h-[63px] items-end justify-center overflow-hidden bg-gradient-to-b from-transparent to-transparent px-1 pb-3 pt-7 transition-transform duration-300 ease-out ${
                    hovered ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  <div className="rounded-[4px] bg-black/50 px-2 py-1">
                    <p className="text-center font-nunito-sans text-[12px] font-bold leading-[1.5] tracking-[0.5px] text-[rgba(255,255,255,0.7)]">
                      345 creators grabbed this campaign
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute left-1 top-1 z-10 flex items-center gap-1 rounded-[2px] bg-black/70 py-[3px] pl-1 pr-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="shrink-0 text-[#00F29B]"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2l2.9 6.8L22 9.7l-5.5 4.7 1.7 7.2L12 18.8 5.8 21.6l1.7-7.2L2 9.7l7.1-.9L12 2z"
                    />
                  </svg>
                  <span className="font-nunito-sans text-[12px] font-bold leading-[1.5] tracking-[0.5px] text-[#00F29B]">
                    New
                  </span>
                </div>
              </div>

              <div className="font-nunito-sans">
                <div className="flex flex-col gap-2">
                  <p className="pb-1 text-[16px] font-bold leading-[1.5] tracking-[0.1px] text-[rgba(255,255,255,0.87)]">
                    Royal Match
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-1">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-[20px] border border-solid border-white/50 px-2 py-1">
                        <span className="text-[12px] font-bold leading-[1.5] tracking-[0.5px] text-[rgba(255,255,255,0.87)]">
                          Puzzle
                        </span>
                      </span>
                      <span className="inline-flex items-center rounded-[20px] border border-solid border-white/50 px-2 py-1">
                        <span className="text-[12px] font-bold leading-[1.5] tracking-[0.5px] text-[rgba(255,255,255,0.87)]">
                          3 Match
                        </span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-[6px] rounded-[24px] bg-[#282829] px-2 py-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="shrink-0 text-[rgba(255,255,255,0.87)]"
                      >
                        <path
                          fill="currentColor"
                          d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zm-4 18a1 1 0 111.001-2A1 1 0 0112 20zm4-4H8V6h8v10z"
                        />
                      </svg>
                      <span className="text-[12px] font-bold leading-[1.5] tracking-[0.5px] text-[rgba(255,255,255,0.87)]">
                        Mobile Only
                      </span>
                    </span>
                  </div>

                  <p className="text-[14px] font-bold leading-[1.5] tracking-[0.25px] text-[rgba(255,255,255,0.87)]">
                    $800 Max payout
                  </p>

                  <p className="text-[14px] font-normal leading-[1.5] tracking-[0.25px] text-[#f98215]">
                    Last spots left
                  </p>
                </div>
            </div>
          </div>
          </div>
        </div>

        {isMobile ? (
          <div className="flex w-full max-w-[324px] flex-col items-center gap-2">
            <button
              type="button"
              className="header-cta--case-studies inline-flex touch-manipulation select-none [-webkit-touch-callout:none] !border-[#2b00ff] !bg-white !px-4 !py-3 !text-black shadow-[0_0_0_4px_rgb(43_0_255_/_20%)]"
              aria-label="Hold to simulate desktop hover"
              onPointerDown={handleHoldPointerDown}
              onPointerUp={handleHoldPointerEnd}
              onPointerCancel={handleHoldPointerEnd}
              onPointerLeave={handleHoldPointerEnd}
            >
              <img
                src={pointerSvg}
                alt=""
                aria-hidden
                className="header-cta__icon !h-[26px] !w-[26px] !opacity-100"
              />
              <span>Hold here</span>
            </button>
            <p className="text-center text-[14px] italic leading-[1.4] text-black/90">
              to simulate desktop hover
            </p>
          </div>
        ) : (
          <p className="text-center text-[14px] font-semibold italic leading-[1.4] text-black/90">
            👆 Hover card for details
          </p>
        )}
      </div>
    </div>
  )
}

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
          <p className="font-roboto-slab text-[32px] leading-[1.4] font-semibold">
            <AnimatedStatValue value={stat.value} delay={index * 80} />
          </p>
          <p className="text-[12px] leading-[1.4]">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

const RED_POPUP_TRANSITION_MS = 240
const RED_POPUP_DESKTOP_CLOSE_TOP = 72
const RED_POPUP_CLOSE_DELAY_MS = 80

function RedPopupModal({ open, onClose, onOpenDesignSprints }) {
  const [shapeOffset, setShapeOffset] = useState({ x: 0, y: 0 })
  const [entered, setEntered] = useState(false)
  const [closeEntered, setCloseEntered] = useState(false)
  const [mounted, setMounted] = useState(open)
  const overlayRef = useRef(null)
  const cardRef = useRef(null)
  const [desktopClosePosition, setDesktopClosePosition] = useState({
    top: RED_POPUP_DESKTOP_CLOSE_TOP,
    left: 0,
  })

  useLayoutEffect(() => {
    /* DOM overlay enter/exit: reset `entered` before paint (reopen animation + closing transition). */
    /* eslint-disable react-hooks/set-state-in-effect */
    if (open) {
      setMounted(true)
      setEntered(false)
      setCloseEntered(false)
    } else if (mounted) {
      setEntered(false)
      setCloseEntered(false)
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
    if (!open || !mounted || !entered) return undefined

    const timerId = window.setTimeout(() => setCloseEntered(true), RED_POPUP_CLOSE_DELAY_MS)
    return () => window.clearTimeout(timerId)
  }, [open, mounted, entered])

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

  useEffect(() => {
    if (!mounted || !open) return undefined

    const updateDesktopClosePosition = () => {
      if (window.innerWidth <= 700) return
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      setDesktopClosePosition({ top: RED_POPUP_DESKTOP_CLOSE_TOP, left: rect.right })
    }

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(updateDesktopClosePosition)
    })
    window.addEventListener('resize', updateDesktopClosePosition)
    window.visualViewport?.addEventListener('resize', updateDesktopClosePosition)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updateDesktopClosePosition)
      window.visualViewport?.removeEventListener('resize', updateDesktopClosePosition)
    }
  }, [mounted, open])

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
      ref={overlayRef}
      className="red-popup__overlay fixed inset-0 z-[120] overflow-y-auto px-[56px] py-4 max-[700px]:px-4"
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
        className="red-popup__dialog pointer-events-none relative z-10 mx-auto flex min-h-full w-full max-w-[1200px] flex-col items-center justify-start pt-14 pb-14"
        role="dialog"
        aria-modal="true"
        aria-label="About RED"
      >
        <div
          className={`red-popup__enter pointer-events-auto relative flex w-full flex-col items-center gap-[32px] ${
            open
              ? `transition-transform duration-[240ms] ease-out ${entered ? 'translate-y-0' : 'translate-y-[100px]'}`
              : ''
          }`}
          onClick={(event) => event.stopPropagation()}
        >
        {open && (
          <>
          <div className="relative w-full">
          <div ref={cardRef} className="red-popup__card relative w-full overflow-hidden rounded-[40px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div
            className="red-popup__card-content relative grid grid-cols-1 gap-[40px] overflow-hidden p-10 min-[893px]:grid-cols-2 max-[480px]:p-6"
            onMouseMove={handleHeadMouseMove}
            onMouseLeave={handleHeadMouseLeave}
          >
            <div className="relative">
              <p className="font-roboto-slab text-[48px] leading-[1.4] font-semibold text-black/90">RED</p>
              <RedStatsRow />
              <div
                className="red-popup__shape-layer pointer-events-none absolute -left-[314px] top-[501px] flex h-[674px] w-[680px] items-center justify-center transition-transform duration-150 ease-out max-[892px]:hidden"
                style={{ transform: `translate3d(${shapeOffset.x}px, ${shapeOffset.y}px, 0)` }}
                aria-hidden="true"
              >
                <div className="red-popup__shape-enter">
                  <img
                    src={wowShapeSvg}
                    alt=""
                    aria-hidden="true"
                    className="h-[401px] w-[556px] opacity-95 max-[892px]:h-[220px] max-[892px]:w-[300px]"
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
                mentored them on the{' '}
                <button
                  type="button"
                  className="intro__red-action"
                  onClick={onOpenDesignSprints}
                >
                  prototyping phase
                </button>{' '}
                - sharing
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
                        className="h-full w-full rounded-full object-cover"
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
                      <img src={luluAvatar} alt="Lulu" className="h-full w-full rounded-full object-cover" />
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
          <div
            className="pointer-events-none absolute -right-[54px] -bottom-[56px] z-[2] flex h-[220px] w-[292px] items-end justify-end max-[700px]:hidden min-[893px]:hidden"
            aria-hidden="true"
          >
            <img src={wowShapeSvg} alt="" className="red-popup__wow-mobile h-[200px] w-[272px] opacity-95" />
          </div>
          </div>
          </div>

          </>
        )}
        </div>
        {open && (
          <button
            type="button"
            onClick={onClose}
            className={`red-popup__corner-close pointer-events-auto ${
              closeEntered ? 'red-popup__corner-close--entered' : ''
            }`}
            style={
              typeof window !== 'undefined' && window.innerWidth > 700
                ? { top: `${desktopClosePosition.top}px`, left: `${desktopClosePosition.left}px`, right: 'auto' }
                : undefined
            }
            aria-label="Close"
          >
            <span aria-hidden="true" className="red-popup__corner-close-icon">✕</span>
          </button>
        )}
      </div>
    </div>
  )
}

function TooltipWord({ children, imageSrc, label, imageMaxWidth = null }) {
  const TOOLTIP_OPEN_DELAY_MS = 240
  const tooltipId = useId()
  const anchorRef = useRef(null)
  const bubbleRef = useRef(null)
  const openTimerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [shiftX, setShiftX] = useState(0)
  const [placement, setPlacement] = useState('top')

  const canHover = useCallback(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(hover: hover)').matches
  }, [])

  const shouldUseTapToggle = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: none), (pointer: coarse)').matches
  }, [])

  const updatePosition = useCallback(() => {
    if (!bubbleRef.current || !anchorRef.current) return

    const bubbleRect = bubbleRef.current.getBoundingClientRect()
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const viewportPadding = 8
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const spaceAbove = anchorRect.top - viewportPadding
    const nextPlacement = spaceAbove < bubbleRect.height + 24 ? 'bottom' : 'top'

    const rawLeft = anchorRect.left + anchorRect.width / 2 - bubbleRect.width / 2
    const minLeft = viewportPadding
    const maxLeft = Math.max(minLeft, viewportWidth - viewportPadding - bubbleRect.width)
    const clampedLeft = Math.min(Math.max(rawLeft, minLeft), maxLeft)
    const nextShiftX = clampedLeft - rawLeft

    setShiftX(nextShiftX)
    setPlacement(nextPlacement)
  }, [])

  const openTooltip = useCallback(() => {
    if (!canHover() || shouldUseTapToggle()) return
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current)
    openTimerRef.current = window.setTimeout(() => {
      setIsOpen(true)
      requestAnimationFrame(updatePosition)
      openTimerRef.current = null
    }, TOOLTIP_OPEN_DELAY_MS)
  }, [canHover, shouldUseTapToggle, updatePosition])

  const closeTooltip = useCallback(() => {
    if (!canHover() || shouldUseTapToggle()) return
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    setIsOpen(false)
    setShiftX(0)
    setPlacement('top')
  }, [canHover, shouldUseTapToggle])

  const resetTooltip = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
    setIsOpen(false)
    setShiftX(0)
    setPlacement('top')
  }, [])

  const toggleTooltipOnMobile = useCallback(
    (event) => {
      if (!shouldUseTapToggle()) return
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
        }
        return next
      })
    },
    [shouldUseTapToggle, tooltipId, updatePosition],
  )

  useEffect(() => {
    if (!isOpen || canHover()) return undefined

    const closeOnPointerDown = (event) => {
      if (anchorRef.current?.contains(event.target)) return
      resetTooltip()
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') resetTooltip()
    }
    const updateOnViewportChange = () => requestAnimationFrame(updatePosition)
    const updateOnVisualViewportChange = () => requestAnimationFrame(updatePosition)

    document.addEventListener('pointerdown', closeOnPointerDown, true)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', updateOnViewportChange)
    window.addEventListener('scroll', updateOnViewportChange, { passive: true })
    window.visualViewport?.addEventListener('resize', updateOnVisualViewportChange)
    window.visualViewport?.addEventListener('scroll', updateOnVisualViewportChange)
    return () => {
      document.removeEventListener('pointerdown', closeOnPointerDown, true)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', updateOnViewportChange)
      window.removeEventListener('scroll', updateOnViewportChange)
      window.visualViewport?.removeEventListener('resize', updateOnVisualViewportChange)
      window.visualViewport?.removeEventListener('scroll', updateOnVisualViewportChange)
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

  useEffect(
    () => () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current)
    },
    [],
  )

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
      onPointerUp={toggleTooltipOnMobile}
    >
      {children}
      <span ref={bubbleRef} className="beyond-tooltip-bubble" aria-hidden="true">
        {label ? (
          <span className="beyond-tooltip-label">{label}</span>
        ) : (
          <img
            src={imageSrc}
            alt=""
            className="beyond-tooltip-image"
            onLoad={() => requestAnimationFrame(updatePosition)}
            style={
              imageMaxWidth
                ? { maxWidth: `min(${imageMaxWidth}px, calc(100vw - 24px))` }
                : undefined
            }
          />
        )}
      </span>
    </span>
  )
}

function App() {
  const streamElementsCards = projectCards.filter((project) => project.section === 'stream-elements')
  const redCards = projectCards.filter((project) => project.section === 'red')
  const [isRedModalOpen, setIsRedModalOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(() =>
    typeof window === 'undefined' ? null : getCaseStudyFromPathname(window.location.pathname),
  )
  const [supportsHover, setSupportsHover] = useState(true)
  const [isIntroExpanded, setIsIntroExpanded] = useState(false)
  const [isIntroTopLayout, setIsIntroTopLayout] = useState(false)
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [introMoreContentHeight, setIntroMoreContentHeight] = useState(0)
  const introMoreContentRef = useRef(null)
  const [activeCaseIndexes, setActiveCaseIndexes] = useState([0])
  const caseItemRefs = useRef([])
  const caseTouchRef = useRef({ x: 0, y: 0, moved: false })
  const suppressCaseClickUntilRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(hover: hover)')
    const updateSupportsHover = () => setSupportsHover(mediaQuery.matches)

    updateSupportsHover()
    mediaQuery.addEventListener('change', updateSupportsHover)
    return () => mediaQuery.removeEventListener('change', updateSupportsHover)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const introTopQuery = window.matchMedia('(max-width: 968px)')
    const mobileQuery = window.matchMedia('(max-width: 700px)')
    const updateLayoutModes = () => {
      setIsIntroTopLayout(introTopQuery.matches)
      setIsMobileLayout(mobileQuery.matches)
    }

    updateLayoutModes()
    introTopQuery.addEventListener('change', updateLayoutModes)
    mobileQuery.addEventListener('change', updateLayoutModes)
    return () => {
      introTopQuery.removeEventListener('change', updateLayoutModes)
      mobileQuery.removeEventListener('change', updateLayoutModes)
    }
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

      if (closestIndex < 0) return

      const closestElement = caseItemRefs.current[closestIndex]
      if (!closestElement) return

      const closestTop = closestElement.getBoundingClientRect().top
      const sameRowIndexes = []

      caseItemRefs.current.forEach((element, index) => {
        if (!element) return
        const rowDistance = Math.abs(element.getBoundingClientRect().top - closestTop)
        if (rowDistance < 2) sameRowIndexes.push(index)
      })

      setActiveCaseIndexes((prev) => {
        const sortedNext = [...sameRowIndexes].sort((a, b) => a - b)
        const isSame =
          prev.length === sortedNext.length &&
          prev.every((value, idx) => value === sortedNext[idx])
        return isSame ? prev : sortedNext
      })
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

  useEffect(() => {
    if (!isIntroTopLayout) return undefined

    const updateIntroMoreHeight = () => {
      if (!introMoreContentRef.current) return
      setIntroMoreContentHeight(introMoreContentRef.current.scrollHeight)
    }

    updateIntroMoreHeight()
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => updateIntroMoreHeight())
        : null
    if (introMoreContentRef.current) resizeObserver?.observe(introMoreContentRef.current)
    window.addEventListener('resize', updateIntroMoreHeight)

    return () => {
      window.removeEventListener('resize', updateIntroMoreHeight)
      resizeObserver?.disconnect()
    }
  }, [isIntroTopLayout, isIntroExpanded])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const syncFromLocation = () => {
      setActiveCaseStudy(getCaseStudyFromPathname(window.location.pathname))
    }

    syncFromLocation()
    window.addEventListener('popstate', syncFromLocation)
    return () => window.removeEventListener('popstate', syncFromLocation)
  }, [])

  const goHome = () => {
    if (typeof window !== 'undefined' && normalizePathname(window.location.pathname) !== '/') {
      window.history.pushState({}, '', '/')
    }
    setActiveCaseStudy(null)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const openCaseStudy = (projectKey) => {
    const targetPath = CASE_STUDY_PATHS[projectKey]
    if (typeof window !== 'undefined' && targetPath && normalizePathname(window.location.pathname) !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
    setActiveCaseStudy(projectKey)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
  const handleCaseStudyTouchStart = (event) => {
    if (supportsHover) return
    const touch = event.touches?.[0]
    if (!touch) return
    caseTouchRef.current = { x: touch.clientX, y: touch.clientY, moved: false }
  }
  const handleCaseStudyTouchMove = (event) => {
    if (supportsHover) return
    const touch = event.touches?.[0]
    if (!touch) return
    const deltaX = Math.abs(touch.clientX - caseTouchRef.current.x)
    const deltaY = Math.abs(touch.clientY - caseTouchRef.current.y)
    if (deltaX > 8 || deltaY > 8) caseTouchRef.current.moved = true
  }
  const handleCaseStudyTouchEnd = (event, projectKey) => {
    if (!interactiveCaseStudyKeys.has(projectKey) || supportsHover) return
    suppressCaseClickUntilRef.current = Date.now() + 450
    if (caseTouchRef.current.moved) return
    event.preventDefault()
    openCaseStudy(projectKey)
  }
  const handleCaseStudyClick = (event, projectKey) => {
    if (!interactiveCaseStudyKeys.has(projectKey)) return
    if (!supportsHover && Date.now() < suppressCaseClickUntilRef.current) {
      event.preventDefault()
      return
    }
    openCaseStudy(projectKey)
  }
  const openDesignSprintsFromRed = () => {
    setIsRedModalOpen(false)
    openCaseStudy('design-sprints')
  }

  const interactiveCaseStudyKeys = new Set([
    'boss-ai',
    'creators-spons',
    'graptap',
    'campaign-brief',
    'design-sprints',
  ])

  const renderCaseStudyCard = (project, index) => (
    <article
      key={project.key}
      ref={(el) => {
        caseItemRefs.current[index] = el
      }}
      className={`case-study-item fade-up group ${
        !supportsHover && activeCaseIndexes.includes(index) ? 'case-study-item--active' : ''
      } ${interactiveCaseStudyKeys.has(project.key) ? 'case-study-item--clickable' : ''}`}
      style={{ animationDelay: `${120 + index * 70}ms` }}
      onClick={
        interactiveCaseStudyKeys.has(project.key)
          ? (event) => handleCaseStudyClick(event, project.key)
          : undefined
      }
      onTouchStart={interactiveCaseStudyKeys.has(project.key) ? handleCaseStudyTouchStart : undefined}
      onTouchMove={interactiveCaseStudyKeys.has(project.key) ? handleCaseStudyTouchMove : undefined}
      onTouchEnd={
        interactiveCaseStudyKeys.has(project.key)
          ? (event) => handleCaseStudyTouchEnd(event, project.key)
          : undefined
      }
      onKeyDown={
        interactiveCaseStudyKeys.has(project.key)
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openCaseStudy(project.key)
              }
            }
          : undefined
      }
      role={interactiveCaseStudyKeys.has(project.key) ? 'button' : undefined}
      tabIndex={interactiveCaseStudyKeys.has(project.key) ? 0 : undefined}
      aria-label={
        project.key === 'boss-ai'
          ? 'Open BOSS.AI case study page'
          : project.key === 'creators-spons'
            ? 'Open Sponsorships case study page'
            : project.key === 'graptap'
              ? 'Open GrabTap case study page'
              : project.key === 'campaign-brief'
                ? 'Open Campaign briefs case study page'
                : project.key === 'design-sprints'
                  ? 'Open Design Sprints case study page'
            : undefined
      }
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
          !supportsHover && activeCaseIndexes.includes(index) ? 'text-black/90' : ''
        }`}
      >
        <span className="font-roboto-slab text-[16px] font-semibold leading-none">{project.title}</span>
      </p>
    </article>
  )

  if (activeCaseStudy === 'boss-ai') {
    return (
      <BossAiCaseStudyPage
        onBack={goHome}
      />
    )
  }

  if (activeCaseStudy === 'creators-spons') {
    return (
      <SponsorshipsCaseStudyPage
        onBack={goHome}
      />
    )
  }

  if (activeCaseStudy === 'graptap') {
    return (
      <GrabTapCaseStudyPage
        onBack={goHome}
      />
    )
  }

  if (activeCaseStudy === 'campaign-brief') {
    return (
      <BriefsCaseStudyPage
        onBack={goHome}
      />
    )
  }

  if (activeCaseStudy === 'design-sprints') {
    return (
      <>
        <DesignSprintsCaseStudyPage
          onBack={goHome}
          onOpenRed={() => setIsRedModalOpen(true)}
        />
        <RedPopupModal
          open={isRedModalOpen}
          onClose={() => setIsRedModalOpen(false)}
          onOpenDesignSprints={openDesignSprintsFromRed}
        />
      </>
    )
  }

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
            {!isIntroTopLayout ? (
              <>
                <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                  {'With a background in 3D and animation, I still have a soft spot for thoughtful motion - and a good feel for how things should look and move.'}
                </p>
                <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                  {'I led design and operations at '}
                  <strong className="font-semibold text-black/70">RED</strong>
                  {', helping deliver “Damn Good Products” across hundreds of projects. After the '}
                  <strong className="font-semibold text-black/70">StreamElements</strong>
                  {' acquisition, I stayed close to the craft - working hands-on across core products used by millions, with a focus on meaningful impact.'}
                </p>
                <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                  {'My experience helps me when things get stressful; I keep things moving with clarity, focus - and just enough humor to keep everyone sane.'}
                </p>
                <p className="text-[16px] leading-[1.4] text-black/70">I genuinely enjoy what I do.</p>

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
              </>
            ) : (
              <>
                <div
                  className={`intro-more-panel ${isIntroExpanded ? 'intro-more-panel--open' : ''}`}
                  style={{
                    maxHeight: isIntroExpanded ? `${introMoreContentHeight}px` : '0px',
                  }}
                  aria-hidden={!isIntroExpanded}
                >
                  <div ref={introMoreContentRef} className="intro-more-panel__content">
                    <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                      {'With a background in 3D and animation, I still have a soft spot for thoughtful motion - and a good feel for how things should look and move.'}
                    </p>
                    <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                      {'I led design and operations at '}
                      <strong className="font-semibold text-black/70">RED</strong>
                      {', helping deliver “Damn Good Products” across hundreds of projects. After the '}
                      <strong className="font-semibold text-black/70">StreamElements</strong>
                      {' acquisition, I stayed close to the craft - working hands-on across core products used by millions, with a focus on meaningful impact.'}
                    </p>
                    <p className="mb-4 text-[16px] leading-[1.4] text-black/70">
                      {'My experience helps me when things get stressful; I keep things moving with clarity, focus - and just enough humor to keep everyone sane.'}
                    </p>
                    <p className="text-[16px] leading-[1.4] text-black/70">I genuinely enjoy what I do.</p>
                  </div>
                </div>

                {!isIntroExpanded && (
                  <div>
                    <button
                      type="button"
                      className="intro-see-more"
                      onClick={() => setIsIntroExpanded((prev) => !prev)}
                      aria-expanded={isIntroExpanded}
                    >
                      <span>See more</span>
                      <img
                        src={chevronDownIcon}
                        alt=""
                        aria-hidden="true"
                        className="intro-see-more__chevron"
                      />
                    </button>
                  </div>
                )}

                {isIntroExpanded && (
                  <>
                    <button
                      className={`header-cta--case-studies header-cta--ghost intro-full-bio-cta ${
                        isIntroTopLayout ? 'mt-7' : 'mt-4'
                      }`}
                    >
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

                    <div className="mt-7">
                      <button
                        type="button"
                        className="intro-see-more"
                        onClick={() => setIsIntroExpanded((prev) => !prev)}
                        aria-expanded={isIntroExpanded}
                      >
                        <span>Less</span>
                        <img
                          src={chevronUpIcon}
                          alt=""
                          aria-hidden="true"
                          className="intro-see-more__chevron"
                        />
                      </button>
                    </div>

                  </>
                )}
              </>
            )}
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
          className="beyond-pixels-section px-3 py-8 text-center fade-up"
          style={{ animationDelay: '420ms' }}
        >
          <h2 className="font-roboto-slab mb-7 text-[36px] font-semibold leading-[1.05] tracking-[-0.01em] text-black/90">
            Beyond the Pixels
          </h2>
          <div className="beyond-the-pixels-copy space-y-10 py-4">
            {beyondLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>Happily married and a proud dad to two amazing, curly-haired daughters.</p>
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

        <CaseStudyFooter />

        <div className="separator-line" />

        <HumanDesignBanner />
      </div>
      <RedPopupModal
        open={isRedModalOpen}
        onClose={() => setIsRedModalOpen(false)}
        onOpenDesignSprints={openDesignSprintsFromRed}
      />
    </main>
  )
}

export default App
