import figmaBadge from '../assets/company=Figma.png'
import guiddeBadge from '../assets/company=Guidde.png'
import honeybookBadge from '../assets/company=HoneyBook.png'
import audiocodesBadge from '../assets/company=AudioCodes.png'
import overwolfBadge from '../assets/company=Overwolf.png'
import gongBadge from '../assets/company=Gong.png'
import houzzBadge from '../assets/company=houzz.png'

/** How many badges spin around the hand on hover. */
export const PICKME_CAROUSEL_COUNT = 3

export const PICKME_CAROUSEL_SLOTS = ['carousel1', 'carousel2', 'carousel3']

/** All PickMe carousel participants — full 120×120 badge PNGs from assets. */
export const PICKME_PARTICIPANTS = [
  { id: 'figma', logo: figmaBadge },
  { id: 'guidde', logo: guiddeBadge },
  { id: 'honeybook', logo: honeybookBadge },
  { id: 'audiocodes', logo: audiocodesBadge },
  { id: 'overwolf', logo: overwolfBadge },
  { id: 'gong', logo: gongBadge },
  { id: 'houzz', logo: houzzBadge },
]

const PARTICIPANT_BY_ID = Object.fromEntries(PICKME_PARTICIPANTS.map((p) => [p.id, p]))

const COMPANY_FILE_TO_ID = {
  Figma: 'figma',
  Guidde: 'guidde',
  HoneyBook: 'honeybook',
  AudioCodes: 'audiocodes',
  Overwolf: 'overwolf',
  Gong: 'gong',
  houzz: 'houzz',
}

/** Legacy editor sample names → current participant ids. */
export const LEGACY_PICKME_SAMPLE_IDS = {
  'pickme-logo-wolf.png': 'overwolf',
  'pickme-logo-hybk.png': 'honeybook',
  'pickme-logo-star.png': 'gong',
  'pickme-overwolf.png': 'overwolf',
  'pickme-honeybook.png': 'honeybook',
  'pickme-gong.png': 'gong',
}

export function resolvePickMeParticipantBySampleName(sampleFileName) {
  const legacyId = LEGACY_PICKME_SAMPLE_IDS[sampleFileName]
  if (legacyId) return PARTICIPANT_BY_ID[legacyId] ?? null

  const companyMatch = /^company=([A-Za-z]+)\.png$/.exec(sampleFileName ?? '')
  if (companyMatch) {
    const id = COMPANY_FILE_TO_ID[companyMatch[1]]
    if (id) return PARTICIPANT_BY_ID[id] ?? null
  }

  const match = /^pickme-([a-z]+)\.(png|svg)$/.exec(sampleFileName ?? '')
  if (match) return PARTICIPANT_BY_ID[match[1]] ?? null
  return null
}

/** Fisher–Yates shuffle (mutates array). */
function shuffleInPlace(items, random = Math.random) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

/** Pick `count` random participants from the full pool. */
export function pickRandomPickMeParticipants(count = PICKME_CAROUSEL_COUNT) {
  const pool = [...PICKME_PARTICIPANTS]
  shuffleInPlace(pool)
  return pool.slice(0, count)
}
