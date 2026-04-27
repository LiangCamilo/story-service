export const StoryStatusConstants = [
  'IN_PROGRESS',
  'COMPLETED',
  'ABANDONED',
  'PAUSED',
] as const;

export type AllowedStatus = (typeof StoryStatusConstants)[number];
