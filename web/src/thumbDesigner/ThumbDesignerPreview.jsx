import { useEffect, useRef, useState } from 'react'
import { DesignSprintsWordmark } from '../DesignSprintsWordmark.jsx'
import { LogoCarousel } from '../logo-carousel/index.js'
import { SquareFishThumbBubbles } from '../SquareFishThumbBubbles.jsx'
import squareFishBubbleDefault from '../assets/_bubble.svg'
import squareFishDefault from '../assets/Piranha_default.png'
import squareFishHoverDefault from '../assets/Piranha_hover.png'
import graptapBg from '../assets/graptap-bg.svg'
import graptapLogoDefault from '../assets/graptap-logo-default.svg'
import bossAiCog from '../assets/CaseStudy-Boss-cog-1.svg'
import bossAiCog2 from '../assets/CaseStudy-Boss-cog-2.svg'
import bossAiSparkle from '../assets/boss-ai-sparkle.svg'
import brief1StarIcon from '../assets/brief1-star.svg'
import brief4JoinInnerIcon from '../assets/brief4-join_inner.svg'
import brief5PreviewIcon from '../assets/brief5-preview.svg'
import brief6TimerIcon from '../assets/brief6-timer.svg'
import brief12VideoLibraryIcon from '../assets/brief12video_library.svg'
import brief13BoltIcon from '../assets/brief13-bolt.svg'
import caseStudyDefault from '../assets/CaseStudy_default.svg'
import pickmeHandDefault from '../assets/pickme/pickme-hand.svg'
import {
  PICKME_CAROUSEL_COUNT,
  PICKME_CAROUSEL_SLOTS,
  pickRandomPickMeParticipants,
} from './pickmeParticipants.js'
import streamElementsLogo from '../assets/StreamElementsLogo.svg'
import stickerDot01 from '../assets/sticker-dot-01.svg'
import stickerDot02 from '../assets/sticker-dot-02.svg'
import stickerDot03 from '../assets/sticker-dot-03.svg'
import stickerDot04 from '../assets/sticker-dot-04.svg'
import stickerDot05 from '../assets/sticker-dot-05.svg'
import stickerDot06 from '../assets/sticker-dot-06.svg'
import {
  CAMPAIGN_BRIEF_VECTOR_KEYS,
  DESIGN_SPRINTS_STICKER_KEYS,
  DRAWER_PREVIEW_PLACEHOLDER,
} from './thumbDesignerSchema.js'

const RING_PATH =
  'M51 0C79.1665 0 102 22.8335 102 51C102 79.1665 79.1665 102 51 102C22.8335 102 0 79.1665 0 51C0 22.8335 22.8335 0 51 0Z'

/** Matches inline center mark in `App.jsx` (animated on hover). */
const CAMPAIGN_BRIEF_LINE_ICON_PATH =
  'M47.25 11.25H6.75M33.75 27H6.75M38.25 42.75H6.75'

function CampaignBriefCenterLines() {
  return (
    <>
      <svg
        className="case-thumb__campaign-brief-icon-svg case-thumb__campaign-brief-icon-svg--outgoing"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={CAMPAIGN_BRIEF_LINE_ICON_PATH}
        />
      </svg>
      <svg
        className="case-thumb__campaign-brief-icon-svg case-thumb__campaign-brief-icon-svg--incoming"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d={CAMPAIGN_BRIEF_LINE_ICON_PATH}
        />
      </svg>
    </>
  )
}

const DEFAULT_DESIGN_SPRINTS_STICKER_ICONS = [
  stickerDot01,
  stickerDot02,
  stickerDot03,
  stickerDot04,
  stickerDot05,
  stickerDot06,
]

const DESIGN_SPRINTS_STICKER_VARIANTS = ['01', '02', '03', '04', '05', '06']

const DEFAULT_CAMPAIGN_BRIEF_VECTOR_ICONS = [
  brief1StarIcon,
  brief4JoinInnerIcon,
  brief5PreviewIcon,
  brief6TimerIcon,
  brief12VideoLibraryIcon,
  brief13BoltIcon,
]

