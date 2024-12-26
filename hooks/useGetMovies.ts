import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "@/lib/api/movies";
import type { MovieSearchParams } from "@/lib/types/movies";

export const GET_MOVIES_KEYS = {
  movies: "movies",
  movieSearch: "movie-search",
} as const;

export const useGetMovies = (
  key: (typeof GET_MOVIES_KEYS)[keyof typeof GET_MOVIES_KEYS],
  params?: Partial<MovieSearchParams>,
  options?: { enabled?: boolean },
) => {
  return useInfiniteQuery({
    queryKey: [key, params],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getMovies({
        params: {
          ...params,
          offset: pageParam,
        },
      });
      return {
        movies: response || [],
        nextOffset: pageParam,
        hasMore: (response?.length || 0) === 10,
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return lastPage.nextOffset + 10;
    },
    initialPageParam: params?.offset || 0,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.movies),
      pageParams: data.pageParams,
    }),
    enabled: options?.enabled ?? true,
  });
};
