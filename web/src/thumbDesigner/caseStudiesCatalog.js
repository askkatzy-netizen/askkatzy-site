import {
  deserializePersistedAssets,
  serializeAssetsForCompare,
  serializeAssetsForPersistence,
} from './caseStudiesAssetPersistence.js'
import { getTemplateSampleAssets } from './thumbDesignerSampleAssets.js'
import {
  clampOpacityPercent,
  getTemplateById,
  getTemplateThemeDefaults,
  normalizeHexColor,
  slugifyTitle,
} from './thumbDesignerSchema.js'

function haloOpacityFallback(templateId) {
  return getTemplateById(templateId).defaultHoverHaloOpacity ?? 20
}

export const DEFAULT_PICKME_NAME = 'name'

export function formatPickMeTitle(name) {
  const trimmed = `${name ?? ''}`.trim()
  if (!trimmed) return 'PickMe'
  return `PickMe {${trimmed}}`
}

export function parsePickMeName(title) {
  const match = /^PickMe\s*\{([^}]+)\}\s*$/i.exec(`${title ?? ''}`.trim())
  return match ? match[1].trim() : null
}

export function getPickMeName(entry) {
  if (entry?.pickMeName?.trim()) return entry.pickMeName.trim()
  const parsed = parsePickMeName(entry?.title)
  if (parsed) return parsed
  return DEFAULT_PICKME_NAME
}

export function getPickMeDisplayTitle(entry) {
  return formatPickMeTitle(getPickMeName(entry))
}

export function normalizePickMeFormFields(form) {
  if (form?.templateId !== 'pickme') return form
  const name = (form.pickMeName ?? '').trim() || parsePickMeName(form.title) || DEFAULT_PICKME_NAME
  return {
    ...form,
    pickMeName: name,
    title: formatPickMeTitle(name),
  }
}

function migrateLegacyPickMeEyal(entry) {
  if (entry?.templateId !== 'pickme') return false
  if (entry.pickMeName === 'Eyal' || entry.title === 'PickMe {Eyal}') {
    entry.pickMeName = 'name'
    entry.title = 'PickMe {name}'
    return true
  }
  return false
}

function syncPickMeCatalogEntry(entry) {
  if (entry?.templateId !== 'pickme') return
  const name = getPickMeName(entry)
  entry.pickMeName = name
  entry.title = formatPickMeTitle(name)
}

export function getManagedCaseStudyTheme(entry) {
  if (entry?.hoverTheme) {
    return {
      hoverTheme: entry.hoverTheme,
      hoverBorderColor: entry.hoverBorderColor ?? entry.hoverTheme,
      hoverHaloColor: entry.hoverHaloColor ?? entry.hoverTheme,
      hoverThemeOpacity: clampOpacityPercent(
        entry.hoverThemeOpacity,
        getTemplateThemeDefaults(entry.templateId).hoverThemeOpacity,
      ),
      hoverBorderOpacity: clampOpacityPercent(entry.hoverBorderOpacity, 100),
      hoverHaloOpacity: clampOpacityPercent(
        entry.hoverHaloOpacity,
        haloOpacityFallback(entry.templateId),
      ),
    }
  }
  return getTemplateThemeDefaults(entry.templateId)
}

export function serializeEditorFormForCompare(form) {
  return JSON.stringify({
    title: (form.title ?? '').trim(),
    pickMeName: (form.pickMeName ?? '').trim(),
    tag: (form.tag ?? '').trim(),
    templateId: form.templateId,
    section: form.section,
    brand: form.brand,
    hoverTheme: normalizeHexColor(form.hoverTheme) ?? (form.hoverTheme ?? ''),
    hoverBorderColor: normalizeHexColor(form.hoverBorderColor) ?? (form.hoverBorderColor ?? ''),
    hoverHaloColor: normalizeHexColor(form.hoverHaloColor) ?? (form.hoverHaloColor ?? ''),
    hoverThemeOpacity: clampOpacityPercent(
      form.hoverThemeOpacity,
      getTemplateThemeDefaults(form.templateId).hoverThemeOpacity,
    ),
    hoverBorderOpacity: clampOpacityPercent(form.hoverBorderOpacity, 100),
    hoverHaloOpacity: clampOpacityPercent(
      form.hoverHaloOpacity,
      haloOpacityFallback(form.templateId),
    ),
    showInAskkatzy: form.showInAskkatzy === true,
    figmaLink: (form.figmaLink ?? '').trim(),
    assets: serializeAssetsForCompare(form.assets),
  })
}

