import { http } from './http';
import type { GameStateDto, GameStateResponseDto } from '../types/dto';

export const fetchGameState = async (userId: number): Promise<GameStateDto> => {
  const response = await http.get<GameStateResponseDto>(`/users/${userId}/games`);
  const { awareness, ...rest } = response.data;

  return {
    ...rest,
    awareness: awareness ?? 0,
  };
};
