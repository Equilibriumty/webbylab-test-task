import type { Movie } from "@/lib/types/movies";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useDeleteMovie } from "@/hooks/useDeleteMovie";

type MovieItemProps = Movie;

export const MovieItem = (props: MovieItemProps) => {
  const { title, year, format, id } = props;
  const router = useRouter();
  const { mutate } = useDeleteMovie();

  return (
    <ThemedView
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Pressable
        onPress={() => router.push(`/movie/${id}`)}
        style={{ flex: 1 }}
      >
        <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
          {title}
        </ThemedText>
        <ThemedText>{year}</ThemedText>
        <ThemedText>{format}</ThemedText>
      </Pressable>
      <Pressable onPress={() => mutate(id)}>
        <ThemedText style={{ color: "red" }}>Delete</ThemedText>
      </Pressable>
    </ThemedView>
  );
};
