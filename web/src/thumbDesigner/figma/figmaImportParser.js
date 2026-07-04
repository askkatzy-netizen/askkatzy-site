import {
  resolveCatalogKeyFromFigmaLayerName,
  resolveCatalogKeyFromFigmaNodeId,
} from '../figmaCaseStudyNodeMap.js'
import { getTemplateById } from '../thumbDesignerSchema.js'
import { parseFigmaDesignUrl } from './figmaUrl.js'

const EXPORTABLE_NODE_TYPES = new Set([
  'VECTOR',
  'BOOLEAN_OPERATION',
  'COMPONENT',
  'INSTANCE',
  'GROUP',
  'FRAME',
])

export function figmaRgbToHex(color) {
  if (!color) return ''
  const r = Math.round((color.r ?? 0) * 255)
  const g = Math.round((color.g ?? 0) * 255)
  const b = Math.round((color.b ?? 0) * 255)
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

export function firstVisibleSolidFill(node) {
  for (const fill of node?.fills ?? []) {
    if (fill.visible === false || fill.type !== 'SOLID' || !fill.color) continue
    return {
      hex: figmaRgbToHex(fill.color),
      opacityPercent: Math.round((fill.opacity ?? 1) * 100),
    }
  }
  return null
}

export function firstVisibleSolidStroke(node) {
  for (const stroke of node?.strokes ?? []) {
    if (stroke.visible === false || stroke.type !== 'SOLID' || !stroke.color) continue
    return {
      hex: figmaRgbToHex(stroke.color),
      opacityPercent: Math.round((stroke.opacity ?? 1) * 100),
    }
  }
  return null
}

export function extractHaloFromEffects(effects) {
  for (const effect of effects ?? []) {
    if (effect.visible === false) continue
    if (effect.type !== 'DROP_SHADOW' && effect.type !== 'INNER_SHADOW') continue
    if (!effect.color) continue
    return {
      hex: figmaRgbToHex(effect.color),
      opacityPercent: Math.round((effect.color.a ?? 0.2) * 100),
    }
  }
  return null
}

function walkNode(node, visit, ancestors = []) {
  if (!node) return
  visit(node, ancestors)
  for (const child of node.children ?? []) {
    walkNode(child, visit, [...ancestors, node])
  }
}

function ancestorNamed(ancestors, pattern) {
  return ancestors.some((node) => pattern.test(`${node.name ?? ''}`))
}

function inferSlotFromLayerName(layerName, templateId) {
  const name = `${layerName ?? ''}`.toLowerCase()

  if (/sparkle/.test(name)) return 'sparkle'
  if (/^cog$|engine/.test(name)) return 'background'
  if (/cog/.test(name)) return 'backgroundSecondary'
  if (/bubble/.test(name)) return 'bubble'
  if (/hover/.test(name) && !/halo/.test(name)) return 'hover'
  if (/idle|default|piranha/.test(name)) return 'idle'
  if (/bg|background/.test(name)) return 'background'
  if (/logo|vector|mark|thumb|icon/.test(name)) {
    const kind = getTemplateById(templateId).kind
    return kind === 'single-logo' ? 'logo' : 'center'
  }
  return null
}

function assignAssetSlots(templateId, candidates) {
  const template = getTemplateById(templateId)
  const slots = {}
  const used = new Set()

  for (const candidate of candidates) {
    let slot = inferSlotFromLayerName(candidate.name, templateId)

    if (template.kind === 'single-logo' && !slot) slot = 'logo'
    if (template.kind === 'center-mark' && !slot && /vector|logo|mark/.test(candidate.name.toLowerCase())) {
      slot = 'center'
    }

    if (!slot || used.has(slot)) continue
    used.add(slot)
    slots[slot] = candidate.id
  }

  if (template.kind === 'single-logo' && !slots.logo && candidates[0]) {
    slots.logo = candidates[0].id
  }

  if (template.kind === 'center-mark' && !slots.center) {
    const primary =
      candidates.find((c) => /vector|logo|mark/i.test(c.name)) ?? candidates[0]
    if (primary) slots.center = primary.id
  }

  if (templateId === 'boss-ai') {
    const cogs = candidates.filter((c) => /cog|engine/i.test(c.name))
    if (cogs[0] && !slots.background) slots.background = cogs[0].id
    if (cogs[1] && !slots.backgroundSecondary) slots.backgroundSecondary = cogs[1].id
  }

  return Object.entries(slots).map(([slot, nodeId]) => ({ slot, nodeId }))
}

/**
 * @param {object} document — Figma REST `nodes[id].document`
 * @param {{ figmaLink?: string }} [options]
 */
export function parseCaseStudyFromFigmaDocument(document, options = {}) {
  const figmaLink = options.figmaLink ?? ''
  const parsedUrl = parseFigmaDesignUrl(figmaLink)
  const catalogKey =
    resolveCatalogKeyFromFigmaLayerName(document?.name) ??
    resolveCatalogKeyFromFigmaNodeId(parsedUrl?.nodeId)
  const templateId = catalogKey ?? 'new'

  const copy = { title: '', tag: '' }
  const colors = {
    hoverTheme: '',
    hoverBorderColor: '',
    hoverHaloColor: '',
    hoverHaloOpacity: 20,
    hoverThemeOpacity: 100,
    hoverBorderOpacity: 100,
  }

  const assetCandidates = []

  walkNode(document, (node, ancestors) => {
    const nodeName = `${node.name ?? ''}`
    const lowerName = nodeName.toLowerCase()

    if (node.type === 'TEXT' && node.characters) {
      const text = `${node.characters}`.trim()
      if (!text) return

      if (lowerName === 'tag' || ancestorNamed(ancestors, /^tag$/i)) {
        copy.tag = text
        return
      }
      if (lowerName === 'name' || ancestorNamed(ancestors, /^name$/i)) {
        copy.title = text
        return
      }
      if (ancestorNamed(ancestors, /tag/i) && !copy.tag) {
        copy.tag = text
        return
      }
      if (ancestorNamed(ancestors, /^name$/i) && !copy.title) {
        copy.title = text
      }
    }

    if (/^thumbs$/i.test(nodeName)) {
      const fill = firstVisibleSolidFill(node)
      if (fill?.hex) {
        colors.hoverTheme = fill.hex
        colors.hoverThemeOpacity = fill.opacityPercent
      }
    }

    if (/^content$/i.test(nodeName)) {
      const stroke = firstVisibleSolidStroke(node)
      if (stroke?.hex) {
        colors.hoverBorderColor = stroke.hex
        colors.hoverBorderOpacity = stroke.opacityPercent
      }
      const halo = extractHaloFromEffects(node.effects)
      if (halo?.hex) {
        colors.hoverHaloColor = halo.hex
        colors.hoverHaloOpacity = halo.opacityPercent
      }
    }

    if (EXPORTABLE_NODE_TYPES.has(node.type) && ancestorNamed(ancestors, /thumbs/i)) {
      if (node.type === 'FRAME' && (node.children?.length ?? 0) > 2) return
      assetCandidates.push({ id: node.id, name: nodeName })
    }
  })

  if (!colors.hoverBorderColor && colors.hoverTheme) {
    colors.hoverBorderColor = colors.hoverTheme
  }
  if (!colors.hoverHaloColor && colors.hoverBorderColor) {
    colors.hoverHaloColor = colors.hoverBorderColor
  }

  const assets = assignAssetSlots(templateId, assetCandidates)

  return {
    catalogKey,
    templateId,
    basedOnTitle: copy.title || null,
    copy,
    colors,
    assets,
  }
}