export function isCaseStudyVisibleOnHomepage(entry) {
  if (!entry) return false
  if (typeof entry.showInAskkatzy === 'boolean') return entry.showInAskkatzy
  return true
}

export function getManagedCaseStudyAssets(entry) {
  if (!entry) return {}
  if (entry.savedAssets) {
    return deserializePersistedAssets(entry.savedAssets, entry.templateId)
  }
  return getTemplateSampleAssets(entry.templateId)
}

export const CASE_STUDY_OVERRIDES_STORAGE_KEY = 'askkatzy-case-study-overrides'

export const NEW_CASE_STUDY_DEFAULT_TITLE = ''
export const NEW_CASE_STUDY_DEFAULT_TAG = 'Keep it short'

const CASE_STUDY_CATALOG_CHANGE_EVENT = 'askkatzy-case-study-catalog-change'

let catalogRevision = 0
const catalogListeners = new Set()

export function getCaseStudyCatalogRevision() {
  return catalogRevision
}

export function subscribeCaseStudyCatalog(onStoreChange) {
  catalogListeners.add(onStoreChange)

  if (typeof window === 'undefined') {
    return () => catalogListeners.delete(onStoreChange)
  }

  const onStorage = (event) => {
    if (event.key !== CASE_STUDY_OVERRIDES_STORAGE_KEY) return
    hydrateCatalogFromPersistedOverrides()
    onStoreChange()
  }

  const onCatalogChange = () => onStoreChange()

  window.addEventListener('storage', onStorage)
  window.addEventListener(CASE_STUDY_CATALOG_CHANGE_EVENT, onCatalogChange)

  return () => {
    catalogListeners.delete(onStoreChange)
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CASE_STUDY_CATALOG_CHANGE_EVENT, onCatalogChange)
  }
}

export function notifyCaseStudyCatalogChanged() {
  catalogRevision += 1
  for (const listener of catalogListeners) {
    listener()
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CASE_STUDY_CATALOG_CHANGE_EVENT))
  }
}

function readPersistedCaseStudyOverrides() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(CASE_STUDY_OVERRIDES_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writePersistedCaseStudyOverrides(overrides) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(CASE_STUDY_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides))
}

export async function buildCatalogPatchFromForm(form) {
  const template = getTemplateById(form.templateId)
  const fallbackTheme = getTemplateThemeDefaults(form.templateId)
  const hoverTheme = normalizeHexColor(form.hoverTheme) || fallbackTheme.hoverTheme
  const hoverBorderColor =
    normalizeHexColor(form.hoverBorderColor) || fallbackTheme.hoverBorderColor || hoverTheme
  const savedAssets = await serializeAssetsForPersistence(form.assets)
  const patch = {
    title: (form.title ?? '').trim(),
    tag: (form.tag ?? '').trim(),
    section: form.section || template.section,
    brand: form.brand || template.brand,
    templateId: form.templateId,
    hoverTheme,
    hoverBorderColor,
    hoverHaloColor: normalizeHexColor(form.hoverHaloColor) || hoverBorderColor,
    hoverThemeOpacity: clampOpacityPercent(
      form.hoverThemeOpacity,
      fallbackTheme.hoverThemeOpacity,
    ),
    hoverBorderOpacity: clampOpacityPercent(form.hoverBorderOpacity, 100),
    hoverHaloOpacity: clampOpacityPercent(
      form.hoverHaloOpacity,
      haloOpacityFallback(form.templateId),
    ),
    showInAskkatzy: form.showInAskkatzy === true,
    figmaLink: (form.figmaLink ?? '').trim() || undefined,
    savedAssets,
  }

  if (form.templateId === 'pickme') {
    const pickMeName = (form.pickMeName ?? '').trim() || parsePickMeName(form.title) || DEFAULT_PICKME_NAME
    patch.pickMeName = pickMeName
    patch.title = formatPickMeTitle(pickMeName)
  }

  return patch
}

