import { describe, expect, it } from "vitest";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING
} from "@/features/motion/motion.config";

describe("F7 motion configuration", () => {
  it("uses the approved restrained timing scale", () => {
    expect(MOTION_DURATION.micro).toBeGreaterThanOrEqual(0.12);
    expect(MOTION_DURATION.component).toBeLessThan(MOTION_DURATION.section);
    expect(MOTION_DURATION.hero).toBeLessThanOrEqual(1.2);
  });

  it("reduces movement distance on mobile", () => {
    expect(MOTION_DISTANCE.mobile).toBeLessThan(MOTION_DISTANCE.desktop);
    expect(MOTION_DISTANCE.desktop).toBeLessThan(MOTION_DISTANCE.hero);
  });

  it("provides valid cubic bezier easing tuples", () => {
    expect(MOTION_EASING.standard).toHaveLength(4);
    expect(MOTION_EASING.emphasized).toHaveLength(4);
    for (const value of [...MOTION_EASING.standard, ...MOTION_EASING.emphasized]) {
      expect(Number.isFinite(value)).toBe(true);
    }
  });
});
