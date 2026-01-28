import { http } from './http';
import type { ReelsListItemDto, ReelsListItemResponseDto } from '../types/dto';

export const fetchReelsList = async (userId: number): Promise<ReelsListItemDto[]> => {
  const response = await http.get<ReelsListItemResponseDto[]>('/reels', {
    params: { userId },
  });

  return response.data.map((item) => ({
    id: item.id,
    videoUrl: item.videoUrl,
    thumbnailUrl: item.thumbnailUrl ?? null,
    dopamine: item.dopamin,
    buzz: item.buzz,
    awareness: item.awareness,
    reelsScore: item.reelsScore,
    petitionId: item.petitionId,
    createdAt: item.createAt,
  }));
};
