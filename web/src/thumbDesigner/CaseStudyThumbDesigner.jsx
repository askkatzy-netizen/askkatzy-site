import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import caseStudyDefault from '../assets/CaseStudy_default.svg'
import { CaseStudiesManagerGrid } from './CaseStudiesManagerGrid.jsx'
import { EditorToolHeader } from './EditorToolHeader.jsx'
import { ThumbDesignerPreview } from './ThumbDesignerPreview.jsx'
import {
  applyManagedCaseStudyForm,
  createEditorFormState,
  createEditorFormStateFromTemplate,
  createManagedCaseStudyFromForm,
  formatPickMeTitle,
  getManagedCaseStudyAssets,
  getManagedCaseStudyByKey,
  getPickMeDisplayTitle,
  getPickMeName,
  hydrateCatalogFromPersistedOverrides,
  normalizePickMeFormFields,
  serializeEditorFormForCompare,
} from './caseStudiesCatalog.js'
import { buildFigmaLinkForCatalogKey } from './figmaCaseStudyLinks.js'
import { applyFigmaImportToEditorForm } from './figma/figmaImportMapper.js'
import { FigmaCursorImportModal } from './FigmaCursorImportModal.jsx'
import {
  hasUsableFigmaImportPayload,
  waitForMinAnalyzingDuration,
} from './figma/figmaCursorImportFlow.js'
import { resetCursorFigmaImport, subscribeCursorFigmaImport } from './figma/figmaCursorImportClient.js'
import {
  clearThumbDesignerEditorDraft,
  loadThumbDesignerEditorDraft,
  saveThumbDesignerEditorDraft,
} from './thumbDesignerEditorDraft.js'
import {
  CASE_CARD_DRAWER_CLOSE_SETTLE_MS,
  CASE_CARD_DRAWER_DELAY_MS,
  CASE_STUDY_CARD_MAX_WIDTH_PX,
  getTemplateById,
  hexToRgb,
  clampOpacityPercent,
  normalizeHexColor,
  resolveThemeColors,
  validateThumbDesignerForm,
  CAMPAIGN_BRIEF_VECTOR_KEYS,
  CASE_STUDY_CARD_EDITOR_LABEL,
  DESIGN_SPRINTS_STICKER_KEYS,
  EDITOR_TOOL_SCREEN,
} from './thumbDesignerSchema.js'
import { THUMB_ACCENT } from './thumbDesignerTokens.js'
import { useCaseStudyCatalogRevision } from './useCaseStudyCatalogRevision.js'
import { getTemplateSampleAssets } from './thumbDesignerSampleAssets.js'

const NEW_CASE_STUDY_TAG_HINT = 'Keep it short'
const THUMB_DESIGNER_SAVE_LABEL = 'Save'

function isNewCaseStudyForm(form) {
  return !form.catalogKey
}

function revokeAssetPreview(asset) {
  if (asset?.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(asset.previewUrl)
}

function revokeAllAssets(assets) {
  Object.values(assets ?? {}).forEach((entry) => {
    if (Array.isArray(entry)) entry.forEach((item) => revokeAssetPreview(item))
    else revokeAssetPreview(entry)
  })
}

function assetDisplayName(asset) {
  return asset?.file?.name ?? asset?.sampleFileName ?? null
}

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-[13px] font-medium text-black/70">{children}</label>
  )
}

function ShowInAskkatzyField({ checked, onChange }) {
  return (
    <label className="thumb-designer-show-askkatzy-field flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="thumb-designer-show-askkatzy-checkbox size-4 shrink-0 cursor-pointer rounded border border-black/20 bg-white"
      />
      <span className="whitespace-nowrap">Active</span>
    </label>
  )
}

function FormSection({ title, headerAction, children, className = '' }) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-poppins text-[16px] font-bold leading-none text-black/90">{title}</h2>
        {headerAction}
      </div>
      {children}
    </section>
  )
}

function TextInput({ value, onChange, placeholder, id, type = 'text', min, max, step, className = '' }) {
  return (
    <input
      id={id}
      type={type}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`thumb-designer-field ${className}`}
    />
  )
}

