import { MANAGED_CASE_STUDIES } from './caseStudiesCatalog.js'
import {
  FIGMA_CATALOG_DEFAULT_NODE_IDS,
  FIGMA_NODE_CATALOG_KEYS,
  resolveCatalogKeyFromFigmaLayerName,
  resolveCatalogKeyFromFigmaNodeId,
} from './figmaCaseStudyNodeMap.js'
import { normalizeFigmaNodeId, parseFigmaDesignUrl } from './figma/figmaUrl.js'

export const ASKKATZY_FIGMA_FILE_KEY = 'MmRmDqoLU97b0brsKEnKLy'

export { FIGMA_CATALOG_DEFAULT_NODE_IDS, FIGMA_NODE_CATALOG_KEYS, resolveCatalogKeyFromFigmaLayerName }
export { normalizeFigmaNodeId, parseFigmaDesignUrl }

export function resolveCatalogKeyFromFigmaLink(figmaLink) {
  const parsed = parseFigmaDesignUrl(figmaLink)
  if (!parsed?.nodeId) return null

  if (parsed.fileKey && parsed.fileKey !== ASKKATZY_FIGMA_FILE_KEY) {
    return null
  }

  const fromNodeMap = resolveCatalogKeyFromFigmaNodeId(parsed.nodeId)
  if (fromNodeMap) return fromNodeMap

  for (const entry of MANAGED_CASE_STUDIES) {
    if (!entry.figmaLink) continue
    const entryParsed = parseFigmaDesignUrl(entry.figmaLink)
    if (entryParsed?.nodeId === parsed.nodeId) return entry.key
  }

  return null
}

export function buildAskkatzyFigmaDesignUrl(nodeId) {
  const normalized = normalizeFigmaNodeId(nodeId)
  if (!normalized) return ''
  const queryNodeId = normalized.replace(/:/g, '-')
  return `https://www.figma.com/design/${ASKKATZY_FIGMA_FILE_KEY}/Askkatzy?node-id=${queryNodeId}&m=dev`
}

export function buildFigmaLinkForCatalogKey(catalogKey) {
  const nodeId = FIGMA_CATALOG_DEFAULT_NODE_IDS[catalogKey]
  return nodeId ? buildAskkatzyFigmaDesignUrl(nodeId) : ''
}

/** Placeholder on the Figma step (Sponsorships hover card). */
export const FIGMA_NEW_FROM_TEMPLATE_LINK = buildFigmaLinkForCatalogKey('creators-spons')
