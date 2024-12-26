export type Actor = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type MovieFormat = "DVD" | "VHS";

export type CreatedMovie = {
  id: number;
  title: string;
  year: number;
  format: MovieFormat;
  actors: Actor[];
  createdAt: string;
  updatedAt: string;
};

export type Movie = Omit<CreatedMovie, "actors">;

export type MovieSearchParams = {
  limit: number;
  offset: number;
  order: "ASC" | "DESC";
  search: string;
};

export type MovieList = Movie[];