const OPACITY_STEP = 10

function StepperTriangle({ up }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="currentColor"
      aria-hidden
      className={up ? '' : 'rotate-180'}
    >
      <path d="M1 4.25 4 0.75 7 4.25" />
    </svg>
  )
}

function PercentStepperInput({ value, onChange }) {
  const applyDelta = (delta) => {
    const current = clampOpacityPercent(value)
    onChange(String(Math.min(100, Math.max(0, current + delta))))
  }

  return (
    <div className="flex h-[46px] w-[96px] shrink-0 items-stretch overflow-hidden rounded-xl border border-black/15 bg-white">
      <div className="flex min-w-0 flex-1 items-center pl-3">
        <div className="flex items-center gap-[2px]">
          <input
            type="number"
            min={0}
            max={100}
            step={OPACITY_STEP}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="field-sizing-content w-auto min-w-[1.5ch] max-w-[3ch] border-0 bg-transparent p-0 text-right text-[14px] tabular-nums text-black/90 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
          <span className="text-[14px] font-medium leading-none text-black/50">%</span>
        </div>
      </div>
      <div className="group/stepper flex w-[26px] shrink-0 flex-col bg-transparent transition-colors hover:bg-black/[0.04]">
        <button
          type="button"
          onClick={() => applyDelta(OPACITY_STEP)}
          className="flex flex-1 items-center justify-center text-black/30 transition-colors group-hover/stepper:text-black/45 hover:bg-black/[0.06] hover:text-black/70"
          aria-label="Increase opacity by 10"
        >
          <StepperTriangle up />
        </button>
        <div className="h-px shrink-0 bg-transparent transition-colors group-hover/stepper:bg-black/10" aria-hidden />
        <button
          type="button"
          onClick={() => applyDelta(-OPACITY_STEP)}
          className="flex flex-1 items-center justify-center text-black/30 transition-colors group-hover/stepper:text-black/45 hover:bg-black/[0.06] hover:text-black/70"
          aria-label="Decrease opacity by 10"
        >
          <StepperTriangle up={false} />
        </button>
      </div>
    </div>
  )
}

function ColorSwatchPicker({ label, value, onChange, swatchStyle }) {
  const normalized = normalizeHexColor(value) || THUMB_ACCENT
  return (
    <div className="relative h-[46px] w-[52px] shrink-0">
      <div
        className="pointer-events-none flex h-full w-full rounded-xl border border-black/15 bg-white p-1"
        aria-hidden
      >
        <div
          className="h-full min-h-0 w-full flex-1 rounded-[6px] border border-black/10 bg-white"
          style={swatchStyle}
        />
      </div>
      <input
        type="color"
        value={normalized}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={`${label} picker`}
      />
    </div>
  )
}

function CopyTextField({ label, id, value, onChange, placeholder }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <TextInput id={id} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

function ThemeColorField({
  label,
  colorValue,
  onColorChange,
  opacityValue,
  onOpacityChange,
  opacityFallback = 20,
}) {
  const normalized = normalizeHexColor(colorValue) || THUMB_ACCENT
  const rgb = hexToRgb(normalized)
  const opacity = clampOpacityPercent(opacityValue, opacityFallback)
  const fadedSwatchStyle = rgb
    ? { backgroundColor: `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${opacity}%)` }
    : { backgroundColor: `rgb(43 0 255 / ${opacityFallback}%)` }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap items-center gap-2">
        <ColorSwatchPicker
          label={label}
          value={colorValue}
          onChange={onColorChange}
          swatchStyle={fadedSwatchStyle}
        />
        <TextInput
          value={colorValue}
          onChange={onColorChange}
          placeholder={THUMB_ACCENT}
          className="min-w-0 flex-1"
        />
        <PercentStepperInput value={opacityValue} onChange={onOpacityChange} />
      </div>
    </div>
  )
}

const EXTRA_ASSET_ACCEPT = 'image/*,.svg,image/gif,image/webp'

