import { http } from './http';
import type { ItemDto } from '../types/dto';

export const fetchItems = () => {
  return http.get<ItemDto[]>('/items');
};
