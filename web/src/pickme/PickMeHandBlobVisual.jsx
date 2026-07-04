import handMaskUrl from '../assets/pickme/hand-mask.svg'
import { MetaballSurface } from './MetaballSurface.jsx'
import { HAND_ICON_METABALL_CONFIG } from './metaball.js'

const SIZE_PRESETS = {
  md: { width: 80, height: 61, pixelSize: 96 },
  brand: { width: 160, height: 102, pixelSize: 128 },
  lg: { width: 160, height: 122, pixelSize: 128 },
  xl: { width: 240, height: 183, pixelSize: 160 },
}

export function PickMeHandBlobVisual({ className = '', size = 'xl' }) {
  const preset = SIZE_PRESETS[size] ?? SIZE_PRESETS.xl

  return (
    <span
      className={`pickme-hand-blob-visual pickme-hand-blob-visual--${size} ${className}`.trim()}
      style={{ '--pickme-hand-mask': `url(${JSON.stringify(handMaskUrl)})` }}
      aria-hidden="true"
    >
      <MetaballSurface
        config={HAND_ICON_METABALL_CONFIG}
        pixelSize={preset.pixelSize}
        className="pickme-hand-blob-visual__metaball"
      />
    </span>
  )
}
