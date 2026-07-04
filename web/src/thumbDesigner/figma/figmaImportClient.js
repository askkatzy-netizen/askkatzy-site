/**
 * Dev-only: imports case study card data from a Figma design URL via Vite middleware.
 * Requires `FIGMA_ACCESS_TOKEN` in `web/.env.local` for live Figma API access.
 */
export async function importCaseStudyFromFigmaLink(figmaLink) {
  const response = await fetch('/api/figma/import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ figmaLink: figmaLink.trim() }),
  })

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    throw new Error(payload?.error ?? 'Could not import from Figma.')
  }

  return payload
}
