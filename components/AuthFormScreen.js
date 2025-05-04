import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInput from "./AppTextInput";

export default function AuthFormScreen({
  schema,
  defaultValues,
  fields,
  onSubmit,
  isLoading,
  title,
  error,
  subtitle,
  buttonLabel,
  bottomText,
  bottomActionText,
  onBottomActionPress,
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fefefe" }}>
      <View style={styles.container}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.secondaryText}>{subtitle}</Text>

        {fields.map(({ name, placeholder, ...rest }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors[name]?.message}
                touched={touchedFields[name]}
                {...rest}
              />
            )}
          />
        ))}
        {!!error && (
          <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          )}
        </TouchableOpacity>

        {bottomText && (
          <View style={styles.bottomContainer}>
            <Text style={{ color: "#333" }}>{bottomText}</Text>
            <TouchableOpacity onPress={onBottomActionPress}>
              <Text style={{ color: "#3B82F6", fontWeight: "500" }}>
                {bottomActionText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1a1a1a",
    width: "80%",
  },
  secondaryText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginBottom: 30,
    width: "80%",
  },
  button: {
    backgroundColor: "#6d63ff",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