const CAMPAIGN_BRIEF_CENTER_SAMPLE = 'campaign-brief-center-lines.svg'

function getDismissedSet(dismissedSlots) {
  return new Set(dismissedSlots ?? [])
}

/** Template default only when the slot is still in the asset list (not removed with X). */
function previewSrc(src, dismissed, slotKey, defaultSrc) {
  if (dismissed.has(slotKey)) return null
  return src || defaultSrc || null
}

function centerUsesMonochromeHover(center) {
  if (!center) return true
  if (center.monochromeHover === false) return false
  if (center.monochromeHover === true) return true
  return center.isSample !== false || !center.file
}

function campaignBriefCenterIsCustomUpload(center) {
  if (!center) return false
  if (center.file) return true
  if (center.isBuiltIn) return false
  return center.sampleFileName !== CAMPAIGN_BRIEF_CENTER_SAMPLE
}

function SponsorshipsPreview({ src, alt }) {
  return (
    <>
      <img src={src} alt={alt} className="case-thumb__logo case-thumb__logo--spons-idle" />
      <div className="case-thumb__spons-hover" aria-hidden="true">
        <img src={src} alt="" className="case-thumb__logo case-thumb__logo--spons-hover-logo" />
      </div>
    </>
  )
}

function GraptapThumbPreview({ bgSrc, logoSrc, dismissed }) {
  const showBg = !dismissed.has('background')
  const showCenter = !dismissed.has('center')
  if (!showBg && !showCenter) return null

  const glyphMask = showCenter ? logoSrc || graptapLogoDefault : null
  const glyphMaskStyle = glyphMask
    ? { '--graptap-glyph-mask': `url(${JSON.stringify(glyphMask)})` }
    : undefined

  return (
    <>
      {showBg ? (
        <div className="case-thumb__graptap-deco" aria-hidden="true">
          <img src={bgSrc || graptapBg} alt="" className="case-thumb__graptap-pattern-bg" />
        </div>
      ) : null}
      {showCenter ? (
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
              d={RING_PATH}
            />
          </svg>
        </div>
        <div
          className="case-thumb__graptap-glyph"
          style={glyphMaskStyle}
          role="img"
          aria-hidden="true"
        />
      </div>
      ) : null}
    </>
  )
}

function PickMeThumbPreview({ handSrc, carouselAssets, active, dismissed }) {
  const [randomParticipants, setRandomParticipants] = useState(() =>
    pickRandomPickMeParticipants(PICKME_CAROUSEL_COUNT),
  )
  const [isHandSurfacing, setIsHandSurfacing] = useState(false)
  const wasActiveRef = useRef(false)
  const surfaceTimerRef = useRef(null)

  useEffect(() => {
    if (active && !wasActiveRef.current) {
      setRandomParticipants(pickRandomPickMeParticipants(PICKME_CAROUSEL_COUNT))
      setIsHandSurfacing(false)
      if (surfaceTimerRef.current) {
        window.clearTimeout(surfaceTimerRef.current)
        surfaceTimerRef.current = null
      }
    } else if (!active && wasActiveRef.current) {
      setIsHandSurfacing(true)
      if (surfaceTimerRef.current) window.clearTimeout(surfaceTimerRef.current)
      surfaceTimerRef.current = window.setTimeout(() => {
        setIsHandSurfacing(false)
        surfaceTimerRef.current = null
      }, 760)
    }
    wasActiveRef.current = active

    return () => {
      if (surfaceTimerRef.current) {
        window.clearTimeout(surfaceTimerRef.current)
        surfaceTimerRef.current = null
      }
    }
  }, [active])

  const showHand = !dismissed.has('center')
  const carouselSlots = PICKME_CAROUSEL_SLOTS.filter((key) => !dismissed.has(key))
  const participants = carouselSlots
    .map((key, index) => {
      const base = randomParticipants[index]
      if (!base) return null
      const asset = carouselAssets?.[key]
      if (asset && asset.isSample === false && asset.previewUrl) {
        return { ...base, logo: asset.previewUrl }
      }
      return base
    })
    .filter(Boolean)

  if (!showHand && participants.length === 0) return null

  return (
    <div className={`case-thumb__pickme ${active ? 'case-thumb__pickme--active' : ''}`}>
      {participants.length > 0 ? (
        <div
          className={`case-thumb__pickme-carousel ${active ? 'case-thumb__pickme-carousel--active' : ''}`}
          aria-hidden={!active}
        >
          <LogoCarousel active={active} wheelRadius={78} logoStep={78}>
            {participants.map((participant, index) => (
              <div key={participant.id ?? index} className="case-thumb__pickme-logo-badge">
                <img
                  src={participant.logo}
                  alt=""
                  className="case-thumb__pickme-logo-img"
                  draggable={false}
                />
              </div>
            ))}
          </LogoCarousel>
        </div>
      ) : null}
      {showHand ? (
        <div
          className={`case-thumb__pickme-hand-clip ${
            isHandSurfacing ? 'case-thumb__pickme-hand-clip--surfacing' : ''
          }`}
        >
          <img
            src={handSrc || pickmeHandDefault}
            alt=""
            className="case-thumb__pickme-hand"
            draggable={false}
          />
        </div>
      ) : null}
    </div>
  )
}

