import { useSyncExternalStore } from 'react'
import {
  getCaseStudyCatalogRevision,
  subscribeCaseStudyCatalog,
} from './caseStudiesCatalog.js'

/** Re-render when the shared case-study catalog is saved (tool → homepage). */
export function useCaseStudyCatalogRevision() {
  return useSyncExternalStore(
    subscribeCaseStudyCatalog,
    getCaseStudyCatalogRevision,
    getCaseStudyCatalogRevision,
  )
}
