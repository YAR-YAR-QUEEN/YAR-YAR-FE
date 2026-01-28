import { apiClient } from "./client";
import type { ReelsListItemResponseDto } from "../types/dto";

export const fetchReelsList = (userId: number) => {
  return apiClient.get<ReelsListItemResponseDto[]>("/reels", {
    params: { userId },
  });
};