function BossAiThumbPreview({ sparkleSrc, primaryCogSrc, secondaryCogSrc, dismissed }) {
  const showSparkle = !dismissed.has('sparkle')
  const showPrimary = !dismissed.has('background')
  const showSecondary = !dismissed.has('backgroundSecondary')
  if (!showSparkle && !showPrimary && !showSecondary) return null

  return (
    <div className="case-thumb__boss-mark">
      {showPrimary ? (
        <div className="case-thumb__boss-cog" aria-hidden="true">
          <img src={primaryCogSrc || bossAiCog} alt="" className="case-thumb__boss-cog-img" />
        </div>
      ) : null}
      {showSecondary ? (
        <div className="case-thumb__boss-cog case-thumb__boss-cog--secondary" aria-hidden="true">
          <img
            src={secondaryCogSrc || bossAiCog2}
            alt=""
            className="case-thumb__boss-cog-img case-thumb__boss-cog-img--secondary"
          />
        </div>
      ) : null}
      {showPrimary || showSecondary || showSparkle ? (
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
            d={RING_PATH}
          />
        </svg>
      </div>
      ) : null}
      {showSparkle ? (
        <div className="case-thumb__boss-sparkle" aria-hidden="true">
          <img src={sparkleSrc || bossAiSparkle} alt="" className="case-thumb__boss-sparkle-svg" />
        </div>
      ) : null}
    </div>
  )
}

function CampaignBriefThumbPreview({ centerSrc, centerIsCustomUpload, vectorSrcs, dismissed }) {
  const vectorEntries = CAMPAIGN_BRIEF_VECTOR_KEYS.flatMap((key, index) => {
    if (dismissed.has(key)) return []
    return [{ key, src: vectorSrcs?.[key] || DEFAULT_CAMPAIGN_BRIEF_VECTOR_ICONS[index] }]
  })

  const showCenter = !dismissed.has('center')
  if (!showCenter && !vectorEntries.length) return null

  return (
    <>
      {vectorEntries.length ? (
        <div className="case-thumb__campaign-brief-vector" aria-hidden="true">
          {vectorEntries.map(({ key, src }, index) => (
            <span key={key} className="case-thumb__campaign-brief-vector-item">
              <img
                src={src}
                alt=""
                className="case-thumb__campaign-brief-vector-img"
                style={{ transitionDelay: `${index * 55}ms` }}
              />
            </span>
          ))}
        </div>
      ) : null}
      {showCenter ? (
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
              d={RING_PATH}
            />
          </svg>
        </div>
        <div className="case-thumb__campaign-brief-icon" aria-hidden="true">
          <span className="case-thumb__campaign-brief-icon-viewport">
            {centerIsCustomUpload && centerSrc ? (
              <img
                src={centerSrc}
                alt=""
                className="case-thumb__campaign-brief-center-img"
              />
            ) : (
              <CampaignBriefCenterLines />
            )}
          </span>
        </div>
      </div>
      ) : null}
    </>
  )
}

