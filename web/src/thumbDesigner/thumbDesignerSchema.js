/** Homepage case-study thumb templates — labels match `projectCards[].title`. */

import {
  getDefaultHaloOpacityForThumbClass,
  getThumbHoverTheme,
} from './thumbDesignerTokens.js'

export const THUMB_TEMPLATE_OPTIONS = [
  {
    id: 'new',
    label: 'New',
    section: 'stream-elements',
    brand: 'stream',
    thumbClass: 'case-thumb--new',
    kind: 'new',
    defaultHoverBorder: '#000000',
    defaultHoverSurface: '#000000',
    defaultHoverThemeOpacity: 70,
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--new'),
  },
  {
    id: 'creators-spons',
    label: 'Sponsorships',
    section: 'stream-elements',
    brand: 'stream',
    thumbClass: 'case-thumb--sponsorships',
    kind: 'single-logo',
    defaultHoverBorder: '#2B00FF',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--sponsorships'),
  },
  {
    id: 'graptap',
    label: 'GrabTap',
    section: 'stream-elements',
    brand: 'graptap',
    thumbClass: 'case-thumb--graptap',
    kind: 'center-mark',
    defaultHoverBorder: '#9BB800',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--graptap'),
  },
  {
    id: 'boss-ai',
    label: 'BOSS.AI',
    section: 'stream-elements',
    brand: 'boss',
    thumbClass: 'case-thumb--boss',
    kind: 'center-mark',
    defaultHoverBorder: '#2EA58D',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--boss'),
  },
  {
    id: 'campaign-brief',
    label: 'Campaign brief',
    section: 'stream-elements',
    brand: 'stream',
    thumbClass: 'case-thumb--campaign-brief',
    kind: 'center-mark',
    defaultHoverBorder: '#E95D83',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--campaign-brief'),
  },
  {
    id: 'design-sprints',
    label: 'Design Sprints prototyping',
    section: 'red',
    brand: 'red',
    thumbClass: 'case-thumb--red',
    kind: 'design-sprints',
    defaultHoverBorder: '#036EDC',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--red'),
  },
  {
    id: 'squarefish',
    label: 'SquareFish',
    section: 'red',
    brand: 'squarefish',
    thumbClass: 'case-thumb--squarefish',
    kind: 'dual-image',
    defaultHoverBorder: '#0093FF',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--squarefish'),
  },
  {
    id: 'pickme',
    label: 'PickMe',
    section: 'self-initiated',
    brand: 'pickme',
    thumbClass: 'case-thumb--pickme',
    kind: 'pickme',
    defaultHoverBorder: '#B6448A',
    defaultHoverSurface: '#B6448A',
    defaultHoverHaloOpacity: getDefaultHaloOpacityForThumbClass('case-thumb--pickme'),
  },
]

export const CASE_STUDIES_EDITOR_PATH = '/editors/caseStudyCard'

/** @deprecated Use {@link CASE_STUDIES_EDITOR_PATH}. */
export const THUMB_DESIGNER_PATH = CASE_STUDIES_EDITOR_PATH

/** Breadcrumb prefix when more editors exist; not linked until an editors index exists. */
export const EDITORS_BREADCRUMB_PREFIX = 'Editors'

/** User-facing name for the case study card editor (not “thumb designer”). */
export const CASE_STUDY_CARD_EDITOR_LABEL = 'Case study card'

/** @deprecated Use {@link CASE_STUDY_CARD_EDITOR_LABEL}. */
export const CASE_STUDIES_EDITOR_LABEL = CASE_STUDY_CARD_EDITOR_LABEL

/** Case studies editor — screen routing inside the tool. */
export const EDITOR_TOOL_SCREEN = Object.freeze({
  GRID: 'grid',
  EDITOR: 'editor',
})

export function getCaseStudyCardEditorGridTitle() {
  return `${EDITORS_BREADCRUMB_PREFIX} / ${CASE_STUDY_CARD_EDITOR_LABEL}`
}