/** Live homepage + management tool case studies (single source of truth). */

export const MANAGED_CASE_STUDIES = [
  {
    key: 'creators-spons',
    title: 'Sponsorships',
    tag: 'Helping 1M+ creators win',
    brand: 'stream',
    section: 'stream-elements',
    templateId: 'creators-spons',
    showInAskkatzy: true,
  },
  {
    key: 'graptap',
    title: 'GrabTap',
    tag: 'Play-to-earn app',
    brand: 'graptap',
    section: 'stream-elements',
    templateId: 'graptap',
    showInAskkatzy: true,
  },
  {
    key: 'boss-ai',
    title: 'BOSS.AI',
    tag: 'AI Campaign Engine',
    brand: 'boss',
    section: 'stream-elements',
    templateId: 'boss-ai',
    showInAskkatzy: true,
  },
  {
    key: 'campaign-brief',
    title: 'Campaign brief',
    tag: 'Brief automation',
    brand: 'stream',
    section: 'stream-elements',
    templateId: 'campaign-brief',
    showInAskkatzy: true,
  },
  {
    key: 'design-sprints',
    title: 'Design Sprints prototyping',
    tag: 'Rapid prototyping',
    brand: 'red',
    section: 'red',
    templateId: 'design-sprints',
    showInAskkatzy: true,
  },
  {
    key: 'squarefish',
    title: 'SquareFish',
    tag: 'Mobile game',
    brand: 'squarefish',
    section: 'red',
    templateId: 'squarefish',
    showInAskkatzy: true,
  },
  {
    key: 'pickme-eyal',
    title: 'PickMe {name}',
    pickMeName: 'name',
    tag: 'Jobs compete for you!',
    brand: 'pickme',
    section: 'self-initiated',
    templateId: 'pickme',
    showInAskkatzy: true,
  },
]

export const CASE_STUDY_SECTIONS = [
  { id: 'stream-elements', label: 'Stream Elements' },
  { id: 'red', label: 'RED' },
  { id: 'self-initiated', label: 'Self initiated' },
]

const BUILT_IN_CASE_STUDY_KEYS = new Set([
  'creators-spons',
  'graptap',
  'boss-ai',
  'campaign-brief',
  'design-sprints',
  'squarefish',
  'pickme-eyal',
])

/** Dev scratch entries — removed from catalog + localStorage on load. */
const SCRATCH_CASE_STUDY_KEY_PATTERN = /^my-new-case-study(-\d+)?$/

/** Figma import smoke tests — title "Test" slugifies to `test`. */
const TEST_CASE_STUDY_KEY_PATTERN = /^test(-\d+)?$/

const MACHON_NOAM_CASE_STUDY_KEY_PATTERN = /^machon-noam(-\d+)?$/i

const EE_CASE_STUDY_KEY_PATTERN = /^ee(-\d+)?$/i

/** Dev scratch entries removed on catalog load. */
const DISCARDED_CASE_STUDY_KEYS = new Set(['tes', 'asdcas'])

function isScratchCaseStudyEntry(entry) {
  if (!entry) return false
  if (entry.key && BUILT_IN_CASE_STUDY_KEYS.has(entry.key)) return false
  const title = `${entry.title ?? ''}`.trim().toLowerCase()
  if (title === 'my new case study') return true
  return SCRATCH_CASE_STUDY_KEY_PATTERN.test(`${entry.key ?? ''}`)
}