function getPrimaryAssetSlotDefs(template, templateId) {
  switch (template.kind) {
    case 'single-logo':
      return [{ key: 'logo', accept: 'image/*,.svg' }]
    case 'center-mark':
      if (templateId === 'graptap') {
        return [
          { key: 'center', accept: 'image/*,.svg' },
          { key: 'background', accept: 'image/*,.svg,image/gif,image/webp' },
        ]
      }
      if (templateId === 'campaign-brief') {
        return [
          { key: 'center', accept: 'image/*,.svg' },
          ...CAMPAIGN_BRIEF_VECTOR_KEYS.map((key) => ({ key, accept: 'image/*,.svg' })),
        ]
      }
      if (templateId === 'boss-ai') {
        return [
          { key: 'sparkle', accept: 'image/*,.svg' },
          { key: 'background', accept: 'image/*,.svg' },
          { key: 'backgroundSecondary', accept: 'image/*,.svg' },
        ]
      }
      return [{ key: 'center', accept: 'image/*,.svg' }]
    case 'design-sprints':
      return [
        { key: 'center', accept: 'image/*,.svg' },
        ...DESIGN_SPRINTS_STICKER_KEYS.map((key) => ({ key, accept: 'image/*,.svg' })),
      ]
    case 'dual-image':
      return [
        { key: 'idle', accept: 'image/*,.gif,.webp' },
        { key: 'hover', accept: 'image/*,.gif,.webp' },
        { key: 'bubble', accept: 'image/*,.svg' },
      ]
    case 'new':
      return [{ key: 'center', accept: 'image/*,.svg,image/gif,image/webp' }]
    default:
      return []
  }
}

function countVisibleAssetFields(template, templateId, assets) {
  const dismissed = new Set(assets?.dismissedSlots ?? [])
  const primaryCount = getPrimaryAssetSlotDefs(template, templateId).filter(
    (slot) => !dismissed.has(slot.key),
  ).length
  return primaryCount + (assets?.extra ?? []).length
}

function UploadFieldPreview({ previewUrl, alt = 'Asset preview' }) {
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white"
      aria-hidden={!previewUrl}
    >
      {previewUrl ? (
        <img src={previewUrl} alt={alt} className="max-h-full max-w-full object-contain p-1" />
      ) : (
        <span className="text-[11px] font-medium text-black/25">—</span>
      )}
    </span>
  )
}

function AssetFileUpload({ showRemove, onRemove, accept, fileName, previewUrl, onFile }) {
  const removable = showRemove && onRemove

  return (
    <div
      className={
        removable
          ? 'thumb-designer-asset-field thumb-designer-asset-field--removable'
          : 'thumb-designer-asset-field'
      }
    >
      <label className="thumb-designer-upload">
        <UploadFieldPreview previewUrl={previewUrl} alt={fileName ?? 'Asset preview'} />
        <span className="thumb-designer-upload__label">
          {fileName ? fileName : 'Click to upload PNG, SVG, GIF, or WebP'}
        </span>
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            onFile(file)
            e.target.value = ''
          }}
        />
      </label>
      {removable ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onRemove()
          }}
          className="thumb-designer-asset-remove thumb-designer-icon-btn"
          aria-label="Remove asset"
        >
          <svg
            className="block size-4 min-h-4 min-w-4"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4.25 4.25l7.5 7.5M11.75 4.25l-7.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  )
}

