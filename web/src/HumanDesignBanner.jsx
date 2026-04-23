import humanDesignHoverSvg from './assets/human-design-hover.svg?raw'

export function HumanDesignBanner() {
  return (
    <section
      className="human-design-banner pointer-events-none mt-16 flex -translate-y-[12px] justify-center px-4 pb-10"
      aria-label="Human design"
    >
      <div className="human-design-banner__stage pointer-events-auto shrink-0">
        <div
          className="human-design-banner__hover-layer"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: humanDesignHoverSvg }}
        />

        <div className="human-design-banner__idle">
          <div
            className="human-design-banner__icon-ring flex shrink-0 items-center justify-center rounded-full border border-black/15 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-300 ease-out"
            aria-hidden="true"
          >
            <svg
              className="human-design-banner__bot block shrink-0 overflow-visible"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="human-design-banner__bot-path"
                d="M27.3401 16H36.0001C37.061 16 38.0784 16.4214 38.8285 17.1716C39.5787 17.9217 40.0001 18.9391 40.0001 20V28.66M4 28H8M40 28H44M44 44L4 4M16 16H12C10.9391 16 9.92172 16.4214 9.17157 17.1716C8.42143 17.9217 8 18.9391 8 20V36C8 37.0609 8.42143 38.0783 9.17157 38.8284C9.92172 39.5786 10.9391 40 12 40H36C37.0608 39.9998 38.078 39.5782 38.828 38.828M18 26V30M19.3401 8H24.0001V12.66"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
