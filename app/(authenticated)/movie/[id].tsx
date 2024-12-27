import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useGetMovie } from "@/hooks/useGetMovie";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, ScrollView } from "react-native";

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams<{ id: number }>();
  const { data, isLoading } = useGetMovie(params.id);
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      navigation.setOptions({ title: data?.title });
    }
  }, [data, navigation]);

  if (!data || isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.infoContainer}>
          <ThemedText style={styles.label}>Year:</ThemedText>
          <ThemedText style={styles.info}>{data?.year}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoContainer}>
          <ThemedText style={styles.label}>Format:</ThemedText>
          <ThemedText style={styles.info}>{data?.format}</ThemedText>
        </ThemedView>

        <ThemedText style={styles.sectionTitle}>Cast</ThemedText>
        <ThemedView style={styles.actorsContainer}>
          {data?.actors?.map((actor) => (
            <ThemedView key={actor.id} style={styles.actorCard}>
              <ThemedText darkColor="#777" style={styles.actorName}>
                {actor.name}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    width: 80,
  },
  info: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  actorsContainer: {
    paddingHorizontal: 20,
  },
  actorCard: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  actorName: {
    fontSize: 16,
  },
});
