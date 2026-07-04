import profileFace from '../assets/profile-face.png'
import arrowLeftIcon from '../assets/arrow-left.svg'
import {
  EDITOR_TOOL_SCREEN,
  getCaseStudyCardEditorGridTitle,
} from './thumbDesignerSchema.js'

/**
 * Case studies editor — top header.
 * Grid: home photo (fixed slot) + title. Editor: back control + title only (no photo).
 *
 * @param {'grid' | 'editor'} screen
 */
export function EditorToolHeader({
  screen,
  editorTitle,
  editorSubtitle,
  onBack,
  actions = null,
}) {
  const isGrid = screen === EDITOR_TOOL_SCREEN.GRID

  return (
    <header className="editor-tool-header">
      <div className="editor-tool-header__start">
        {isGrid ? (
          <div className="editor-tool-header__brand">
            <div className="editor-tool-header__photo-slot">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Back to Askkatzy homepage"
                className="editor-tool-header__home-link"
              >
                <img
                  src={profileFace}
                  alt="Eyal Katz"
                  className="editor-tool-header__home-photo"
                />
              </a>
            </div>
            <h1 className="editor-tool-header__title">{getCaseStudyCardEditorGridTitle()}</h1>
          </div>
        ) : (
          <div className="editor-tool-header__editor-row">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to case studies"
              className="thumb-designer-back-cta"
            >
              <span className="thumb-designer-back-cta__chip" aria-hidden>
                <img
                  src={arrowLeftIcon}
                  alt=""
                  aria-hidden="true"
                  className="thumb-designer-back-cta__icon"
                />
              </span>
            </button>
            <div className="editor-tool-header__editor-copy">
              <h1 className="editor-tool-header__title">{editorTitle}</h1>
              {editorSubtitle ? (
                <p className="editor-tool-header__subtitle">{editorSubtitle}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
      {actions ? <div className="editor-tool-header__actions">{actions}</div> : null}
    </header>
  )
}
