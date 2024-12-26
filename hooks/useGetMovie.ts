import { getMovie } from "@/lib/api/movies";
import { useQuery } from "@tanstack/react-query";

export const useGetMovie = (id: number) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
  });
};