export function CaseStudyThumbDesigner() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = CASE_STUDY_CARD_EDITOR_LABEL
    return () => {
      document.title = previousTitle
    }
  }, [])

  const restoredDraft = useMemo(() => loadThumbDesignerEditorDraft(), [])
  const [screen, setScreen] = useState(restoredDraft?.screen ?? EDITOR_TOOL_SCREEN.GRID)
  const [editorMode, setEditorMode] = useState(restoredDraft?.editorMode ?? 'create')
  const [form, setForm] = useState(() => restoredDraft?.form ?? createEditorFormState(null))
  const [savedFormSnapshot, setSavedFormSnapshot] = useState(restoredDraft?.savedFormSnapshot ?? null)
  const [createEditorTouched, setCreateEditorTouched] = useState(
    restoredDraft?.createEditorTouched ?? false,
  )
  const [figmaCursorModalOpen, setFigmaCursorModalOpen] = useState(
    restoredDraft?.figmaCursorModalOpen ?? false,
  )
  const [figmaImportPhase, setFigmaImportPhase] = useState('prompt')
  const catalogRevision = useCaseStudyCatalogRevision()

  useEffect(() => {
    hydrateCatalogFromPersistedOverrides()
  }, [catalogRevision])

  const [previewHover, setPreviewHover] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerClosing, setDrawerClosing] = useState(false)
  const hoverDrawerTimerRef = useRef(null)
  const closingDrawerTimerRef = useRef(null)

  const template = getTemplateById(form.templateId)
  const isNewCaseStudy = isNewCaseStudyForm(form)
  const isNewFromScratch = form.templateId === 'new' && isNewCaseStudy
  const showAssetRemove = useMemo(
    () => countVisibleAssetFields(template, form.templateId, form.assets) > 1,
    [template, form.templateId, form.assets],
  )
  const brandThumbClass = template.thumbClass
  const resolvedTheme = useMemo(() => resolveThemeColors(form), [form])
  const isFormDirty = useMemo(() => {
    if (savedFormSnapshot === null) return false
    return serializeEditorFormForCompare(form) !== savedFormSnapshot
  }, [form, savedFormSnapshot])
  const canSaveCaseStudy = useMemo(() => {
    if (editorMode === 'edit' || savedFormSnapshot === null) return false
    return createEditorTouched || isFormDirty
  }, [editorMode, createEditorTouched, isFormDirty, savedFormSnapshot])
  const savedEditorTitle =
    editorMode === 'edit' && form.catalogKey
      ? (() => {
          const entry = getManagedCaseStudyByKey(form.catalogKey)
          if (!entry) return null
          return entry.templateId === 'pickme' ? getPickMeDisplayTitle(entry) : entry.title
        })()
      : null
  const previewThemeStyle = useMemo(
    () => ({
      '--case-hover-border': resolvedTheme.hoverBorder,
      '--case-hover-halo': resolvedTheme.hoverHalo,
      '--case-hover-surface': resolvedTheme.hoverSurface,
    }),
    [resolvedTheme],
  )

  const markCreateEditorTouched = useCallback(() => {
    if (editorMode !== 'edit') setCreateEditorTouched(true)
  }, [editorMode])

  const setField = useCallback(
    (key, value) => {
      markCreateEditorTouched()
      setForm((prev) => {
        const next = { ...prev, [key]: value }
        if (key === 'pickMeName' && prev.templateId === 'pickme') {
          next.title = formatPickMeTitle(value)
        }
        if (key === 'hoverTheme') {
          const theme = normalizeHexColor(value)
          if (theme) {
            next.hoverBorderColor = theme
            next.hoverHaloColor = theme
          }
        }
        return next
      })
    },
    [markCreateEditorTouched],
  )

  const setAsset = useCallback(
    (slot, file) => {
      markCreateEditorTouched()
      setForm((prev) => {
      const previous = prev.assets[slot]
      revokeAssetPreview(previous)
      const nextAssets = { ...prev.assets }
      if (!file) {
        delete nextAssets[slot]
      } else {
        nextAssets[slot] = { file, previewUrl: URL.createObjectURL(file) }
      }
      return { ...prev, assets: nextAssets }
    })
    },
    [markCreateEditorTouched],
  )

  const addExtraAsset = useCallback(() => {
    markCreateEditorTouched()
    setForm((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        extra: [...(prev.assets.extra ?? []), { id: Date.now(), file: null, previewUrl: null }],
      },
    }))
  }, [markCreateEditorTouched])

  const setExtraAsset = useCallback(
    (index, file) => {
      markCreateEditorTouched()
      setForm((prev) => {
      const extra = [...(prev.assets.extra ?? [])]
      const previous = extra[index]
      revokeAssetPreview(previous)
      extra[index] = file
        ? { id: extra[index]?.id ?? Date.now(), file, previewUrl: URL.createObjectURL(file) }
        : { id: extra[index]?.id ?? Date.now(), file: null, previewUrl: null }
      return { ...prev, assets: { ...prev.assets, extra } }
    })
    },
    [markCreateEditorTouched],
  )

  const removeExtraAsset = useCallback(
    (index) => {
      markCreateEditorTouched()
      setForm((prev) => {
      const extra = [...(prev.assets.extra ?? [])]
      revokeAssetPreview(extra[index])
      extra.splice(index, 1)
      return { ...prev, assets: { ...prev.assets, extra } }
    })
    },
    [markCreateEditorTouched],
  )

  const removePrimaryAssetSlot = useCallback(
    (slot) => {
      markCreateEditorTouched()
      setForm((prev) => {
        const dismissed = new Set(prev.assets.dismissedSlots ?? [])
        if (dismissed.has(slot)) return prev

        const previous = prev.assets[slot]
        revokeAssetPreview(previous)

        const nextAssets = { ...prev.assets }
        delete nextAssets[slot]
        dismissed.add(slot)
        nextAssets.dismissedSlots = [...dismissed]

        return { ...prev, assets: nextAssets }
      })
    },
    [markCreateEditorTouched],
  )

  useEffect(() => {
    return () => {
      revokeAllAssets(form.assets)
      if (hoverDrawerTimerRef.current) window.clearTimeout(hoverDrawerTimerRef.current)
      if (closingDrawerTimerRef.current) window.clearTimeout(closingDrawerTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!figmaCursorModalOpen || editorMode !== 'create') return undefined

    const sessionStartedAt = Date.now()
    let analyzingShownAt = null
    let appliedUpdatedAt = null
    let cancelled = false

    const applyCompleteImport = async (state) => {
      if (!hasUsableFigmaImportPayload(state.importResult)) {
        return
      }

      setFigmaImportPhase('analyzing')
      await waitForMinAnalyzingDuration(analyzingShownAt)

      const nextForm = await applyFigmaImportToEditorForm(
        createEditorFormState(null),
        state.importResult,
        state.figmaLink,
      )

      if (cancelled) return

      setForm((prev) => {
        revokeAllAssets(prev.assets)
        return nextForm
      })
      setSavedFormSnapshot(serializeEditorFormForCompare(nextForm))
      setCreateEditorTouched(true)
      setEditorMode(state.importResult.catalogKey ? 'create-from' : 'create')
      await resetCursorFigmaImport()
      setFigmaCursorModalOpen(false)
      setFigmaImportPhase('prompt')
    }

    const unsubscribe = subscribeCursorFigmaImport((state) => {
      if (cancelled) return

      const status = state?.status ?? 'idle'
      const updatedAt = state?.updatedAt ?? 0
      const isCurrentSession = updatedAt >= sessionStartedAt

      if (status === 'processing' && isCurrentSession) {
        analyzingShownAt = analyzingShownAt ?? Date.now()
        setFigmaImportPhase('analyzing')
        return
      }

      if (status === 'complete' && isCurrentSession) {
        if (!hasUsableFigmaImportPayload(state.importResult)) return
        if (appliedUpdatedAt === updatedAt) return
        appliedUpdatedAt = updatedAt
        analyzingShownAt = analyzingShownAt ?? Date.now()
        setFigmaImportPhase('analyzing')
        void applyCompleteImport(state)
        return
      }

      if (status === 'idle' && !analyzingShownAt) {
        setFigmaImportPhase('prompt')
      }
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [figmaCursorModalOpen, editorMode])

  useEffect(() => {
    if (screen !== EDITOR_TOOL_SCREEN.EDITOR) return
    saveThumbDesignerEditorDraft({
      screen,
      editorMode,
      form,
      savedFormSnapshot,
      createEditorTouched,
      figmaCursorModalOpen,
    })
  }, [screen, editorMode, form, savedFormSnapshot, createEditorTouched, figmaCursorModalOpen])

  const handlePreviewEnter = useCallback(() => {
    setPreviewHover(true)
    if (closingDrawerTimerRef.current) {
      window.clearTimeout(closingDrawerTimerRef.current)
      closingDrawerTimerRef.current = null
    }
    setDrawerClosing(false)
    if (hoverDrawerTimerRef.current) window.clearTimeout(hoverDrawerTimerRef.current)
    hoverDrawerTimerRef.current = window.setTimeout(() => {
      setDrawerOpen(true)
      hoverDrawerTimerRef.current = null
    }, CASE_CARD_DRAWER_DELAY_MS)
  }, [])

  const handlePreviewLeave = useCallback(() => {
    setPreviewHover(false)
    if (hoverDrawerTimerRef.current) {
      window.clearTimeout(hoverDrawerTimerRef.current)
      hoverDrawerTimerRef.current = null
    }
    setDrawerOpen((wasOpen) => {
      if (wasOpen) {
        setDrawerClosing(true)
        if (closingDrawerTimerRef.current) window.clearTimeout(closingDrawerTimerRef.current)
        closingDrawerTimerRef.current = window.setTimeout(() => {
          setDrawerClosing(false)
          closingDrawerTimerRef.current = null
        }, CASE_CARD_DRAWER_CLOSE_SETTLE_MS)
      }
      return false
    })
  }, [])

  const openCreateEditor = useCallback(async () => {
    await resetCursorFigmaImport()
    setFigmaImportPhase('prompt')
    const nextForm = createEditorFormState(null)
    const samples = getTemplateSampleAssets('new')
    nextForm.assets = { ...samples, ...nextForm.assets, center: nextForm.assets.center ?? samples.center }
    const snapshot = serializeEditorFormForCompare(nextForm)
    setForm(nextForm)
    setSavedFormSnapshot(snapshot)
    setCreateEditorTouched(false)
    setFigmaCursorModalOpen(true)
    setEditorMode('create')
    setScreen(EDITOR_TOOL_SCREEN.EDITOR)
    saveThumbDesignerEditorDraft({
      screen: EDITOR_TOOL_SCREEN.EDITOR,
      editorMode: 'create',
      form: nextForm,
      savedFormSnapshot: snapshot,
      createEditorTouched: false,
      figmaCursorModalOpen: true,
    })
  }, [])

  const openCreateFromTemplate = useCallback((catalogKey) => {
    const entry = getManagedCaseStudyByKey(catalogKey)
    if (!entry) return
    const nextForm = createEditorFormStateFromTemplate(entry, {
      figmaLink: buildFigmaLinkForCatalogKey(catalogKey),
    })
    setForm(nextForm)
    setSavedFormSnapshot(serializeEditorFormForCompare(nextForm))
    setCreateEditorTouched(false)
    setFigmaCursorModalOpen(false)
    setEditorMode('create-from')
    setScreen(EDITOR_TOOL_SCREEN.EDITOR)
  }, [])

  const openEditEditor = useCallback((catalogKey) => {
    const entry = getManagedCaseStudyByKey(catalogKey)
    if (!entry) return
    const nextForm = createEditorFormState(entry)
    setForm(nextForm)
    setSavedFormSnapshot(serializeEditorFormForCompare(nextForm))
    setCreateEditorTouched(false)
    setFigmaCursorModalOpen(false)
    setEditorMode('edit')
    setScreen(EDITOR_TOOL_SCREEN.EDITOR)
  }, [])

  const closeFigmaCursorModal = useCallback(() => {
    void resetCursorFigmaImport()
    setFigmaCursorModalOpen(false)
    setFigmaImportPhase('prompt')
  }, [])

  const handleSaveChanges = useCallback(async () => {
    if (editorMode !== 'edit' || !isFormDirty) return
    const patch = await applyManagedCaseStudyForm(form)
    if (!patch) return

    const savedEntry = getManagedCaseStudyByKey(form.catalogKey)
    const savedAssets = getManagedCaseStudyAssets(savedEntry)
    const nextForm = normalizePickMeFormFields({
      ...form,
      assets: savedAssets,
      title: savedEntry?.title ?? form.title,
      pickMeName: savedEntry ? getPickMeName(savedEntry) : form.pickMeName,
    })
    setForm(nextForm)
    setSavedFormSnapshot(serializeEditorFormForCompare(nextForm))
  }, [editorMode, form, isFormDirty])

  const backToGrid = useCallback(() => {
    setForm((prev) => {
      revokeAllAssets(prev.assets)
      return createEditorFormState(null)
    })
    setSavedFormSnapshot(null)
    setCreateEditorTouched(false)
    setFigmaCursorModalOpen(false)
    clearThumbDesignerEditorDraft()
    setPreviewHover(false)
    setDrawerOpen(false)
    setDrawerClosing(false)
    setScreen(EDITOR_TOOL_SCREEN.GRID)
  }, [])

  const handleSaveCaseStudy = useCallback(async () => {
    if (!canSaveCaseStudy) return
    const catalogKey = await createManagedCaseStudyFromForm(form)
    if (!catalogKey) return
    backToGrid()
  }, [canSaveCaseStudy, form, backToGrid])

  const renderExtraAssetFields = () =>
    (form.assets.extra ?? []).map((entry, index) => (
      <AssetFileUpload
        key={entry.id}
        showRemove={showAssetRemove}
        accept={EXTRA_ASSET_ACCEPT}
        fileName={assetDisplayName(entry)}
        previewUrl={entry?.previewUrl}
        onFile={(file) => setExtraAsset(index, file)}
        onRemove={() => removeExtraAsset(index)}
      />
    ))

  const renderPrimaryAssetFields = () => {
    const dismissed = new Set(form.assets.dismissedSlots ?? [])
    const slots = getPrimaryAssetSlotDefs(template, form.templateId).filter(
      (slot) => !dismissed.has(slot.key),
    )
    if (!slots.length) return null

    return slots.map(({ key, accept }) => {
      let previewUrl = form.assets[key]?.previewUrl
      let fileName = assetDisplayName(form.assets[key])

      if (template.kind === 'new' && key === 'center') {
        const defaultCenter = form.assets.center ?? getTemplateSampleAssets('new').center
        previewUrl = form.assets.center?.previewUrl ?? defaultCenter?.previewUrl ?? caseStudyDefault
        fileName =
          assetDisplayName(form.assets.center) ??
          assetDisplayName(defaultCenter) ??
          'CaseStudy_default.svg'
      }

      return (
        <AssetFileUpload
          key={key}
          showRemove={showAssetRemove}
          accept={accept}
          fileName={fileName}
          previewUrl={previewUrl}
          onFile={(file) => setAsset(key, file)}
          onRemove={() => removePrimaryAssetSlot(key)}
        />
      )
    })
  }


  return (
    <main className="thumb-designer-tool min-h-screen bg-white px-4 py-8 min-[901px]:px-16">
      <div
        className={`mx-auto w-full ${screen === EDITOR_TOOL_SCREEN.EDITOR ? 'max-w-[1200px]' : 'thumb-designer-grid-shell'}`}
      >
        <EditorToolHeader
          screen={screen}
          onBack={backToGrid}
          editorTitle={
            editorMode === 'edit'
              ? savedEditorTitle || 'Edit case study'
              : 'New case study'
          }
          editorSubtitle={
            editorMode === 'create-from' && form.basedOnTitle
              ? `Based on ${form.basedOnTitle}`
              : null
          }
          actions={
            screen === EDITOR_TOOL_SCREEN.EDITOR ? (
              <div className="thumb-designer-editor-actions">
                <ShowInAskkatzyField
                  checked={form.showInAskkatzy === true}
                  onChange={(value) => setField('showInAskkatzy', value)}
                />
                <button
                  type="button"
                  disabled={editorMode === 'edit' ? !isFormDirty : !canSaveCaseStudy}
                  onClick={editorMode === 'edit' ? handleSaveChanges : handleSaveCaseStudy}
                  className="thumb-designer-save-cta shrink-0"
                >
                  {THUMB_DESIGNER_SAVE_LABEL}
                </button>
              </div>
            ) : null
          }
        />

        {screen === EDITOR_TOOL_SCREEN.GRID ? (
          <CaseStudiesManagerGrid
            catalogRevision={catalogRevision}
            onEditCaseStudy={openEditEditor}
            onCreateCaseStudy={openCreateEditor}
            onCreateFromTemplate={openCreateFromTemplate}
          />
        ) : (
          <>
            <FigmaCursorImportModal
              open={figmaCursorModalOpen && editorMode === 'create'}
              phase={figmaImportPhase}
              onClose={closeFigmaCursorModal}
            />
            <div
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,var(--case-card-max-width))]"
              style={{ '--case-card-max-width': `${CASE_STUDY_CARD_MAX_WIDTH_PX}px` }}
            >
          <section className="thumb-designer-panel p-6 max-[900px]:p-4">
            <div className="divide-y divide-black/15">
            <FormSection title="Copy" className="pb-8">
              <div className="space-y-4">
                {template.id === 'pickme' ? (
                  <CopyTextField
                    label="Name"
                    id="thumb-pickme-name"
                    value={form.pickMeName ?? ''}
                    onChange={(v) => setField('pickMeName', v)}
                    placeholder="name"
                  />
                ) : (
                  <CopyTextField
                    label="Title"
                    id="thumb-title"
                    value={form.title}
                    onChange={(v) => setField('title', v)}
                    placeholder="e.g. My Product"
                  />
                )}
                <CopyTextField
                  label="Tag"
                  id="thumb-tag"
                  value={form.tag}
                  onChange={(v) => setField('tag', v)}
                  placeholder={isNewCaseStudy ? NEW_CASE_STUDY_TAG_HINT : 'Pill on thumbnail'}
                />
              </div>
            </FormSection>

            <FormSection title="Colors" className="py-8">
              <div className="space-y-4">
                <ThemeColorField
                  label="Theme"
                  colorValue={form.hoverTheme}
                  onColorChange={(v) => setField('hoverTheme', v)}
                  opacityValue={form.hoverThemeOpacity}
                  onOpacityChange={(v) => setField('hoverThemeOpacity', v)}
                  opacityFallback={100}
                />
                <ThemeColorField
                  label="Border"
                  colorValue={form.hoverBorderColor}
                  onColorChange={(v) => setField('hoverBorderColor', v)}
                  opacityValue={form.hoverBorderOpacity}
                  onOpacityChange={(v) => setField('hoverBorderOpacity', v)}
                  opacityFallback={100}
                />
                <ThemeColorField
                  label="Halo"
                  colorValue={form.hoverHaloColor}
                  onColorChange={(v) => setField('hoverHaloColor', v)}
                  opacityValue={form.hoverHaloOpacity}
                  onOpacityChange={(v) => setField('hoverHaloOpacity', v)}
                  opacityFallback={template.defaultHoverHaloOpacity ?? 20}
                />
              </div>
            </FormSection>

            <FormSection
              className="pt-8"
              title="Assets"
              headerAction={
                <button
                  type="button"
                  onClick={addExtraAsset}
                  className="thumb-designer-extra-add"
                  aria-label="Add asset"
                >
                  +
                </button>
              }
            >
              <div className="space-y-4">
                {renderPrimaryAssetFields()}
                {renderExtraAssetFields()}
              </div>
            </FormSection>
            </div>
          </section>

          <aside className="w-full max-w-[var(--case-card-max-width)] lg:sticky lg:top-8 lg:self-start">
            <ThumbDesignerPreview
              template={template}
              tag={form.tag || (isNewCaseStudy ? NEW_CASE_STUDY_TAG_HINT : 'Tag preview')}
              title={
                template.id === 'pickme'
                  ? formatPickMeTitle(form.pickMeName) || 'PickMe {name}'
                  : form.title || 'Title preview'
              }
              assets={form.assets}
              dismissedSlots={form.assets.dismissedSlots ?? []}
              previewHover={previewHover}
              drawerOpen={drawerOpen}
              drawerVisible={drawerOpen || drawerClosing}
              brandThumbClass={brandThumbClass}
              themeStyle={previewThemeStyle}
              onPreviewEnter={handlePreviewEnter}
              onPreviewLeave={handlePreviewLeave}
            />
          </aside>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
