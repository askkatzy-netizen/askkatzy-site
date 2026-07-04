import { Children, isValidElement, useEffect, useRef } from 'react';
import {
  applySpinWheelLogoFrame,
  computeSpinWheelLogoFrame,
} from './spinWheelLogoFrame.js';
import './logoCarousel.css';

const IDLE_SPEED = 1.69;
const INTENSITY_RAMP = 3.2;

export function LogoCarousel({
  active,
  wheelRadius = 98,
  logoStep = 98,
  className,
  children,
}) {
  const logoRefs = useRef(new Map());
  const offsetRef = useRef(0);
  const intensityRef = useRef(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const activeRef = useRef(active);
  const wasActiveRef = useRef(false);
  const wheelRadiusRef = useRef(wheelRadius);
  const logoStepRef = useRef(logoStep);

  const items = Children.toArray(children).filter(isValidElement);
  const count = items.length;

  useEffect(() => {
    activeRef.current = active;
    wheelRadiusRef.current = wheelRadius;
    logoStepRef.current = logoStep;

    if (active && !wasActiveRef.current) {
      offsetRef.current = 0;
      intensityRef.current = 0;
    }
    wasActiveRef.current = active;
  }, [active, wheelRadius, logoStep]);

  useEffect(() => {
    if (count === 0) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function applyFrames() {
      const intensity = intensityRef.current;
      const reduceEffects =
        typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

      for (let index = 0; index < count; index++) {
        const el = logoRefs.current.get(index);
        if (!el) continue;
        applySpinWheelLogoFrame(
          el,
          computeSpinWheelLogoFrame({
            index,
            count,
            offset: offsetRef.current,
            speed: activeRef.current ? 1 : 0,
            intensity,
            status: 'holding',
            winnerIndex: null,
            logoStep: logoStepRef.current,
            wheelRadius: wheelRadiusRef.current,
            reduceEffects,
          }),
        );
      }
    }

    function frame(ts) {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const isActive = activeRef.current;
      const target = isActive ? 1 : 0;
      const step = INTENSITY_RAMP * dt;
      intensityRef.current =
        intensityRef.current < target
          ? Math.min(target, intensityRef.current + step)
          : Math.max(target, intensityRef.current - step);

      if (!reduced && (isActive || intensityRef.current > 0.001)) {
        offsetRef.current += IDLE_SPEED * dt;
      }

      applyFrames();
      rafRef.current = window.requestAnimationFrame(frame);
    }

    rafRef.current = window.requestAnimationFrame(frame);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [count]);

  if (count === 0) return null;

  return (
    <div className={['logo-carousel', className].filter(Boolean).join(' ')}>
      {items.map((child, index) => (
        <div
          key={child.key ?? index}
          ref={(el) => {
            if (el) logoRefs.current.set(index, el);
            else logoRefs.current.delete(index);
          }}
          className="logo-carousel__item"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
