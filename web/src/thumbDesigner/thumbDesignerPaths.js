import { CASE_STUDIES_EDITOR_PATH } from './thumbDesignerSchema.js'

const LEGACY_CASE_STUDIES_EDITOR_PATHS = [
  '/design/case_studies_editor',
  '/design/thumbnail',
]

const CASE_STUDIES_EDITOR_PATHS = [CASE_STUDIES_EDITOR_PATH, ...LEGACY_CASE_STUDIES_EDITOR_PATHS]

function normalizePathname(pathname) {
  const normalized = `${pathname ?? ''}`.replace(/\/+$/, '') || '/'
  return normalized
}

/** @deprecated Use {@link isCaseStudyEditorPath}. */
export function isThumbDesignerPath(pathname) {
  return isCaseStudyEditorPath(pathname)
}

export function isCaseStudyEditorPath(pathname) {
  const normalized = normalizePathname(pathname)
  return CASE_STUDIES_EDITOR_PATHS.some(
    (path) => normalized === path || normalized.endsWith(path),
  )
}

export function resolveCaseStudiesEditorPath(pathname) {
  const normalized = normalizePathname(pathname)
  const isLegacy = LEGACY_CASE_STUDIES_EDITOR_PATHS.some(
    (path) => normalized === path || normalized.endsWith(path),
  )
  if (isLegacy) return CASE_STUDIES_EDITOR_PATH
  return normalized
}
