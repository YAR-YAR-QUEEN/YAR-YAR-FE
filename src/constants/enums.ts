export type Phase = 'DAY' | 'NIGHT';

export type PetitionType = 'POSITIVE' | 'NEGATIVE';

export type FactionSide = 'OPEN' | 'CLOSE';

export type ItemType = 'FILTER' | 'BUFF';

export type EffectType = 'REELS_MULTIPLIER' | 'AUTHORITY_BUFF';

export type MindsimReason =
  | 'REELS_SETTLEMENT'
  | 'ITEM_PURCHASE'
  | 'DAILY_DECAY'
  | 'MANIPULATION'
  | 'EVENT_REWARD'
  | 'EVENT_PENALTY';

export type EventType =
  | 'CENSORSHIP'
  | 'HIDDEN_ENDING'
  | 'DAEWONGUN_RETURN';