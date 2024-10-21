import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack 
      // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{
        presentation: 'modal',
        title: 'Entidade',
      }} />
    </Stack>
  )
}