function purgeScratchCaseStudies() {
  let removed = false

  for (let i = MANAGED_CASE_STUDIES.length - 1; i >= 0; i -= 1) {
    if (isScratchCaseStudyEntry(MANAGED_CASE_STUDIES[i])) {
      MANAGED_CASE_STUDIES.splice(i, 1)
      removed = true
    }
  }

  const overrides = readPersistedCaseStudyOverrides()
  for (const key of Object.keys(overrides)) {
    const patch = overrides[key]
    if (!isScratchCaseStudyEntry({ key, ...patch })) continue
    delete overrides[key]
    removed = true
  }

  if (removed) writePersistedCaseStudyOverrides(overrides)
  return removed
}

function isTestCaseStudyKey(key) {
  return TEST_CASE_STUDY_KEY_PATTERN.test(`${key ?? ''}`)
}

export function purgeTestCaseStudies() {
  let removed = false

  for (let i = MANAGED_CASE_STUDIES.length - 1; i >= 0; i -= 1) {
    const entry = MANAGED_CASE_STUDIES[i]
    if (!isTestCaseStudyKey(entry?.key)) continue
    MANAGED_CASE_STUDIES.splice(i, 1)
    removed = true
  }

  const overrides = readPersistedCaseStudyOverrides()
  for (const key of Object.keys(overrides)) {
    if (!isTestCaseStudyKey(key)) continue
    delete overrides[key]
    removed = true
  }

  if (removed) writePersistedCaseStudyOverrides(overrides)
  return removed
}

function isMachonNoamCaseStudyEntry(entry) {
  if (!entry) return false
  if (entry.key && BUILT_IN_CASE_STUDY_KEYS.has(entry.key)) return false
  const title = `${entry.title ?? ''}`.trim().toLowerCase()
  if (title === 'machon noam') return true
  return MACHON_NOAM_CASE_STUDY_KEY_PATTERN.test(`${entry.key ?? ''}`)
}

export function purgeMachonNoamCaseStudies() {
  let removed = false

  for (let i = MANAGED_CASE_STUDIES.length - 1; i >= 0; i -= 1) {
    if (!isMachonNoamCaseStudyEntry(MANAGED_CASE_STUDIES[i])) continue
    MANAGED_CASE_STUDIES.splice(i, 1)
    removed = true
  }

  const overrides = readPersistedCaseStudyOverrides()
  for (const key of Object.keys(overrides)) {
    const patch = overrides[key]
    if (!isMachonNoamCaseStudyEntry({ key, ...patch })) continue
    delete overrides[key]
    removed = true
  }

  if (removed) writePersistedCaseStudyOverrides(overrides)
  return removed
}

function isEeCaseStudyEntry(entry) {
  if (!entry) return false
  if (entry.key && BUILT_IN_CASE_STUDY_KEYS.has(entry.key)) return false
  const title = `${entry.title ?? ''}`.trim().toLowerCase()
  if (title === 'ee') return true
  return EE_CASE_STUDY_KEY_PATTERN.test(`${entry.key ?? ''}`)
}

export function purgeEeCaseStudies() {
  let removed = false

  for (let i = MANAGED_CASE_STUDIES.length - 1; i >= 0; i -= 1) {
    if (!isEeCaseStudyEntry(MANAGED_CASE_STUDIES[i])) continue
    MANAGED_CASE_STUDIES.splice(i, 1)
    removed = true
  }

  const overrides = readPersistedCaseStudyOverrides()
  for (const key of Object.keys(overrides)) {
    const patch = overrides[key]
    if (!isEeCaseStudyEntry({ key, ...patch })) continue
    delete overrides[key]
    removed = true
  }

  if (removed) writePersistedCaseStudyOverrides(overrides)
  return removed
}

function isDiscardedCaseStudyEntry(entry) {
  if (!entry) return false
  if (entry.key && BUILT_IN_CASE_STUDY_KEYS.has(entry.key)) return false
  return DISCARDED_CASE_STUDY_KEYS.has(`${entry.key ?? ''}`)
}

