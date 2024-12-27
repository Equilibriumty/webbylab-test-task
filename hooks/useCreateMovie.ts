import { createMovie } from "@/lib/api/movies";
import type { CreateMovie } from "@/lib/validations/movie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["movies"],
    mutationFn: (dto: CreateMovie) => createMovie(dto),
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["movies"] }),
    onError: (e) => {
      Alert.alert("Failed to create movie", e.message);
    },
  });
};
