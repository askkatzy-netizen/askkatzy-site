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

  const isIdle = status === 'idle';
  const depth = computeSpinWheelDepth(index, count, offset);
  const angle = (2 * Math.PI * (index - offset)) / Math.max(1, count);
  const carouselX = Math.sin(angle) * wheelRadius;
  const linearX = (index - (count - 1) / 2) * logoStep;
  const idleWiggle = isIdle
    ? Math.sin(offset * 2.4 + index * 0.55) * SPIN_WHEEL_IDLE_WIGGLE_PX
    : 0;
  const baseX = isIdle ? linearX + idleWiggle : linearX * (1 - intensity) + carouselX * intensity;

  const spinSize = SPIN_WHEEL_LOGO_FAR + (SPIN_WHEEL_LOGO_MAX - SPIN_WHEEL_LOGO_FAR) * depth;
  const baseSize = SPIN_WHEEL_LOGO_BASE + (spinSize - SPIN_WHEEL_LOGO_BASE) * intensity;

  const isWinner = status === 'stopped' && winnerIndex === index;
  const hideForWinnerReveal = status === 'stopped' && !isWinner;

  const x = hideForWinnerReveal ? baseX * 0.2 : baseX;
  const size = isIdle
    ? SPIN_WHEEL_LOGO_BASE
    : isWinner
      ? SPIN_WHEEL_LOGO_MAX
      : hideForWinnerReveal
        ? SPIN_WHEEL_LOGO_FAR
        : baseSize;

  let blur = 0;

  const opacityScale = depthToOpacityScale(depth);
  const opacity = isIdle
    ? 1
    : hideForWinnerReveal
      ? 0
      : 0.6 + opacityScale * 0.4 * intensity + (1 - intensity) * 0.4;

  const depthLayer = Math.round(depth * 900);
  const zIndex = isIdle
    ? 100 + index
    : hideForWinnerReveal
      ? 2
      : isWinner
        ? 5000 + depthLayer
        : 100 + depthLayer + index;

  return {
    x,
    scale: size / SPIN_WHEEL_LOGO_BASE,
    opacity,
    blur,
    zIndex,
    isWinner,
    hideForWinnerReveal,
    isIdle,
  };
}

export function applySpinWheelLogoFrame(el, frame) {
  el.style.width = `${SPIN_WHEEL_LOGO_BASE}px`;
  el.style.height = `${SPIN_WHEEL_LOGO_BASE}px`;
  el.style.transform = `translate(-50%, -50%) translateX(${frame.x}px) scale(${frame.scale})`;
  el.style.opacity = String(frame.opacity);
  el.style.filter = frame.blur > 0.05 ? `blur(${frame.blur.toFixed(2)}px)` : 'none';
  el.style.zIndex = String(frame.zIndex);
}