/** Matches `.case-study-item` / `.case-studies-grid` on the homepage. */
export const CASE_STUDY_CARD_MAX_WIDTH_PX = 360
export const CASE_STUDY_CARD_MIN_WIDTH_PX = 260

/** @deprecated Grid is fluid (`auto-fill` in `index.css`); kept for layout tokens that cap a single card. */
export const CASE_STUDIES_GRID_MAX_WIDTH_PX = CASE_STUDY_CARD_MAX_WIDTH_PX

export const DRAWER_PREVIEW_PLACEHOLDER = 'Intro text appears here...'

/** Design Sprints random hover circles (after `center`). */
export const DESIGN_SPRINTS_STICKER_KEYS = [
  'sticker1',
  'sticker2',
  'sticker3',
  'sticker4',
  'sticker5',
  'sticker6',
]

/** Campaign brief hover strip icons (top → bottom), after `center`. */
export const CAMPAIGN_BRIEF_VECTOR_KEYS = [
  'vector1',
  'vector2',
  'vector3',
  'vector4',
  'vector5',
  'vector6',
]

/** Match homepage `CASE_CARD_DRAWER_DELAY_MS` in App.jsx */
export const CASE_CARD_DRAWER_DELAY_MS = 1500
export const CASE_CARD_DRAWER_CLOSE_SETTLE_MS = 640

export const BRAND_OPTIONS = [
  { value: 'stream', label: 'Stream', thumbClass: 'case-thumb--stream' },
  { value: 'graptap', label: 'GrabTap', thumbClass: 'case-thumb--graptap' },
  { value: 'boss', label: 'BOSS', thumbClass: 'case-thumb--boss' },
  { value: 'red', label: 'RED', thumbClass: 'case-thumb--red' },
  { value: 'squarefish', label: 'SquareFish', thumbClass: 'case-thumb--squarefish' },
  { value: 'pickme', label: 'PickMe', thumbClass: 'case-thumb--pickme' },
]

const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export function normalizeHexColor(value) {
  const raw = `${value ?? ''}`.trim()
  if (!raw) return ''
  const withHash = raw.startsWith('#') ? raw : `#${raw}`
  if (!HEX_COLOR_PATTERN.test(withHash)) return ''
  if (withHash.length === 4) {
    const [, r, g, b] = withHash
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }
  return withHash.toUpperCase()
}

export function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex)
  if (!normalized) return null
  const value = normalized.slice(1)
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

export function clampOpacityPercent(value, fallback = 20) {
  const parsed = Number.parseInt(`${value ?? ''}`, 10)
  if (Number.isNaN(parsed)) return fallback
  return Math.min(100, Math.max(0, parsed))
}

