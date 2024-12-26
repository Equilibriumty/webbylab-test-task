import { Stack, useRouter } from "expo-router";
import { Button } from "react-native";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="movie/[id]"
        options={{
          title: "Movie Details",
          presentation: "modal",
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.back()} />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
