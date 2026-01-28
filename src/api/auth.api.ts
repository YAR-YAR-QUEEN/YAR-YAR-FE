import { apiClient } from "./client";
import { setAccessToken } from "../utils/token";
import type { LoginRequestDto, LoginResponseDto, SignupRequestDto, UserDto } from "../types/dto";

export const signup = (payload: SignupRequestDto) => {
  return apiClient.post<UserDto>("/auth/signup", payload, { skipAuth: true });
};

export const login = async (payload: LoginRequestDto) => {
  const response = await apiClient.post<LoginResponseDto>("/auth/login", payload, {
    skipAuth: true,
  });

  if (response.data.accessToken) {
    await setAccessToken(response.data.accessToken);
  }

  return response;
};
