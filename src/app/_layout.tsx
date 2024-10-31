import "expo-dev-client";
import "@/styles/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "@/utils/context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SessionProvider>
      <GluestackUIProvider mode="light">
        <Slot />
        <StatusBar barStyle="dark-content" />
      </GluestackUIProvider>
    </SessionProvider>
  );
}
