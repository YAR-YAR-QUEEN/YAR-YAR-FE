import type { ImageSourcePropType } from 'react-native';
import type { ItemType } from '../constants';

type ItemLike = {
  id?: number;
  itemId?: number;
  name?: string | null;
  type?: ItemType | null;
};

const FILTER_IMAGE = require('../assets/tiers/tier_2.png');
const BUFF_IMAGE = require('../assets/tiers/tier_4.png');
const FALLBACK_IMAGE = require('../assets/tiers/tier_1.png');

const readString = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

const resolveItemType = (item: ItemLike): ItemType | undefined => {
  if (item.type === 'FILTER' || item.type === 'BUFF') {
    return item.type;
  }
  const record = item as Record<string, unknown>;
  const rawType = record.itemType ?? record.item_type ?? record.type;
  return rawType === 'FILTER' || rawType === 'BUFF' ? rawType : undefined;
};

export const getItemDisplayName = (item: ItemLike): string => {
  const record = item as Record<string, unknown>;
  const name =
    readString(item.name) ??
    readString(record.itemName) ??
    readString(record.item_name) ??
    readString(record.title) ??
    readString(record.itemTitle);
  if (name) return name;

  const type = resolveItemType(item);
  const base = type === 'FILTER' ? 'Filter' : type === 'BUFF' ? 'Buff' : 'Item';
  const id = item.id ?? item.itemId ?? (typeof record.item_id === 'number' ? record.item_id : undefined);
  return typeof id === 'number' ? `${base} #${id}` : base;
};

export const getItemImageSource = (item: ItemLike): ImageSourcePropType => {
  const type = resolveItemType(item);
  if (type === 'FILTER') return FILTER_IMAGE;
  if (type === 'BUFF') return BUFF_IMAGE;
  return FALLBACK_IMAGE;
};
