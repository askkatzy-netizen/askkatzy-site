import { useEffect, useRef } from 'react'
import { createMetaballBlobs, renderMetaballFrame } from './metaball.js'

export function MetaballSurface({
  config,
  className = '',
  pixelSize = 28,
  pixelWidth,
  pixelHeight,
  blobRadiusScale = 1,
  speedScale = 1,
}) {
  const canvasRef = useRef(null)
  const blobsRef = useRef([])
  const imageDataRef = useRef(null)
  const width = Math.max(16, Math.round(pixelWidth ?? pixelSize))
  const height = Math.max(16, Math.round(pixelHeight ?? pixelSize))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0

    canvas.width = width
    canvas.height = height
    blobsRef.current = createMetaballBlobs(width, height, config.palette, blobRadiusScale)
    imageDataRef.current = context.createImageData(width, height)

    function draw() {
      const imageData = imageDataRef.current
      if (!imageData) return

      renderMetaballFrame(
        blobsRef.current,
        imageData,
        width,
        height,
        config,
        reducedMotion,
        speedScale,
      )
      context.putImageData(imageData, 0, 0)

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [config, width, height, blobRadiusScale, speedScale])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      width={width}
      height={height}
    />
  )
}
