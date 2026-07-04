import { useEffect, useState } from 'react'
import arrowRightIcon from '../assets/arrow-right.svg'

const PROMPT_TITLE_LINE_1 = 'Drop your Figma dev mode link'
const PROMPT_TITLE_LINE_2 = 'into Cursor'

function AnalyzingLabel() {
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setDotCount((count) => (count + 1) % 4)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const dots = dotCount > 0 ? Array(dotCount).fill('.').join(' ') : ''

  return (
    <p className="thumb-designer-figma-modal__analyzing m-0" aria-live="polite">
      <span className="thumb-designer-figma-modal__analyzing-row">
        Analyzing Figma
        <span className="thumb-designer-figma-modal__dots" aria-hidden="true">
          {dots}
        </span>
      </span>
    </p>
  )
}

export function FigmaCursorImportModal({ open, phase = 'prompt', onClose }) {
  if (!open) return null

  const showAnalyzing = phase === 'analyzing'

  return (
    <div
      className="thumb-designer-figma-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="figma-cursor-modal-title"
    >
      <button
        type="button"
        className={`thumb-designer-figma-modal__backdrop ${showAnalyzing ? 'thumb-designer-figma-modal__backdrop--locked' : ''}`}
        aria-label="Close"
        onClick={onClose}
        tabIndex={showAnalyzing ? -1 : 0}
      />
      <div className="thumb-designer-figma-modal__panel">
        <div
          className={`thumb-designer-figma-modal__content ${showAnalyzing ? 'thumb-designer-figma-modal__content--hidden' : ''}`}
          aria-hidden={showAnalyzing}
        >
          <div className="thumb-designer-figma-modal__title-block">
            <h2
              id="figma-cursor-modal-title"
              className="thumb-designer-figma-modal__title text-center"
            >
              <span className="thumb-designer-figma-modal__title-lines">
                {PROMPT_TITLE_LINE_1}
                <span className="thumb-designer-figma-modal__title-row">
                  {PROMPT_TITLE_LINE_2}
                  <img
                    src={arrowRightIcon}
                    alt=""
                    className="thumb-designer-figma-modal__title-arrow"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </h2>
          </div>
          <div
            className="thumb-designer-figma-modal__title-cta-gap"
            style={{ height: 32, minHeight: 32, flexShrink: 0 }}
            aria-hidden="true"
          />
          <div className="thumb-designer-figma-modal__actions">
            <button
              type="button"
              className="thumb-designer-figma-modal__cta thumb-designer-figma-modal__cta--outline"
              onClick={onClose}
            >
              Continue without Figma
            </button>
          </div>
        </div>
        <div
          className={`thumb-designer-figma-modal__analyzing-layer ${showAnalyzing ? 'thumb-designer-figma-modal__analyzing-layer--visible' : ''}`}
          aria-hidden={!showAnalyzing}
        >
          {showAnalyzing ? <AnalyzingLabel /> : null}
        </div>
      </div>
    </div>
  )
}