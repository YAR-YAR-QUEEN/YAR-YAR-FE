import { http } from './http';
import type { ItemDto, UserItemDto } from '../types/dto';

export const fetchItems = () => {
  return http.get<ItemDto[]>('/items');
};

export const fetchUserItems = (userId: number) => {
  return http.get<UserItemDto[]>(`/users/${userId}/items`);
};