function SquareFishThumbPreview({ idleSrc, hoverSrc, bubbleSrc, dismissed }) {
  const showIdle = !dismissed.has('idle')
  const showHover = !dismissed.has('hover')
  const showBubble = !dismissed.has('bubble')
  if (!showIdle && !showHover && !showBubble) return null

  const idleDisplay = showIdle ? idleSrc || squareFishDefault : null
  const hoverDisplay = showHover ? hoverSrc || squareFishHoverDefault : null
  const bubbleDisplay = showBubble ? bubbleSrc || squareFishBubbleDefault : null

  return (
    <>
      {showBubble && bubbleDisplay ? (
        <SquareFishThumbBubbles bubbleSrc={bubbleDisplay} />
      ) : null}
      {idleDisplay ? (
        <img
          src={idleDisplay}
          alt="Idle preview"
          className="case-thumb__squarefish case-thumb__squarefish--default"
        />
      ) : null}
      {hoverDisplay ? (
        <img
          src={hoverDisplay}
          alt=""
          aria-hidden="true"
          className="case-thumb__squarefish case-thumb__squarefish--hover"
        />
      ) : null}
    </>
  )
}

function DrawerPreview({ isOpen }) {
  return (
    <div className="case-thumb__hover-drawer-clip">
      <div
        className={`case-thumb__hover-drawer ${isOpen ? 'case-thumb__hover-drawer--open' : ''}`}
      >
        <div className="case-thumb__hover-drawer-row">
          <p className="case-thumb__hover-drawer-text">
            <span>{DRAWER_PREVIEW_PLACEHOLDER}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function CaseThumbVisual({
  template,
  tag,
  assets,
  dismissedSlots = [],
  previewHover,
  drawerOpen = false,
  drawerVisible = false,
  brandThumbClass,
  thumbClassName = '',
  themeStyle,
  showDrawer = true,
  children,
}) {
  const thumbClass = template.id === 'new' ? brandThumbClass : template.thumbClass
  const isDrawerOpen = showDrawer && drawerOpen
  const isDrawerShowing = showDrawer && drawerVisible
  const dismissed = getDismissedSet(dismissedSlots)

  const logoSrc = dismissed.has('logo') ? null : assets.logo?.previewUrl
  const centerSrc = dismissed.has('center') ? null : assets.center?.previewUrl
  const idleSrc = dismissed.has('idle') ? null : assets.idle?.previewUrl
  const hoverSrc = dismissed.has('hover') ? null : assets.hover?.previewUrl
  const bubbleSrc = dismissed.has('bubble') ? null : assets.bubble?.previewUrl
  const sparkleSrc = dismissed.has('sparkle') ? null : assets.sparkle?.previewUrl
  const backgroundSrc = dismissed.has('background') ? null : assets.background?.previewUrl
  const backgroundSecondarySrc = dismissed.has('backgroundSecondary')
    ? null
    : assets.backgroundSecondary?.previewUrl
  const campaignBriefVectorSrcs = Object.fromEntries(
    CAMPAIGN_BRIEF_VECTOR_KEYS.filter((key) => !dismissed.has(key)).map((key) => [
      key,
      assets[key]?.previewUrl,
    ]),
  )
  const pickmeCarouselAssets = Object.fromEntries(
    PICKME_CAROUSEL_SLOTS.map((key) => [
      key,
      dismissed.has(key) ? null : assets[key],
    ]),
  )
  const designSprintsStickerDots = DESIGN_SPRINTS_STICKER_KEYS.flatMap((key, index) => {
    if (dismissed.has(key)) return []
    return [
      {
        key: DESIGN_SPRINTS_STICKER_VARIANTS[index],
        src: assets[key]?.previewUrl || DEFAULT_DESIGN_SPRINTS_STICKER_ICONS[index],
      },
    ]
  })
  const newCenterSrc = previewSrc(assets.center?.previewUrl, dismissed, 'center', caseStudyDefault)

  return (
    <div
      className={`case-thumb w-full max-w-[var(--case-study-card-max)] ${thumbClass} ${isDrawerShowing ? 'case-thumb--drawer-open' : ''} ${thumbClassName}`.trim()}
      style={themeStyle}
    >
      <div className="case-thumb__surface">
        {template.kind === 'single-logo' && !dismissed.has('logo') ? (
          <SponsorshipsPreview
            src={logoSrc || streamElementsLogo}
            alt="StreamElements logo"
          />
        ) : null}

        {template.id === 'graptap' ? (
          <GraptapThumbPreview bgSrc={backgroundSrc} logoSrc={centerSrc} dismissed={dismissed} />
        ) : null}

        {template.id === 'boss-ai' ? (
          <BossAiThumbPreview
            sparkleSrc={sparkleSrc}
            primaryCogSrc={backgroundSrc}
            secondaryCogSrc={backgroundSecondarySrc}
            dismissed={dismissed}
          />
        ) : null}

        {template.id === 'campaign-brief' ? (
          <CampaignBriefThumbPreview
            centerSrc={centerSrc}
            centerIsCustomUpload={campaignBriefCenterIsCustomUpload(assets.center)}
            vectorSrcs={campaignBriefVectorSrcs}
            dismissed={dismissed}
          />
        ) : null}

        {template.id === 'pickme' ? (
          <PickMeThumbPreview
            handSrc={centerSrc}
            carouselAssets={pickmeCarouselAssets}
            active={previewHover}
            dismissed={dismissed}
          />
        ) : null}

        {template.kind === 'design-sprints' ? (
          <DesignSprintsWordmark
            isActive={previewHover}
            showCenter={!dismissed.has('center')}
            centerSrc={centerSrc ?? undefined}
            centerIsCustomUpload={campaignBriefCenterIsCustomUpload(assets.center)}
            stickerDots={designSprintsStickerDots}
          />
        ) : null}

        {template.kind === 'dual-image' ? (
          <SquareFishThumbPreview
            idleSrc={idleSrc}
            hoverSrc={hoverSrc}
            bubbleSrc={bubbleSrc}
            dismissed={dismissed}
          />
        ) : null}

        {template.kind === 'new' && newCenterSrc ? (
          <img
            src={newCenterSrc}
            alt="Asset preview"
            className={`case-thumb__logo ${centerUsesMonochromeHover(assets.center) ? 'case-thumb__logo--monochrome-hover' : ''}`.trim()}
          />
        ) : null}
      </div>

      {tag ? <span className="case-thumb__tag">{tag}</span> : null}
      {children}
      {showDrawer ? <DrawerPreview isOpen={isDrawerOpen} /> : null}
    </div>
  )
}

export function ThumbDesignerPreview({
  template,
  tag,
  title,
  assets,
  dismissedSlots,
  previewHover,
  drawerOpen = false,
  drawerVisible = false,
  brandThumbClass,
  themeStyle,
  onPreviewEnter,
  onPreviewLeave,
}) {
  return (
    <article
      className={`thumb-designer-preview case-study-item group w-full ${previewHover ? 'case-study-item--active' : ''}`}
      onMouseEnter={onPreviewEnter}
      onMouseLeave={onPreviewLeave}
    >
      <CaseThumbVisual
        template={template}
        tag={tag}
        assets={assets}
        dismissedSlots={dismissedSlots}
        previewHover={previewHover}
        drawerOpen={drawerOpen}
        drawerVisible={drawerVisible}
        brandThumbClass={brandThumbClass}
        themeStyle={themeStyle}
        showDrawer
      />

      {title ? (
        <p className="mt-2 ml-[40px] text-black/40 transition-colors duration-[160ms] group-hover:text-black/90">
          <span className="font-roboto-slab text-[16px] font-semibold leading-none">{title}</span>
        </p>
      ) : null}
    </article>
  )
}
