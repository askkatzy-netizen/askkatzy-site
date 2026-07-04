import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  isThumbDesignerPath,
  resolveCaseStudiesEditorPath,
} from './thumbDesigner/thumbDesignerPaths.js'

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
const editorPath = typeof window !== 'undefined' ? resolveCaseStudiesEditorPath(pathname) : pathname

if (typeof window !== 'undefined' && editorPath !== pathname) {
  window.history.replaceState(null, '', editorPath)
}

const root = createRoot(document.getElementById('root'))

if (import.meta.env.DEV && isThumbDesignerPath(pathname)) {
  import('./thumbDesigner/CaseStudyThumbDesigner.jsx').then(({ CaseStudyThumbDesigner }) => {
    root.render(
      <StrictMode>
        <CaseStudyThumbDesigner />
      </StrictMode>,
    )
  })
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
