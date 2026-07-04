import { useMemo, useState } from 'react'
import { CaseThumbVisual } from './ThumbDesignerPreview.jsx'
import {
  getManagedCaseStudyAssets,
  getManagedCaseStudyTheme,
  getPickMeDisplayTitle,
  isCaseStudyVisibleOnHomepage,
  listManagedCaseStudies,
} from './caseStudiesCatalog.js'
import { BRAND_OPTIONS, buildColorCss, getTemplateById } from './thumbDesignerSchema.js'

function AddCaseStudyCard({ onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="case-study-item flex w-full cursor-pointer flex-col border-0 bg-transparent p-0 text-left"
    >
      <span
        className="case-study-add-card flex w-full items-center justify-center rounded-[40px] border border-dashed border-black/12 text-black/55 hover:text-black/70"
        style={{ aspectRatio: '1.28 / 1' }}
      >
        <span className="flex flex-col items-center gap-2">
          <span className="text-[40px] font-light leading-none">+</span>
          <span className="font-poppins text-[14px] font-medium">New case study</span>
        </span>
      </span>
      <span className="mt-2 block h-[22px]" aria-hidden />
    </button>
  )
}

function CaseStudyGridCard({ entry, isHovered, onEdit, onCreateFromTemplate, onHoverChange }) {
  const template = getTemplateById(entry.templateId)
  const brandThumbClass =
    BRAND_OPTIONS.find((b) => b.value === entry.brand)?.thumbClass ?? 'case-thumb--stream'
  const assets = useMemo(() => getManagedCaseStudyAssets(entry), [entry])
  const theme = useMemo(() => getManagedCaseStudyTheme(entry), [entry])
  const haloFallback = template.defaultHoverHaloOpacity ?? 20
  const hiddenFromSite = !isCaseStudyVisibleOnHomepage(entry)

  return (
    <div
      className={`case-study-item w-full ${hiddenFromSite ? 'case-study-item--off-site' : ''} ${isHovered ? 'case-study-item--active' : ''}`}
    >
      <div
        className="case-study-card-anchor group"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        <button
          type="button"
          onClick={() => onEdit(entry.key)}
          className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        >
          <CaseThumbVisual
            template={template}
            tag={entry.tag}
            assets={assets}
            previewHover={isHovered}
            drawerOpen={false}
            drawerVisible={false}
            brandThumbClass={brandThumbClass}
            themeStyle={{
              '--case-hover-border': buildColorCss(
                theme.hoverBorderColor,
                theme.hoverBorderOpacity,
                100,
              ),
              '--case-hover-halo': buildColorCss(
                theme.hoverHaloColor,
                theme.hoverHaloOpacity,
                haloFallback,
              ),
              '--case-hover-surface': buildColorCss(theme.hoverTheme, theme.hoverThemeOpacity, 100),
            }}
            showDrawer={false}
          />
        </button>
        <button
          type="button"
          aria-label="Clone"
          className={`case-study-clone-btn ${isHovered ? 'case-study-clone-btn--visible' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            onCreateFromTemplate(entry.key)
          }}
        >
          <span className="case-study-clone-btn__icon" aria-hidden>
            +
          </span>
          <span className="case-study-clone-btn__label">Clone</span>
        </button>
      </div>
      <p
        className={`mt-2 ml-[40px] transition-colors duration-[160ms] ${isHovered ? 'text-black/90' : 'text-black/40'}`}
      >
        <span className="font-roboto-slab text-[16px] font-semibold leading-none">
          {entry.templateId === 'pickme' ? getPickMeDisplayTitle(entry) : entry.title}
        </span>
      </p>
    </div>
  )
}

export function CaseStudiesManagerGrid({
  catalogRevision = 0,
  onEditCaseStudy,
  onCreateCaseStudy,
  onCreateFromTemplate,
}) {
  const [hoveredKey, setHoveredKey] = useState(null)

  return (
    <div className="case-studies-content w-full" key={catalogRevision}>
      <div className="case-studies-manager-grid">
        <AddCaseStudyCard onSelect={onCreateCaseStudy} />
        {listManagedCaseStudies(catalogRevision).map((entry) => (
          <CaseStudyGridCard
            key={entry.key}
            entry={entry}
            isHovered={hoveredKey === entry.key}
            onEdit={onEditCaseStudy}
            onCreateFromTemplate={onCreateFromTemplate}
            onHoverChange={(active) => setHoveredKey(active ? entry.key : null)}
          />
        ))}
      </div>
    </div>
  )
}
