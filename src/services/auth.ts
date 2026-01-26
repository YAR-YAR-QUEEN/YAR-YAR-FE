import { http } from "./http";

export const signup = (payload: {
  nickname: string;
  email: string;
  password: string;
}) => {
  return http.post("/auth/signup", payload);
};

export const login = (payload: { email: string; password: string }) => {
  return http.post("/auth/login", payload);
};
