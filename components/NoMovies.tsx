import { ThemedText } from "./ThemedText";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export const NoMovies = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>No movies found</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
