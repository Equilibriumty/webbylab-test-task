import { ThemedView } from "@/components/ThemedView";
import { FlatList, ActivityIndicator } from "react-native";
import { GET_MOVIES_KEYS, useGetMovies } from "@/hooks/useGetMovies";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Movie } from "@/lib/types/movies";
import { MovieItem } from "@/components/MovieItem";
import { NoMovies } from "@/components/NoMovies";

const limit = 10;

export default function HomeScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useGetMovies(
    GET_MOVIES_KEYS.movies,
    {
      limit,
      order: "ASC",
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        {data && data?.pages.length === 0 ? (
          <NoMovies />
        ) : (
          <FlatList
            refreshing={isLoading}
            onRefresh={refetch}
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
