import {
  createEditorFormState,
  createEditorFormStateFromTemplate,
  getManagedCaseStudyByKey,
} from '../caseStudiesCatalog.js'
import { getTemplateById } from '../thumbDesignerSchema.js'
import { getTemplateSampleAssets } from '../thumbDesignerSampleAssets.js'

async function fetchProxiedAsset(url) {
  const proxyUrl = `/api/figma/asset?url=${encodeURIComponent(url)}`
  const response = await fetch(proxyUrl)
  if (!response.ok) throw new Error('Could not download an asset from Figma.')
  const blob = await response.blob()
  const fileName =
    response.headers.get('x-figma-file-name') ??
    (url.includes('.svg') ? 'figma-asset.svg' : 'figma-asset.png')
  const file = new File([blob], fileName, {
    type: blob.type || (fileName.endsWith('.svg') ? 'image/svg+xml' : 'image/png'),
  })
  return {
    file,
    previewUrl: URL.createObjectURL(file),
    sampleFileName: fileName,
  }
}

function mergeColorsIntoForm(form, colors) {
  if (!colors) return form
  const next = { ...form }

  if (colors.hoverTheme) {
    next.hoverTheme = colors.hoverTheme
    next.hoverThemeOpacity = colors.hoverThemeOpacity ?? 100
  }
  if (colors.hoverBorderColor) {
    next.hoverBorderColor = colors.hoverBorderColor
    next.hoverBorderOpacity = colors.hoverBorderOpacity ?? 100
  }
  if (colors.hoverHaloColor) {
    next.hoverHaloColor = colors.hoverHaloColor
    next.hoverHaloOpacity = colors.hoverHaloOpacity ?? 20
  }

  return next
}

function pickImportAssetForSlot(assets, slot) {
  const matches = (assets ?? []).filter((asset) => asset?.slot === slot)
  if (matches.length <= 1) return matches[0] ?? null
  return matches.find((asset) => asset.variant === 'idle') ?? matches[0]
}

function importAssetsBySlot(importAssets) {
  const slots = [...new Set((importAssets ?? []).map((asset) => asset?.slot).filter(Boolean))]
  return Object.fromEntries(
    slots.map((slot) => [slot, pickImportAssetForSlot(importAssets, slot)]),
  )
}

function mergeCopyIntoForm(form, copy) {
  if (!copy) return form
  return {
    ...form,
    title: copy.title?.trim() ? copy.title.trim() : form.title,
    tag: copy.tag?.trim() ? copy.tag.trim() : form.tag,
  }
}

/**
 * @param {import('../caseStudiesCatalog.js').createEditorFormState extends Function ? ReturnType<createEditorFormState> : object} baseForm
 * @param {object} importResult — `/api/figma/import` JSON
 * @param {string} figmaLink
 */
export async function applyFigmaImportToEditorForm(baseForm, importResult, figmaLink) {
  const link = figmaLink.trim()
  let form = baseForm

  if (importResult.catalogKey) {
    const entry = getManagedCaseStudyByKey(importResult.catalogKey)
    if (entry) {
      form = createEditorFormStateFromTemplate(entry, { figmaLink: link })
      form.basedOnTitle = entry.title
    }
  } else {
    form = { ...createEditorFormState(null), figmaLink: link }
  }

  const template = getTemplateById(importResult.templateId ?? 'new')
  form.templateId = importResult.templateId ?? form.templateId
  if (template.section) form.section = template.section
  if (template.brand) form.brand = template.brand
  if (importResult.templateId && importResult.templateId !== 'new') {
    form.assets = getTemplateSampleAssets(importResult.templateId)
  } else if (importResult.templateId === 'new') {
    const { center: _sampleCenter, ...restSamples } = getTemplateSampleAssets('new')
    form.assets = { ...restSamples, ...form.assets }
  }

  form = mergeColorsIntoForm(form, importResult.colors)
  form = mergeCopyIntoForm(form, importResult.copy)

  const assetsBySlot = importAssetsBySlot(importResult.assets)
  if (Object.keys(assetsBySlot).length) {
    const nextAssets = { ...form.assets }
    for (const [slot, asset] of Object.entries(assetsBySlot)) {
      const assetUrl = asset?.url ?? asset?.mcpUrl
      if (!assetUrl) continue
      try {
        const downloaded = await fetchProxiedAsset(assetUrl)
        const usesMonochromeHover =
          template.kind === 'new' && asset.variant !== 'hover'
        nextAssets[slot] = {
          ...downloaded,
          monochromeHover: usesMonochromeHover,
        }
      } catch {
        /* keep sample slot if download fails */
      }
    }
    form = { ...form, assets: nextAssets }
  }

  form.figmaLink = link
  return form
}
