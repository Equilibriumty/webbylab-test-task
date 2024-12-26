import { ThemedView } from "@/components/ThemedView";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { GET_MOVIES_KEYS, useGetMovies } from "@/hooks/useGetMovies";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Movie } from "@/lib/types/movies";
import { useDebounce } from "@/hooks/useDebounce";
import { NoMovies } from "@/components/NoMovies";
import { MovieItem } from "@/components/MovieItem";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Input } from "@/components/ui/Input";

const limit = 10;

export default function SearchMoviesScreen() {
  const tintColor = useThemeColor({}, "tint");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetMovies(
    GET_MOVIES_KEYS.movieSearch,
    {
      limit,
      order: "ASC",
      search: debouncedSearch.length > 1 ? debouncedSearch : undefined,
    },
    {
      enabled: debouncedSearch.length > 1,
    },
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderMovie = ({ item }: { item: Movie }) => <MovieItem {...item} />;

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" style={{ padding: 20 }} />;
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={{ padding: 10 }}>
          <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              placeholder="Search movies"
              value={search}
              onChangeText={setSearch}
              style={{ flex: 1, marginBottom: 0 }}
            />
            <Pressable
              onPress={handleClearSearch}
              style={{ padding: 10, marginLeft: 8 }}
            >
              <ThemedText style={{ color: tintColor }}>Clear</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
        {!data || (data?.pages && data?.pages.length === 0) ? (
          <NoMovies />
        ) : (
          <FlatList
            data={data?.pages || []}
            renderItem={renderMovie}
            keyExtractor={(item) => item?.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
