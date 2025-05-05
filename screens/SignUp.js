import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerService } from "@/api/register";
import { setUser } from "@/store/slices/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import AuthFormScreen from "@/components/AuthFormScreen";

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });

  const { mutateAsync: userRegister, isLoading } = useMutation({
    mutationFn: (data) =>
      registerService.register(data.email, data.username, data.password),
    onSuccess: (data) => {
      navigation.navigate("Main");
      dispatch(
        setUser({
          id: data[0].id,
          username: data[0].username,
          events: data[0].registeredEventIds,
        })
      );
    },
    onError: () => setError("An error occurred during registration"),
  });

  return (
    <AuthFormScreen
      schema={SignupSchema}
      defaultValues={{ username: "", email: "", password: "" }}
      fields={[
        { name: "username", placeholder: "Username" },
        { name: "email", placeholder: "Email", keyboardType: "email-address" },
        { name: "password", placeholder: "Password", secureTextEntry: true },
      ]}
      onSubmit={(data) => userRegister(data)}
      isLoading={isLoading}
      title="Let's Register Account"
      subtitle="Hello, you have a grateful journey"
      buttonLabel="Sign Up"
      bottomText="Already have an account? "
      bottomActionText="Login"
      onBottomActionPress={() => navigation.navigate("Login")}
      error={error}
      setError={setError}
    />
  );
}
