import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/custom-drawer-content";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/utils/context";
import Header from "@/components/header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Loading } from "@/components/loading";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerStatusBarAnimation: "fade",
          header: ({ options }) => <Header title={options.title ?? "SinPom"} />,
          // headerStyle: { backgroundColor: "#2c3644" },
          // headerTintColor: "#aebcd0",
        }}
      >
        <Drawer.Screen name="index" options={{ title: "Início" }} />
        {/* Documents */}
        <Drawer.Screen
          name="(documents)/entry"
          options={{ title: "Entrada" }}
        />
        <Drawer.Screen name="(documents)/output" options={{ title: "Saída" }} />
        <Drawer.Screen
          name="(documents)/my-drafts"
          options={{ title: "Meus rascunhos" }}
        />
        <Drawer.Screen
          name="(documents)/personal-archive"
          options={{ title: "Arquivo pessoal" }}
        />
        <Drawer.Screen
          name="(documents)/section-files"
          options={{ title: "Arquivos da seção" }}
        />
        {/* Analytics */}
        <Drawer.Screen name="people" options={{ title: "Pessoas" }} />
        {/* Occurrences */}
        <Drawer.Screen name="occurrences" options={{ title: "Ocorrências" }} />
        {/* Help */}
        <Drawer.Screen name="tutorial" options={{ title: "Tutorial" }} />
        <Drawer.Screen name="help" options={{ title: "Ajuda" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
