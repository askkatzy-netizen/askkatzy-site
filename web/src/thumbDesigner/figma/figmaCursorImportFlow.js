export const FIGMA_ANALYZING_MIN_MS = 1000

export function hasUsableFigmaImportPayload(importResult) {
  if (!importResult?.ok) return false
  if (importResult.catalogKey) return true

  const hasCopy =
    Boolean(importResult.copy?.title?.trim()) || Boolean(importResult.copy?.tag?.trim())
  const hasColors = Boolean(importResult.colors?.hoverTheme)

  return hasCopy || hasColors
}

export function waitForMinAnalyzingDuration(analyzingShownAt) {
  const started = analyzingShownAt ?? Date.now()
  const remaining = FIGMA_ANALYZING_MIN_MS - (Date.now() - started)
  if (remaining <= 0) return Promise.resolve()
  return new Promise((resolve) => {
    window.setTimeout(resolve, remaining)
  })
}
