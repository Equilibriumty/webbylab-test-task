import { deleteMovie } from "@/lib/api/movies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_MOVIES_KEYS } from "./useGetMovies";

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteMovie(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [GET_MOVIES_KEYS.movies] });
      queryClient.refetchQueries({ queryKey: [GET_MOVIES_KEYS.movieSearch] });
    },
  });
};
