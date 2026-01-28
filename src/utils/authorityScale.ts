const MIN_SCALE = 0.8;
const MAX_SCALE = 1.2;

const RATIO_MIN = 0;
const RATIO_MAX = 1;
const DEFAULT_RATIO = 0.5;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const AUTHORITY_SCALE_RANGE = {
  min: MIN_SCALE,
  max: MAX_SCALE,
};

export const getAuthorityScale = (authority: number, totalAuthority: number) => {
  const ratio = totalAuthority > RATIO_MIN ? authority / totalAuthority : DEFAULT_RATIO;
  const clampedRatio = clamp(ratio, RATIO_MIN, RATIO_MAX);
  return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * clampedRatio;
};
