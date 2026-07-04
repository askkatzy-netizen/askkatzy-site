/** Figma node / layer-name → catalog key (no catalog or asset imports). */

export const FIGMA_NODE_CATALOG_KEYS = {
  '122:7781': 'creators-spons',
  '122:7788': 'creators-spons',
  '117:7440': 'graptap',
  '117:7447': 'graptap',
  '539:38068': 'boss-ai',
  '539:38075': 'boss-ai',
  '748:23203': 'campaign-brief',
  '748:23211': 'campaign-brief',
  '131:7325': 'design-sprints',
  '131:7341': 'design-sprints',
  '37:7402': 'squarefish',
  '37:7410': 'squarefish',
  '1277:8618': 'boss-ai',
}

export const FIGMA_CATALOG_DEFAULT_NODE_IDS = {
  'creators-spons': '122:7788',
  graptap: '117:7447',
  'boss-ai': '539:38075',
  'campaign-brief': '748:23211',
  'design-sprints': '131:7341',
  squarefish: '37:7410',
}

const FIGMA_LAYER_NAME_CATALOG_KEYS = [
  { pattern: /case study=Spons/i, catalogKey: 'creators-spons' },
  { pattern: /case study=GrabTap/i, catalogKey: 'graptap' },
  { pattern: /case study=BOSS\.AI/i, catalogKey: 'boss-ai' },
  { pattern: /case study=Briefs/i, catalogKey: 'campaign-brief' },
  { pattern: /case study=DS prototyping/i, catalogKey: 'design-sprints' },
  { pattern: /case study=SquareFish/i, catalogKey: 'squarefish' },
]

export function resolveCatalogKeyFromFigmaLayerName(layerName) {
  const name = `${layerName ?? ''}`.trim()
  if (!name) return null

  for (const { pattern, catalogKey } of FIGMA_LAYER_NAME_CATALOG_KEYS) {
    if (pattern.test(name)) return catalogKey
  }
  return null
}

export function resolveCatalogKeyFromFigmaNodeId(nodeId) {
  if (!nodeId) return null
  return FIGMA_NODE_CATALOG_KEYS[nodeId] ?? null
}
