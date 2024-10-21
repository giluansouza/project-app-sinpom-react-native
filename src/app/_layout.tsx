import "@/styles/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { loadUser } from "@/services/auth-service";
import AuthContext from "@/utils/context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function runEffect() {
      try {
        const user = await loadUser();
        setUser(user);
      } catch (e) {
        console.log("Failed to load user", e);
      }
    }

    runEffect();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GluestackUIProvider mode="dark">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" />
            {/* <Stack.Screen name="(app)" /> */}
          </Stack>
        </GestureHandlerRootView>
        <StatusBar barStyle="dark-content" />
      </GluestackUIProvider>
    </AuthContext.Provider>
  );
}
