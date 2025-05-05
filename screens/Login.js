import { useState } from "react";
import * as Yup from "yup";
import AuthFormScreen from "@/components/AuthFormScreen";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/api/login";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
  });

  const { mutateAsync: userLogin, isLoading } = useMutation({
    mutationFn: (data) => loginService.login(data.email, data.password),
    mutationKey: ["login"],
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
    onError: () => setError("Invalid email or password"),
  });

  return (
    <AuthFormScreen
      schema={LoginSchema}
      defaultValues={{ email: "", password: "" }}
      fields={[
        { name: "email", placeholder: "Email", keyboardType: "email-address" },
        { name: "password", placeholder: "Password", secureTextEntry: true },
      ]}
      onSubmit={(data) => userLogin(data)}
      isLoading={isLoading}
      title="Let's Sign You In"
      subtitle="Welcome Back"
      buttonLabel="Sign In"
      bottomText="Don't have an account? "
      bottomActionText="Register Now"
      onBottomActionPress={() => navigation.navigate("SignUp")}
      error={error}
      setError={setError}
    />
  );
}