export function buildColorCss(colorHex, opacityPercent, fallbackOpacity = 20) {
  const rgb = hexToRgb(colorHex)
  const opacity = clampOpacityPercent(opacityPercent, fallbackOpacity)
  if (!rgb) return `rgb(43 0 255 / ${fallbackOpacity}%)`
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacity}%)`
}

/** @deprecated Use buildColorCss */
export function buildHaloCss(haloColorHex, opacityPercent) {
  return buildColorCss(haloColorHex, opacityPercent, 20)
}

export function getTemplateThemeDefaults(templateId) {
  const template = getTemplateById(templateId)
  const { border, surface } = getThumbHoverTheme(template.thumbClass)
  const hoverBorderColor = template.defaultHoverBorder ?? border
  const hoverTheme = template.defaultHoverSurface ?? surface
  const haloOpacity = template.defaultHoverHaloOpacity ?? 20
  return {
    hoverTheme,
    hoverBorderColor,
    hoverHaloColor: hoverBorderColor,
    hoverThemeOpacity: template.defaultHoverThemeOpacity ?? 100,
    hoverBorderOpacity: 100,
    hoverHaloOpacity: haloOpacity,
  }
}

export function getTemplateById(templateId) {
  return THUMB_TEMPLATE_OPTIONS.find((t) => t.id === templateId) ?? THUMB_TEMPLATE_OPTIONS[0]
}

export function slugifyTitle(title) {
  return `${title ?? ''}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function resolveThemeColors(state) {
  const template = getTemplateById(state.templateId)
  const { border, surface } = getThumbHoverTheme(template.thumbClass)
  const hoverTheme = normalizeHexColor(state.hoverTheme) || template.defaultHoverSurface || surface
  const hoverBorderColor =
    normalizeHexColor(state.hoverBorderColor) || template.defaultHoverBorder || border
  const hoverHaloColor = normalizeHexColor(state.hoverHaloColor) || hoverBorderColor
  const hoverThemeOpacity = clampOpacityPercent(
    state.hoverThemeOpacity,
    template.defaultHoverThemeOpacity ?? 100,
  )
  const hoverBorderOpacity = clampOpacityPercent(state.hoverBorderOpacity, 100)
  const haloFallback = template.defaultHoverHaloOpacity ?? 20
  const hoverHaloOpacity = clampOpacityPercent(state.hoverHaloOpacity, haloFallback)
  return {
    hoverTheme,
    hoverBorderColor,
    hoverHaloColor,
    hoverThemeOpacity,
    hoverBorderOpacity,
    hoverHaloOpacity,
    hoverSurface: buildColorCss(hoverTheme, hoverThemeOpacity, 100),
    hoverBorder: buildColorCss(hoverBorderColor, hoverBorderOpacity, 100),
    hoverHalo: buildColorCss(hoverHaloColor, hoverHaloOpacity, haloFallback),
  }
}

export function validateThumbDesignerForm(state) {
  const errors = []
  const template = getTemplateById(state.templateId)

  if (template.id === 'pickme') {
    const parsedTitleName = /^PickMe\s*\{([^}]+)\}\s*$/i.exec(`${state.title ?? ''}`.trim())?.[1]?.trim()
    const pickMeName = (state.pickMeName ?? '').trim() || parsedTitleName
    if (!pickMeName) errors.push('Name is required.')
  } else if (!`${state.title ?? ''}`.trim()) {
    errors.push('Title is required.')
  }
  if (!`${state.tag ?? ''}`.trim()) errors.push('Tag is required.')

  if (!normalizeHexColor(state.hoverTheme)) {
    errors.push('Hover theme color is required (hex, e.g. #2B00FF).')
  }
  if (!normalizeHexColor(state.hoverBorderColor)) {
    errors.push('Border color is required (hex, e.g. #2B00FF).')
  }
  if (!normalizeHexColor(state.hoverHaloColor)) {
    errors.push('Hover halo color is required (hex, e.g. #2B00FF).')
  }

  const asset = (key) => state.assets?.[key]

  switch (template.id) {
    case 'graptap':
      if (!asset('background')) errors.push('Upload a background asset.')
      if (!asset('center')) errors.push('Upload a center asset.')
      break
    case 'boss-ai':
      if (!asset('sparkle')) errors.push('Upload a star asset.')
      if (!asset('background')) errors.push('Upload a background asset.')
      if (!asset('backgroundSecondary')) errors.push('Upload a secondary background asset.')
      break
    case 'campaign-brief':
      if (!asset('center')) errors.push('Upload a center asset.')
      CAMPAIGN_BRIEF_VECTOR_KEYS.forEach((key) => {
        if (!asset(key)) errors.push(`Upload vector asset (${key}).`)
      })
      break
    case 'design-sprints':
      if (!asset('center')) errors.push('Upload a center asset (SPRINT).')
      DESIGN_SPRINTS_STICKER_KEYS.forEach((key) => {
        if (!asset(key)) errors.push(`Upload sticker asset (${key}).`)
      })
      break
    case 'squarefish':
      if (!asset('idle')) errors.push('Upload idle asset.')
      if (!asset('hover')) errors.push('Upload hover asset.')
      if (!asset('bubble')) errors.push('Upload bubble asset.')
      break
    case 'pickme':
      if (!asset('center')) errors.push('Upload a hand asset.')
      if (!asset('carousel1')) errors.push('Upload carousel logo 1.')
      if (!asset('carousel2')) errors.push('Upload carousel logo 2.')
      if (!asset('carousel3')) errors.push('Upload carousel logo 3.')
      break
    default:
      break
  }

  switch (template.kind) {
    case 'single-logo':
      if (!asset('logo')) errors.push('Upload one logo asset.')
      break
    case 'center-mark':
      if (template.id === 'graptap' || template.id === 'boss-ai' || template.id === 'campaign-brief') {
        break
      }
      if (!asset('center')) errors.push('Upload at least one center asset.')
      break
    case 'design-sprints':
      if (template.id === 'design-sprints') break
      if (!asset('mark')) errors.push('Upload one asset.')
      break
    case 'dual-image':
      if (template.id === 'squarefish') break
      if (!asset('idle')) errors.push('Upload idle asset.')
      if (!asset('hover')) errors.push('Upload hover asset.')
      break
    case 'pickme':
      break
    case 'new':
      if (!asset('center')) errors.push('Upload a center asset.')
      break
    default:
      break
  }

  return errors
}

