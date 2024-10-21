import React, { useContext, useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/custom-drawer-content";
import { setStatusBarStyle } from "expo-status-bar";
import { Redirect } from "expo-router";
import AuthContext from "@/utils/context";
import Header from "@/components/header";

export default function AppLayout() {
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setStatusBarStyle("light");
  //   }, 0);
  // }, []);

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerStatusBarAnimation: "fade",
        // header: ({ options }) => <Header title={options.title ?? "SinPom"} />,
        headerStyle: { backgroundColor: "#2c3644" },
        headerTintColor: "#aebcd0",
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Início" }} />
      {/* Documents */}
      <Drawer.Screen name="(documents)/entry" options={{ title: "Entrada" }} />
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
  );
}
