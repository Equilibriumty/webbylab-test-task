export type APIError = {
  error: { code: string; fields: Record<string, string>; status: number };
};

export type APIResponse<T> = T & {
  error?: APIError["error"];
};