export function buildThumbDesignerExport(state) {
  const template = getTemplateById(state.templateId)
  const suggestedKey = slugifyTitle(state.title) || 'new-case-study'
  const section =
    template.id === 'new' ? state.section || 'stream-elements' : template.section
  const brand = template.id === 'new' ? state.brand || 'stream' : template.brand
  const theme = resolveThemeColors(state)

  const assetNames = {}
  const describeAsset = (slot, file) => {
    if (!file) return
    const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '.png'
    assetNames[slot] = `${suggestedKey}-${slot}${ext}`
  }

  describeAsset('logo', state.assets?.logo?.file)
  describeAsset('center', state.assets?.center?.file)
  describeAsset('mark', state.assets?.mark?.file)
  describeAsset('idle', state.assets?.idle?.file)
  describeAsset('hover', state.assets?.hover?.file)
  describeAsset('bubble', state.assets?.bubble?.file)
  describeAsset('center', state.assets?.center?.file)
  describeAsset('sparkle', state.assets?.sparkle?.file)
  describeAsset('background', state.assets?.background?.file)
  describeAsset('backgroundSecondary', state.assets?.backgroundSecondary?.file)
  CAMPAIGN_BRIEF_VECTOR_KEYS.forEach((key) => {
    describeAsset(key, state.assets?.[key]?.file)
  })
  DESIGN_SPRINTS_STICKER_KEYS.forEach((key) => {
    describeAsset(key, state.assets?.[key]?.file)
  })
  ;(state.assets?.extra ?? []).forEach((entry, index) => {
    if (entry?.file) {
      const ext = entry.file.name.includes('.')
        ? entry.file.name.slice(entry.file.name.lastIndexOf('.'))
        : '.png'
      assetNames[`extra-${index + 1}`] = `${suggestedKey}-extra-${index + 1}${ext}`
    }
  })

  const brandThumbClass =
    BRAND_OPTIONS.find((b) => b.value === brand)?.thumbClass ?? 'case-thumb--stream'

  return {
    projectCard: {
      key: suggestedKey,
      title: state.title.trim(),
      tag: state.tag.trim(),
      brand,
      section,
    },
    templateBase: template.id,
    templateLabel: template.label,
    thumbClass: template.id === 'new' ? brandThumbClass : template.thumbClass,
    theme: {
      hoverTheme: theme.hoverTheme,
      hoverBorderColor: theme.hoverBorderColor,
      hoverHaloColor: theme.hoverHaloColor,
      hoverThemeOpacity: theme.hoverThemeOpacity,
      hoverBorderOpacity: theme.hoverBorderOpacity,
      hoverHaloOpacity: theme.hoverHaloOpacity,
      cssVariables: {
        '--case-hover-border': theme.hoverBorder,
        '--case-hover-surface': theme.hoverSurface,
        '--case-hover-halo': theme.hoverHalo,
      },
    },
    figmaLink: state.figmaLink?.trim() || null,
    suggestedAssetFilenames: assetNames,
  }
}
