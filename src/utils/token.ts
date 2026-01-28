import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "accessToken";
const isWeb = Platform.OS === "web";

const getWebStorage = (): Storage | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  try {
    if (isWeb) {
      const storage = getWebStorage();
      storage?.setItem(ACCESS_TOKEN_KEY, token);
      return;
    }

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // Intentionally noop: storage failures should not crash the app.
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    if (isWeb) {
      const storage = getWebStorage();
      return storage?.getItem(ACCESS_TOKEN_KEY) ?? null;
    }

    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const removeAccessToken = async (): Promise<void> => {
  try {
    if (isWeb) {
      const storage = getWebStorage();
      storage?.removeItem(ACCESS_TOKEN_KEY);
      return;
    }

    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // Intentionally noop: storage failures should not crash the app.
  }
};
