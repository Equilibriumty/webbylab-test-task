import { StyleSheet, TextInput, Pressable, Alert } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { type RegisterSchema, registerSchema } from "@/lib/validations";
import { createUser } from "@/lib/api/users";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Input } from "@/components/ui/Input";

export default function RegisterScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const user = await createUser(data);
      router.push("/(authenticated)/(tabs)");
    } catch (error) {
      Alert.alert("Failed to register", error?.message);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Register</ThemedText>

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
          name="name"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                placeholderTextColor="#ccc"
                placeholder="Name"
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

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Input
                placeholderTextColor="#ccc"
                placeholder="Confirm Password"
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
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </Pressable>

        <ThemedView>
          <ThemedText>Already have an account?</ThemedText>
          <Pressable
            style={styles.button}
            onPress={() => router.replace("/login")}
          >
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
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