export function purgeDiscardedCaseStudies() {
  let removed = false

  for (let i = MANAGED_CASE_STUDIES.length - 1; i >= 0; i -= 1) {
    if (!isDiscardedCaseStudyEntry(MANAGED_CASE_STUDIES[i])) continue
    MANAGED_CASE_STUDIES.splice(i, 1)
    removed = true
  }

  const overrides = readPersistedCaseStudyOverrides()
  for (const key of Object.keys(overrides)) {
    if (!DISCARDED_CASE_STUDY_KEYS.has(key)) continue
    delete overrides[key]
    removed = true
  }

  if (removed) writePersistedCaseStudyOverrides(overrides)
  return removed
}

export function getManagedCaseStudyByKey(key) {
  return MANAGED_CASE_STUDIES.find((entry) => entry.key === key) ?? null
}

/** @deprecated Use MANAGED_CASE_STUDIES — same array reference as the homepage grid. */
export const PROJECT_CARDS = MANAGED_CASE_STUDIES

export async function applyManagedCaseStudyForm(form) {
  const entry = getManagedCaseStudyByKey(form.catalogKey)
  if (!entry) return null

  const patch = await buildCatalogPatchFromForm(form)
  Object.assign(entry, patch)
  syncPickMeCatalogEntry(entry)

  const overrides = readPersistedCaseStudyOverrides()
  overrides[form.catalogKey] = patch
  writePersistedCaseStudyOverrides(overrides)
  notifyCaseStudyCatalogChanged()
  return patch
}

export async function createManagedCaseStudyFromForm(form) {
  const patch = await buildCatalogPatchFromForm(form)

  if (!form.catalogKey) {
    if (!patch.tag?.trim()) patch.tag = NEW_CASE_STUDY_DEFAULT_TAG
  }

  if (!patch.title?.trim() || !patch.tag?.trim()) return null

  const baseKey = slugifyTitle(patch.title) || 'new-case-study'
  let key = baseKey
  let suffix = 2
  while (getManagedCaseStudyByKey(key)) {
    key = `${baseKey}-${suffix}`
    suffix += 1
  }

  const entry = { key, ...patch }
  syncPickMeCatalogEntry(entry)
  MANAGED_CASE_STUDIES.push(entry)

  const overrides = readPersistedCaseStudyOverrides()
  overrides[key] = patch
  writePersistedCaseStudyOverrides(overrides)
  notifyCaseStudyCatalogChanged()
  return key
}

export function hydrateCatalogFromPersistedOverrides() {
  const overrides = readPersistedCaseStudyOverrides()
  let overridesChanged = false

  for (const [key, patch] of Object.entries(overrides)) {
    if (!patch || typeof patch !== 'object') continue

    const entry = getManagedCaseStudyByKey(key)
    if (!entry) {
      const created = { key, ...patch }
      if (migrateLegacyPickMeEyal(created)) {
        overrides[key] = { ...patch, pickMeName: 'name', title: 'PickMe {name}' }
        overridesChanged = true
      } else {
        syncPickMeCatalogEntry(created)
      }
      MANAGED_CASE_STUDIES.push(created)
      continue
    }

    Object.assign(entry, patch)
    if (migrateLegacyPickMeEyal(entry)) {
      overrides[key] = { ...patch, pickMeName: 'name', title: 'PickMe {name}' }
      overridesChanged = true
    } else {
      syncPickMeCatalogEntry(entry)
    }
  }

  let catalogChanged = false
  if (purgeScratchCaseStudies()) catalogChanged = true
  if (purgeTestCaseStudies()) catalogChanged = true
  if (purgeMachonNoamCaseStudies()) catalogChanged = true
  if (purgeEeCaseStudies()) catalogChanged = true
  if (purgeDiscardedCaseStudies()) catalogChanged = true

  MANAGED_CASE_STUDIES.forEach((entry) => {
    if (!overrides[entry.key] && migrateLegacyPickMeEyal(entry)) {
      overridesChanged = true
      return
    }
    syncPickMeCatalogEntry(entry)
  })

  if (overridesChanged) writePersistedCaseStudyOverrides(overrides)
  if (catalogChanged || overridesChanged) notifyCaseStudyCatalogChanged()
}

