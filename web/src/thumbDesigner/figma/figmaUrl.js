export function normalizeFigmaNodeId(raw) {
  const trimmed = `${raw ?? ''}`.trim()
  if (!trimmed) return null
  return trimmed.replace(/-/g, ':')
}

export function parseFigmaDesignUrl(url) {
  const trimmed = `${url ?? ''}`.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (!parsed.hostname.includes('figma.com')) return null

    const pathMatch = parsed.pathname.match(/\/design\/([^/]+)/)
    const fileKey = pathMatch?.[1] ?? null

    const nodeRaw =
      parsed.searchParams.get('node-id') ??
      parsed.searchParams.get('node_id') ??
      null
    const nodeId = nodeRaw ? normalizeFigmaNodeId(nodeRaw) : null

    return { fileKey, nodeId }
  } catch {
    return null
  }
}
