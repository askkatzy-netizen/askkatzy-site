/** Shared colors — keep in sync with `index.css` case-thumb / header tokens. */

export const THUMB_ACCENT = '#2B00FF'
export const THUMB_ACCENT_RGB = '43 0 255'
export const THUMB_SURFACE_IDLE = '#ded7ff'
export const THUMB_PAGE_TEXT = '#191919'

/**
 * Per-thumb hover theme (border vs surface fill) — matches `.case-thumb--*` in index.css.
 * Border = card outline + halo hue; surface = `.case-thumb__surface` fill on hover.
 */
export const CASE_THUMB_HOVER_THEME = {
  'case-thumb--new': { border: '#000000', surface: '#000000' },
  'case-thumb--stream': { border: '#2B00FF', surface: '#2B00FF' },
  'case-thumb--sponsorships': { border: '#2B00FF', surface: '#2B00FF' },
  'case-thumb--graptap': { border: '#9BB800', surface: '#D7FF00' },
  'case-thumb--boss': { border: '#2EA58D', surface: '#4CBBA5' },
  'case-thumb--campaign-brief': { border: '#E95D83', surface: '#FF83A0' },
  'case-thumb--red': { border: '#036EDC', surface: '#036EDC' },
  'case-thumb--squarefish': { border: '#0093FF', surface: '#0093FF' },
  'case-thumb--pickme': { border: '#B6448A', surface: '#B6448A' },
}

/** Default halo opacity (%) per thumb class — matches `.case-thumb--*` in index.css */
export const CASE_THUMB_HALO_OPACITY_BY_CLASS = {
  'case-thumb--new': 20,
  'case-thumb--stream': 20,
  'case-thumb--sponsorships': 20,
  'case-thumb--graptap': 24,
  'case-thumb--boss': 24,
  'case-thumb--campaign-brief': 24,
  'case-thumb--red': 24,
  'case-thumb--squarefish': 24,
  'case-thumb--pickme': 20,
}

export function getThumbHoverTheme(thumbClass) {
  return CASE_THUMB_HOVER_THEME[thumbClass] ?? CASE_THUMB_HOVER_THEME['case-thumb--stream']
}

export function getDefaultHaloOpacityForThumbClass(thumbClass) {
  return CASE_THUMB_HALO_OPACITY_BY_CLASS[thumbClass] ?? 20
}

export function getDefaultHaloOpacityForTemplate(template) {
  return (
    template?.defaultHoverHaloOpacity ??
    getDefaultHaloOpacityForThumbClass(template?.thumbClass)
  )
}
