import axios from "axios";
import * as SecureStore from "expo-secure-store";
import type { APIResponse } from "../types";

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");

  config.headers.Authorization = token;
  return config;
});

client.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data as APIResponse<any>,
    };
  },
  (error) => {
    if (error.response) {
      return {
        error: {
          code: error.response.data.error || "UNKNOWN_ERROR",
          status: error.response.status,
          fields: error.response.data.fields || {},
        },
      };
    }
    return Promise.reject(error);
  },
);
