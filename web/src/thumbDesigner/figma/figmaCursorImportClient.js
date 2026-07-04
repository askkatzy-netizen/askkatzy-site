const POLL_IDLE_MS = 400
const POLL_ACTIVE_MS = 120

export async function resetCursorFigmaImport() {
  await fetch('/api/figma/cursor-import', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'reset' }),
  })
}

export async function fetchCursorFigmaImportState() {
  const response = await fetch('/api/figma/cursor-import', { cache: 'no-store' })
  if (!response.ok) return { status: 'idle' }
  return response.json()
}

export function subscribeCursorFigmaImport(onChange) {
  let active = true
  let intervalId = null
  let lastStatus = 'idle'

  const schedule = (status) => {
    if (!active) return
    if (intervalId) window.clearInterval(intervalId)
    const ms = status === 'processing' || status === 'complete' ? POLL_ACTIVE_MS : POLL_IDLE_MS
    intervalId = window.setInterval(tick, ms)
  }

  const tick = async () => {
    if (!active) return
    try {
      const state = await fetchCursorFigmaImportState()
      const status = state?.status ?? 'idle'
      if (status !== lastStatus) {
        lastStatus = status
        schedule(status)
      }
      onChange(state)
    } catch {
      /* dev server unavailable */
    }
  }

  tick()
  schedule('idle')

  return () => {
    active = false
    if (intervalId) window.clearInterval(intervalId)
  }
}
