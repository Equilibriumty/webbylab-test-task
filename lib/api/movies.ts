import type {
  CreatedMovie,
  Movie,
  MovieList,
  MovieSearchParams,
} from "../types/movies";
import type { APIResponse } from "../types";
import type { CreateMovie } from "../validations/movie";
import { Alert } from "react-native";
import { client } from ".";

export const getMovies = async ({
  params,
}: { params?: Partial<MovieSearchParams> }) => {
  const response = await client.get<APIResponse<{ data: MovieList }>>(
    "/v1/movies",
    { params },
  );

  if (response.data.error) {
    Alert.alert("response.data.error", JSON.stringify(response.data.error));
    return;
  }

  return response.data.data;
};

export const createMovie = async (dto: CreateMovie) => {
  const response = await client.post<APIResponse<CreatedMovie>>(
    "/v1/movies",
    dto,
  );

  if (response.data.error) {
    Alert.alert("response.data.error", JSON.stringify(response.data.error));
    return;
  }

  return response.data;
};

export const deleteMovie = async (id: Movie["id"]) => {
  const response = await client.delete<APIResponse<{ status: number }>>(
    `/v1/movies/${id}`,
  );

  if (response.data.error) {
    Alert.alert("response.data.error", JSON.stringify(response.data.error));
    return;
  }

  return response.data;
};

export const getMovie = async (id: Movie["id"]) => {
  const response = await client.get<APIResponse<{ data: CreatedMovie }>>(
    `/v1/movies/${id}`,
  );

  if (response.data.error) {
    Alert.alert("response.data.error", JSON.stringify(response.data.error));
    return;
  }
  return response.data.data;
};
