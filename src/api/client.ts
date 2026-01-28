import axios, { type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@env";
import { getAccessToken } from "../utils/token";

const AUTH_EXCLUDED_PATHS = ["/auth/login", "/auth/signup", "/auth/refresh"];

const getRequestPath = (config: InternalAxiosRequestConfig): string => {
  const url = config.url ?? "";
  const baseURL = config.baseURL ?? "";

  try {
    return new URL(url, baseURL).pathname;
  } catch {
    return url;
  }
};

const shouldSkipAuth = (
  config: InternalAxiosRequestConfig & { skipAuth?: boolean },
): boolean => {
  if (config.skipAuth) {
    return true;
  }

  const path = getRequestPath(config);
  return AUTH_EXCLUDED_PATHS.some((excluded) => path.startsWith(excluded));
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  if (shouldSkipAuth(config)) {
    return config;
  }

  const token = await getAccessToken();
  if (!token) {
    return config;
  }

  if (config.headers && "set" in config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});
