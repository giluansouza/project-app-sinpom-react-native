import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FormTextField } from "@/components/form-text-fied";
import { router } from "expo-router";
import { loadUser, login } from "@/services/auth-service";
import AuthContext from "@/utils/context";

interface Errors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleLogin = async () => {
    setErrors({});

    try {
      await login({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();

      if (user) {
        router.replace("/(app)");
      }
    } catch (e: any) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
      console.log(e);
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

        {errors.email && (
          <Text className="text-red-500 my-4">{errors?.email}</Text>
        )}

        <TouchableOpacity
          className="w-full rounded-md bg-blue-500 p-3 items-center justify-center mt-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
