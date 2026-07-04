/** Warm hand gradient from Figma brand frame (#FFB84D → #FF33A3). */
export const HAND_ICON_METABALL_CONFIG = {
  pageBg: { r: 255, g: 186, b: 140 },
  palette: [
    { r: 255, g: 184, b: 77 },
    { r: 255, g: 208, b: 144 },
    { r: 255, g: 123, b: 128 },
    { r: 255, g: 77, b: 166 },
    { r: 255, g: 51, b: 163 },
  ],
  threshold: 0.58,
  softness: 0.68,
  maxBlend: 0.96,
}

export function createMetaballBlobs(width, height, palette, radiusScale = 1) {
  return palette.map((color, index) => {
    const angle = (index / palette.length) * Math.PI * 2 + Math.random() * 0.6
    const speed = 0.08 + Math.random() * 0.12

    return {
      x: width * (0.15 + Math.random() * 0.7),
      y: height * (0.15 + Math.random() * 0.7),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.min(width, height) * (0.24 + Math.random() * 0.16) * radiusScale,
      cr: color.r,
      cg: color.g,
      cb: color.b,
    }
  })
}

export function renderMetaballFrame(
  blobs,
  imageData,
  width,
  height,
  config,
  staticFrame,
  speedScale = 1,
) {
  const data = imageData.data
  const { pageBg, threshold, softness, maxBlend } = config

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let influence = 0
      let colorR = 0
      let colorG = 0
      let colorB = 0

      for (const blob of blobs) {
        const dx = x - blob.x
        const dy = y - blob.y
        const distSq = dx * dx + dy * dy + 1
        const sample = (blob.radius * blob.radius) / distSq
        influence += sample
        colorR += sample * blob.cr
        colorG += sample * blob.cg
        colorB += sample * blob.cb
      }

      const blend =
        influence > threshold ? Math.min(1, (influence - threshold) / softness) * maxBlend : 0

      const blobR = influence > 0 ? colorR / influence : pageBg.r
      const blobG = influence > 0 ? colorG / influence : pageBg.g
      const blobB = influence > 0 ? colorB / influence : pageBg.b

      const r = Math.round(pageBg.r + (blobR - pageBg.r) * blend)
      const g = Math.round(pageBg.g + (blobG - pageBg.g) * blend)
      const b = Math.round(pageBg.b + (blobB - pageBg.b) * blend)

      const index = (y * width + x) * 4
      data[index] = r
      data[index + 1] = g
      data[index + 2] = b
      data[index + 3] = 255
    }
  }

  if (staticFrame) return

  for (const blob of blobs) {
    blob.x += blob.vx * speedScale
    blob.y += blob.vy * speedScale

    const padding = blob.radius * 0.35
    if (blob.x < padding) {
      blob.x = padding
      blob.vx = Math.abs(blob.vx)
    } else if (blob.x > width - padding) {
      blob.x = width - padding
      blob.vx = -Math.abs(blob.vx)
    }

    if (blob.y < padding) {
      blob.y = padding
      blob.vy = Math.abs(blob.vy)
    } else if (blob.y > height - padding) {
      blob.y = height - padding
      blob.vy = -Math.abs(blob.vy)
    }

    if (Math.random() < 0.0025) {
      const drift = 0.035 * speedScale
      blob.vx += (Math.random() - 0.5) * drift
      blob.vy += (Math.random() - 0.5) * drift

      const speed = Math.hypot(blob.vx, blob.vy)
      const maxSpeed = 0.16 * speedScale
      if (speed > maxSpeed) {
        blob.vx = (blob.vx / speed) * maxSpeed
        blob.vy = (blob.vy / speed) * maxSpeed
      }
    }
  }
}
