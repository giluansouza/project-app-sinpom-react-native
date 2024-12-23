import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: true }} />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          title: "Nova Ocorrência",
        }}
      />
    </Stack>
  );
}
