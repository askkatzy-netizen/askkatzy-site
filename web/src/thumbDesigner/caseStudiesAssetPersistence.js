import { getTemplateSampleAssets } from './thumbDesignerSampleAssets.js'
import { resolvePickMeParticipantBySampleName } from './pickmeParticipants.js'

const CAMPAIGN_BRIEF_CENTER_SAMPLE = 'campaign-brief-center-lines.svg'

/** Fix saved slots that used brief5-preview for center or duplicated it in extras. */
export function repairCampaignBriefAssets(assets) {
  if (!assets || typeof assets !== 'object') return assets

  const samples = getTemplateSampleAssets('campaign-brief')
  const out = { ...assets }

  const centerName = out.center?.sampleFileName
  const centerIsWrong =
    !out.center ||
    out.center.isBuiltIn ||
    centerName === 'brief5-preview.svg' ||
    centerName === 'Lines icon (homepage default)'

  if (centerIsWrong) {
    out.center = samples.center
  }

  if (Array.isArray(out.extra)) {
    out.extra = out.extra.filter((entry) => entry?.sampleFileName !== 'brief5-preview.svg')
  }

  for (const key of ['vector1', 'vector2', 'vector3', 'vector4', 'vector5', 'vector6']) {
    if (!out[key] && samples[key]) out[key] = samples[key]
  }

  return out
}

const SAMPLE_TEMPLATE_IDS = [
  'creators-spons',
  'graptap',
  'boss-ai',
  'campaign-brief',
  'design-sprints',
  'squarefish',
  'pickme',
  'new',
]

/** @type {Record<string, string>} */
const SAMPLE_FILE_URLS = SAMPLE_TEMPLATE_IDS.reduce((map, templateId) => {
  const assets = getTemplateSampleAssets(templateId)
  for (const asset of Object.values(assets)) {
    if (asset?.sampleFileName) map[asset.sampleFileName] = asset.previewUrl
  }
  return map
}, {})

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function previewUrlToDataUrl(previewUrl) {
  if (previewUrl.startsWith('data:')) return previewUrl
  const response = await fetch(previewUrl)
  const blob = await response.blob()
  return fileToDataUrl(blob)
}

export function resolveSampleAssetByFileName(sampleFileName) {
  const pickmeParticipant = resolvePickMeParticipantBySampleName(sampleFileName)
  if (pickmeParticipant) {
    return {
      previewUrl: pickmeParticipant.logo,
      sampleFileName,
      isSample: true,
      file: null,
    }
  }
  const previewUrl = SAMPLE_FILE_URLS[sampleFileName]
  if (!previewUrl) return null
  return { previewUrl, sampleFileName, isSample: true, file: null }
}

/** @param {import('./thumbDesignerSampleAssets.js').ReturnType<typeof getTemplateSampleAssets>[string]} asset */
export async function serializeAssetForPersistence(asset) {
  if (!asset) return null

  if (asset.isSample && asset.sampleFileName) {
    return { isSample: true, sampleFileName: asset.sampleFileName }
  }

  const fileName = asset.file?.name ?? asset.sampleFileName ?? 'asset'

  const persistFlags =
    typeof asset.monochromeHover === 'boolean' ? { monochromeHover: asset.monochromeHover } : {}

  if (asset.file) {
    return { isSample: false, fileName, dataUrl: await fileToDataUrl(asset.file), ...persistFlags }
  }

  if (asset.previewUrl) {
    if (asset.previewUrl.startsWith('blob:') || asset.previewUrl.startsWith('data:')) {
      return {
        isSample: false,
        fileName,
        dataUrl: await previewUrlToDataUrl(asset.previewUrl),
        ...persistFlags,
      }
    }
    if (asset.sampleFileName && SAMPLE_FILE_URLS[asset.sampleFileName]) {
      return { isSample: true, sampleFileName: asset.sampleFileName }
    }
  }

  return null
}

/** @param {Awaited<ReturnType<typeof serializeAssetForPersistence>>} saved */
export function deserializePersistedAsset(saved) {
  if (!saved) return null
  if (saved.isSample) {
    return resolveSampleAssetByFileName(saved.sampleFileName)
  }
  if (saved.dataUrl) {
    return {
      previewUrl: saved.dataUrl,
      sampleFileName: saved.fileName,
      file: null,
      isSample: false,
      ...(typeof saved.monochromeHover === 'boolean'
        ? { monochromeHover: saved.monochromeHover }
        : {}),
    }
  }
  return null
}

/** @param {Record<string, unknown>} assets */
export async function serializeAssetsForPersistence(assets) {
  const out = {}

  for (const [key, value] of Object.entries(assets ?? {})) {
    if (key === 'dismissedSlots') continue
    if (key === 'extra') {
      const extra = await Promise.all(
        (value ?? []).map(async (entry) => ({
          id: entry.id,
          asset: await serializeAssetForPersistence(entry),
        })),
      )
      out.extra = extra.filter((entry) => entry.asset)
      continue
    }

    const serialized = await serializeAssetForPersistence(value)
    if (serialized) out[key] = serialized
  }

  return out
}

/** @param {Awaited<ReturnType<typeof serializeAssetsForPersistence>> | undefined} savedAssets */
export function deserializePersistedAssets(savedAssets, templateId) {
  if (!savedAssets || typeof savedAssets !== 'object') {
    return getTemplateSampleAssets(templateId)
  }

  const out = {}

  for (const [key, value] of Object.entries(savedAssets)) {
    if (key === 'extra' && Array.isArray(value)) {
      out.extra = value
        .map((entry) => {
          const asset = deserializePersistedAsset(entry.asset)
          if (!asset) return null
          return { id: entry.id ?? Date.now(), ...asset }
        })
        .filter(Boolean)
      continue
    }

    const asset = deserializePersistedAsset(value)
    if (asset) out[key] = asset
  }

  if (Object.keys(out).length === 0) {
    return templateId === 'campaign-brief'
      ? repairCampaignBriefAssets(getTemplateSampleAssets(templateId))
      : getTemplateSampleAssets(templateId)
  }

  const samples = getTemplateSampleAssets(templateId)
  for (const [key, sample] of Object.entries(samples)) {
    if (!out[key]) out[key] = sample
  }

  if (templateId === 'campaign-brief') {
    return repairCampaignBriefAssets(out)
  }

  return out
}

/** @param {import('./thumbDesignerSampleAssets.js').ReturnType<typeof getTemplateSampleAssets>[string]} asset */
export function assetCompareKey(asset) {
  if (!asset) return null
  if (asset.isSample && asset.sampleFileName) return `sample:${asset.sampleFileName}`
  if (asset.previewUrl?.startsWith('data:')) {
    return `data:${asset.file?.name ?? asset.sampleFileName ?? 'upload'}:${asset.previewUrl.length}`
  }
  return asset.file?.name ?? asset.sampleFileName ?? null
}

/** @param {Record<string, unknown>} assets */
export function serializeAssetsForCompare(assets) {
  const out = {}

  for (const [key, value] of Object.entries(assets ?? {})) {
    if (key === 'extra') {
      out.extra = (value ?? []).map((entry) => ({
        id: entry.id,
        key: assetCompareKey(entry),
      }))
      continue
    }
    if (key === 'dismissedSlots') {
      out.dismissedSlots = [...(value ?? [])].sort()
      continue
    }
    out[key] = assetCompareKey(value)
  }

  return out
}
