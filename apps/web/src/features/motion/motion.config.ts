import type { MotionEasingTuple, MotionIntensity } from "./types";

export const MOTION_DURATION = {
  micro: 0.16,
  component: 0.28,
  section: 0.58,
  hero: 0.96
} as const;

export const MOTION_EASING = {
  standard: [0.22, 1, 0.36, 1] as MotionEasingTuple,
  emphasized: [0.16, 1, 0.3, 1] as MotionEasingTuple
} as const;

export const MOTION_DISTANCE = {
  mobile: 12,
  desktop: 24,
  hero: 36
} as const;

export const MOTION_INTENSITY: Record<MotionIntensity, number> = {
  subtle: 0.55,
  standard: 1,
  hero: 1.35
};
