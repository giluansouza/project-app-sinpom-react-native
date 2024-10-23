import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FormTextField } from "@/components/form-text-fied";
import { useSession } from "@/utils/context";
import { router } from "expo-router";

interface Errors {
  general?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErrors({});
    setIsSubmitting(true);

    const result = await login(email, password);

    setIsSubmitting(false);

    if (result === true) {
      router.replace("/(app)");
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: result as string,
      }));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-6 py-6">
        <Text className="text-3xl font-bold text-zinc-700">SINPOM</Text>

        <FormTextField
          label="Email"
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          keyboardType="email-address"
        />
        <FormTextField
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={true}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />

        {errors.general && (
          <Text className="text-red-500 my-4">{errors?.general}</Text>
        )}

        <TouchableOpacity
          className="w-full rounded-md bg-blue-500 p-3 items-center justify-center mt-4"
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4">
          <Text>Acesso:</Text>
          <Text>user@owl.com</Text>
          <Text>12345678</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