/** Snapshot of catalog entries — pass `catalogRevision` to re-read after saves. */
export function listManagedCaseStudies(_catalogRevision = 0) {
  void _catalogRevision
  return MANAGED_CASE_STUDIES
}

hydrateCatalogFromPersistedOverrides()
purgeScratchCaseStudies()
purgeTestCaseStudies()
purgeMachonNoamCaseStudies()
purgeEeCaseStudies()
purgeDiscardedCaseStudies()

/** @param {import('./caseStudiesCatalog.js').MANAGED_CASE_STUDIES[number] | null} entry */
export function createEditorFormState(entry) {
  if (!entry) {
    const theme = getTemplateThemeDefaults('new')
    return {
      catalogKey: null,
      basedOnKey: null,
      basedOnTitle: null,
      templateId: 'new',
      title: '',
      pickMeName: '',
      tag: '',
      section: '',
      brand: 'stream',
      hoverTheme: theme.hoverTheme,
      hoverBorderColor: theme.hoverBorderColor,
      hoverHaloColor: theme.hoverHaloColor,
      hoverThemeOpacity: theme.hoverThemeOpacity,
      hoverBorderOpacity: theme.hoverBorderOpacity,
      hoverHaloOpacity: theme.hoverHaloOpacity,
      figmaLink: '',
      showInAskkatzy: false,
      assets: getTemplateSampleAssets('new'),
    }
  }

  const theme = getManagedCaseStudyTheme(entry)

  const form = {
    catalogKey: entry.key,
    basedOnKey: null,
    basedOnTitle: null,
    templateId: entry.templateId,
    title: entry.title,
    pickMeName: entry.templateId === 'pickme' ? getPickMeName(entry) : '',
    tag: entry.tag,
    section: entry.section,
    brand: entry.brand,
    hoverTheme: theme.hoverTheme,
    hoverBorderColor: theme.hoverBorderColor,
    hoverHaloColor: theme.hoverHaloColor,
    hoverThemeOpacity: theme.hoverThemeOpacity,
    hoverBorderOpacity: theme.hoverBorderOpacity,
    hoverHaloOpacity: theme.hoverHaloOpacity,
    figmaLink: entry.figmaLink ?? '',
    showInAskkatzy: isCaseStudyVisibleOnHomepage(entry),
    assets: getManagedCaseStudyAssets(entry),
  }

  return entry.templateId === 'pickme' ? normalizePickMeFormFields(form) : form
}

/** New case study seeded from an existing card’s template + defaults */
export function createEditorFormStateFromTemplate(sourceEntry, options = {}) {
  const theme = getTemplateThemeDefaults(sourceEntry.templateId)
  const figmaLink = (options.figmaLink ?? '').trim()

  return {
    catalogKey: null,
    basedOnKey: sourceEntry.key,
    basedOnTitle: sourceEntry.title,
    templateId: sourceEntry.templateId,
    title: '',
    pickMeName: '',
    tag: '',
    section: sourceEntry.section,
    brand: sourceEntry.brand,
    hoverTheme: theme.hoverTheme,
    hoverBorderColor: theme.hoverBorderColor,
    hoverHaloColor: theme.hoverHaloColor,
    hoverThemeOpacity: theme.hoverThemeOpacity,
    hoverBorderOpacity: theme.hoverBorderOpacity,
    hoverHaloOpacity: theme.hoverHaloOpacity,
    figmaLink,
    showInAskkatzy: false,
    assets: getTemplateSampleAssets(sourceEntry.templateId),
  }
}
