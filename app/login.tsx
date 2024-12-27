import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createSession } from "@/lib/api/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Pressable, StyleSheet, Alert } from "react-native";
import { loginSchema, type LoginSchema } from "@/lib/validations";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Input } from "@/components/ui/Input";

export default function LoginScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await createSession(data);
      router.replace("/(authenticated)/(tabs)");
    } catch (error) {
      Alert.alert("Failed to login", error?.message);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Login</ThemedText>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                placeholderTextColor="#ccc"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
              />
              {error && (
                <ThemedText style={styles.errorText}>
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                placeholderTextColor="#ccc"
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
              {error && (
                <ThemedText style={styles.errorText}>
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </Pressable>

        <ThemedView>
          <ThemedText>Don't have an account?</ThemedText>
          <Pressable style={styles.button} onPress={() => router.replace("/")}>
            <ThemedText style={styles.buttonText}>Register</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
