// components/AppTextInput.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppTextInput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = secureTextEntry;

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isPasswordField && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={styles.input}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#808080"
            />
          </TouchableOpacity>
        )}
      </View>

      {touched && error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  error: {
    color: "red",
    fontSize: 13,
    fontWeight: 500,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default AppTextInput;
