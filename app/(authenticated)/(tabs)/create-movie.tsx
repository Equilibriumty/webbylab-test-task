import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { type CreateMovie, createMovieSchema } from "@/lib/validations/movie";
import { Picker } from "@react-native-picker/picker";
import { useCreateMovie } from "@/hooks/useCreateMovie";
import { Input } from "@/components/ui/Input";

export default function CreateMovieScreen() {
  const router = useRouter();
  const { mutate } = useCreateMovie();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateMovie>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: "",
      year: 2012,
      format: "DVD",
      actors: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "actors",
  });

  const onSubmit = async (data: CreateMovie) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        router.navigate("/");
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        bottomOffset={50}
        keyboardDismissMode="none"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ThemedView style={{ flex: 1, padding: 10 }}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Movie Title"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <ThemedText style={{ color: "red" }}>
              {errors.title.message}
            </ThemedText>
          )}

          <Controller
            defaultValue="DVD"
            control={control}
            name="format"
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="DVD" value="DVD" />
                <Picker.Item label="VHS" value="VHS" />
              </Picker>
            )}
          />
          {errors.format && (
            <ThemedText style={{ color: "red" }}>
              {errors.format.message}
            </ThemedText>
          )}

          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Year"
                value={value?.toString()}
                keyboardType="numeric"
                onChangeText={(val) => {
                  const parsed = val === "" ? "" : Number.parseInt(val);
                  onChange(parsed);
                }}
              />
            )}
          />
          {errors.year && (
            <ThemedText style={{ color: "red" }}>
              {errors.year.message}
            </ThemedText>
          )}
          <ThemedView style={{ gap: 10, marginTop: 10 }}>
            {fields.map((field, index) => (
              <ThemedView key={field.id}>
                <ThemedView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Controller
                    control={control}
                    name={`actors.${index}`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Actor Name"
                        value={value}
                        style={{ flex: 1 }}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  <Pressable
                    onPress={() => remove(index)}
                    style={{
                      backgroundColor: "red",
                      height: 40,
                      padding: 5,
                      borderRadius: 5,
                      justifyContent: "center",
                    }}
                  >
                    <ThemedText style={{ color: "white" }}>Remove</ThemedText>
                  </Pressable>
                </ThemedView>
                {errors?.actors?.[index] && (
                  <ThemedText style={{ color: "red" }}>
                    {errors.actors[index].message}
                  </ThemedText>
                )}
              </ThemedView>
            ))}
            {errors.actors && (
              <ThemedText style={{ color: "red" }}>
                {errors.actors.root?.message || errors.actors.message}
              </ThemedText>
            )}
          </ThemedView>
          <ThemedView style={{ gap: 10, marginTop: 10 }}>
            <Pressable
              onPress={() => append("")}
              style={{
                backgroundColor: "blue",
                padding: 10,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <ThemedText style={{ color: "white" }}>Add Actor</ThemedText>
            </Pressable>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <ThemedText style={{ color: "white" }}>Create Movie</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: "#ccc",
    borderWidth: 1,
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
