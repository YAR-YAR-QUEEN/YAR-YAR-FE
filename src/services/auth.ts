import { http } from "./http";
import type { LoginRequestDto, SignupRequestDto, UserDto } from "../types/dto";

export const signup = (payload: SignupRequestDto) => {
  return http.post<UserDto>("/auth/signup", payload);
};

export const login = (payload: LoginRequestDto) => {
  return http.post<UserDto>("/auth/login", payload);
};
