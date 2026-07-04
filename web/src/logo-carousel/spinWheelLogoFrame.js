export const SPIN_WHEEL_LOGO_BASE = 80;
export const SPIN_WHEEL_LOGO_FAR = 72;
export const SPIN_WHEEL_LOGO_MAX = 136;
export const SPIN_WHEEL_LOGO_GAP = 6;
export const SPIN_WHEEL_IDLE_WIGGLE_PX = 4;
/** Depth (0–1) at which opacity hits 1 and holds through peak size. */
export const SPIN_WHEEL_OPACITY_FULL_PLATEAU = 0.76;

function depthToOpacityScale(depth, plateauStart = SPIN_WHEEL_OPACITY_FULL_PLATEAU) {
  if (depth >= plateauStart) return 1;
  return depth / plateauStart;
}

function computeSpinWheelDepth(index, count, offset) {
  const angle = (2 * Math.PI * (index - offset)) / Math.max(1, count);
  return (Math.cos(angle) + 1) / 2;
}

export function computeSpinWheelLogoFrame(input) {
  const {
    index,
    count,
    offset,
    speed,
    intensity,
    status,
    winnerIndex,
    logoStep,
    wheelRadius,
    reduceEffects,
  } = input;

  const depth = computeSpinWheelDepth(index, count, offset);
  const angle = (2 * Math.PI * (index - offset)) / Math.max(1, count);
  const carouselX = Math.sin(angle) * wheelRadius;
  const linearX = (index - (count - 1) / 2) * logoStep;
  const wiggleFade = Math.max(0, 1 - intensity / 0.14);
  const idleWiggle =
    Math.sin(offset * 2.4 + index * 0.55) * SPIN_WHEEL_IDLE_WIGGLE_PX * wiggleFade;
  const baseX = linearX * (1 - intensity) + carouselX * intensity + idleWiggle;

  const spinSize = SPIN_WHEEL_LOGO_FAR + (SPIN_WHEEL_LOGO_MAX - SPIN_WHEEL_LOGO_FAR) * depth;
  const baseSize = SPIN_WHEEL_LOGO_BASE + (spinSize - SPIN_WHEEL_LOGO_BASE) * intensity;

  const isWinner = status === 'stopped' && winnerIndex === index;
  const hideForWinnerReveal = status === 'stopped' && !isWinner;

  const x = hideForWinnerReveal ? baseX * 0.2 : baseX;
  const size = isWinner
    ? SPIN_WHEEL_LOGO_MAX
    : hideForWinnerReveal
      ? SPIN_WHEEL_LOGO_FAR
      : baseSize;

  let blur = 0;

  const opacityScale = depthToOpacityScale(depth);
  const opacity = hideForWinnerReveal
    ? 0
    : 0.6 + opacityScale * 0.4 * intensity + (1 - intensity) * 0.4;

  const z = (depth - 0.5) * 120;
  const zIndex = hideForWinnerReveal
    ? 2
    : isWinner
      ? 5000 + Math.floor(depth * 9990)
      : 100 + Math.floor(depth * 9990) + index;

  return {
    x,
    z,
    scale: size / SPIN_WHEEL_LOGO_BASE,
    opacity,
    blur,
    zIndex,
    isWinner,
    hideForWinnerReveal,
    isIdle: intensity < 0.02,
  };
}

export function applySpinWheelLogoFrame(el, frame) {
  el.style.transform = `translate(-50%, -50%) translate3d(${frame.x}px, 0, ${frame.z}px) scale(${frame.scale})`;
  el.style.opacity = String(frame.opacity);
  el.style.filter = frame.blur > 0.05 ? `blur(${frame.blur.toFixed(2)}px)` : 'none';
  el.style.zIndex = String(frame.zIndex);
}
