import { createEditorFormState, normalizePickMeFormFields } from './caseStudiesCatalog.js'
import { getTemplateSampleAssets } from './thumbDesignerSampleAssets.js'

const DRAFT_STORAGE_KEY = 'askkatzy-thumb-designer-editor-draft'

function readDraft() {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function loadThumbDesignerEditorDraft() {
  const draft = readDraft()
  if (!draft || draft.screen !== 'editor') return null

  const base = createEditorFormState(null)
  const templateId = draft.form?.templateId ?? 'new'
  const samples = getTemplateSampleAssets(templateId)

  return {
    screen: 'editor',
    editorMode: draft.editorMode ?? 'create',
    figmaCursorModalOpen: draft.figmaCursorModalOpen === true,
    form: normalizePickMeFormFields({
      ...base,
      ...draft.form,
      assets: { ...samples, ...(draft.form?.assets ?? {}) },
    }),
    savedFormSnapshot: draft.savedFormSnapshot ?? null,
    createEditorTouched: draft.createEditorTouched === true,
  }
}

export function saveThumbDesignerEditorDraft({
  screen,
  editorMode,
  form,
  savedFormSnapshot,
  createEditorTouched,
  figmaCursorModalOpen,
}) {
  if (typeof sessionStorage === 'undefined' || screen !== 'editor') return

  sessionStorage.setItem(
    DRAFT_STORAGE_KEY,
    JSON.stringify({
      screen,
      editorMode,
      figmaCursorModalOpen,
      createEditorTouched,
      savedFormSnapshot,
      form: {
        catalogKey: form.catalogKey,
        basedOnKey: form.basedOnKey,
        basedOnTitle: form.basedOnTitle,
        templateId: form.templateId,
        title: form.title,
        pickMeName: form.pickMeName,
        tag: form.tag,
        section: form.section,
        brand: form.brand,
        hoverTheme: form.hoverTheme,
        hoverBorderColor: form.hoverBorderColor,
        hoverHaloColor: form.hoverHaloColor,
        hoverThemeOpacity: form.hoverThemeOpacity,
        hoverBorderOpacity: form.hoverBorderOpacity,
        hoverHaloOpacity: form.hoverHaloOpacity,
        figmaLink: form.figmaLink,
        showInAskkatzy: form.showInAskkatzy,
        assets: {},
      },
    }),
  )
}

export function clearThumbDesignerEditorDraft() {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.removeItem(DRAFT_STORAGE_KEY)
}
