/** Bundled homepage thumb assets — preloaded when a template is selected in the designer. */

import caseStudyDefault from '../assets/CaseStudy_default.svg'
import streamElementsLogo from '../assets/StreamElementsLogo.svg'
import graptapBg from '../assets/graptap-bg.svg'
import graptapLogoDefault from '../assets/graptap-logo-default.svg'
import bossAiCog from '../assets/CaseStudy-Boss-cog-1.svg'
import bossAiCog2 from '../assets/CaseStudy-Boss-cog-2.svg'
import bossAiSparkle from '../assets/boss-ai-sparkle.svg'
import brief1StarIcon from '../assets/brief1-star.svg'
import brief4JoinInnerIcon from '../assets/brief4-join_inner.svg'
import campaignBriefCenterLines from '../assets/campaign-brief-center-lines.svg'
import brief5PreviewIcon from '../assets/brief5-preview.svg'
import brief6TimerIcon from '../assets/brief6-timer.svg'
import brief12VideoLibraryIcon from '../assets/brief12video_library.svg'
import brief13BoltIcon from '../assets/brief13-bolt.svg'
import stickerDot01 from '../assets/sticker-dot-01.svg'
import stickerDot02 from '../assets/sticker-dot-02.svg'
import stickerDot03 from '../assets/sticker-dot-03.svg'
import stickerDot04 from '../assets/sticker-dot-04.svg'
import stickerDot05 from '../assets/sticker-dot-05.svg'
import stickerDot06 from '../assets/sticker-dot-06.svg'
import squareFishBubble from '../assets/_bubble.svg'
import squareFishDefault from '../assets/Piranha_default.png'
import squareFishHover from '../assets/Piranha_hover.png'
import pickmeHand from '../assets/pickme/pickme-hand.svg'
import overwolfBadge from '../assets/company=Overwolf.png'
import honeybookBadge from '../assets/company=HoneyBook.png'
import gongBadge from '../assets/company=Gong.png'

function sampleAsset(previewUrl, sampleFileName) {
  return { previewUrl, sampleFileName, isSample: true, file: null }
}

/** Homepage SPRINT wordmark — inline SVG with hover fills in code, not a bundled file. */
function builtInDesignSprintsCenter() {
  return {
    previewUrl: '',
    sampleFileName: 'SPRINT wordmark (homepage default)',
    isSample: true,
    isBuiltIn: true,
    file: null,
  }
}

/** @returns {Record<string, { previewUrl: string, sampleFileName: string, isSample: true, file: null }>} */
export function getTemplateSampleAssets(templateId) {
  switch (templateId) {
    case 'creators-spons':
      return { logo: sampleAsset(streamElementsLogo, 'StreamElementsLogo.svg') }
    case 'graptap':
      return {
        center: sampleAsset(graptapLogoDefault, 'graptap-logo-default.svg'),
        background: sampleAsset(graptapBg, 'graptap-bg.svg'),
      }
    case 'boss-ai':
      return {
        sparkle: sampleAsset(bossAiSparkle, 'boss-ai-sparkle.svg'),
        background: sampleAsset(bossAiCog, 'CaseStudy-Boss-cog-1.svg'),
        backgroundSecondary: sampleAsset(bossAiCog2, 'CaseStudy-Boss-cog-2.svg'),
      }
    case 'campaign-brief':
      return {
        center: sampleAsset(campaignBriefCenterLines, 'campaign-brief-center-lines.svg'),
        vector1: sampleAsset(brief1StarIcon, 'brief1-star.svg'),
        vector2: sampleAsset(brief4JoinInnerIcon, 'brief4-join_inner.svg'),
        vector3: sampleAsset(brief5PreviewIcon, 'brief5-preview.svg'),
        vector4: sampleAsset(brief6TimerIcon, 'brief6-timer.svg'),
        vector5: sampleAsset(brief12VideoLibraryIcon, 'brief12video_library.svg'),
        vector6: sampleAsset(brief13BoltIcon, 'brief13-bolt.svg'),
      }
    case 'design-sprints':
      return {
        center: builtInDesignSprintsCenter(),
        sticker1: sampleAsset(stickerDot01, 'sticker-dot-01.svg'),
        sticker2: sampleAsset(stickerDot02, 'sticker-dot-02.svg'),
        sticker3: sampleAsset(stickerDot03, 'sticker-dot-03.svg'),
        sticker4: sampleAsset(stickerDot04, 'sticker-dot-04.svg'),
        sticker5: sampleAsset(stickerDot05, 'sticker-dot-05.svg'),
        sticker6: sampleAsset(stickerDot06, 'sticker-dot-06.svg'),
      }
    case 'squarefish':
      return {
        idle: sampleAsset(squareFishDefault, 'Piranha_default.png'),
        hover: sampleAsset(squareFishHover, 'Piranha_hover.png'),
        bubble: sampleAsset(squareFishBubble, '_bubble.svg'),
      }
    case 'pickme':
      return {
        center: sampleAsset(pickmeHand, 'pickme-hand.svg'),
        carousel1: sampleAsset(overwolfBadge, 'company=Overwolf.png'),
        carousel2: sampleAsset(honeybookBadge, 'company=HoneyBook.png'),
        carousel3: sampleAsset(gongBadge, 'company=Gong.png'),
      }
    case 'new':
      return {
        center: { ...sampleAsset(caseStudyDefault, 'CaseStudy_default.svg'), monochromeHover: true },
      }
    default:
      return {}
  }
}
