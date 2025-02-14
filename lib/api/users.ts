import * as SecureStore from "expo-secure-store";
import type { LoginSchema, RegisterSchema } from "../validations";
import { client } from ".";
import type { APIResponse } from "../types";

export const createUser = async (dto: RegisterSchema) => {
  const response = await client.post<APIResponse<{ token: string }>>(
    "/v1/users",
    dto,
  );

  if (response.data.error) {
    throw new Error(JSON.stringify(response.data.error));
  }

  const user = {
    email: dto.email,
    name: dto.name,
    token: response.data.token,
  };

  await SecureStore.setItemAsync("token", user.token);

  return user;
};

export const createSession = async (dto: LoginSchema) => {
  const response = await client.post<APIResponse<{ token: string }>>(
    "/v1/sessions",
    dto,
  );

  if (response.data.error) {
    throw new Error(JSON.stringify(response.data.error));
  }

  const user = {
    email: dto.email,
    token: response.data.token,
  };

  await SecureStore.setItemAsync("token", user.token);

  return user;
};
