import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Popover, { PopoverMode } from "react-native-popover-view";
import { DropdownHeader } from "./dropdown-header";

export default function Header({ title }: { title: string }) {
  const navigation = useNavigation();
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const handleSignOut = () => {
    // Lógica para sair do app
    console.log("Sign out");
  };

  return (
    <SafeAreaView>
      <View className="w-full gap-4 px-4 h-14 flex-row items-center justify-between bg-slate-600">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="sidebar" size={28} color="#94a3b8" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold  text-zinc-300">{title}</Text>

        {/* <Popover
          isVisible={isPopoverVisible}
          onRequestClose={() => setPopoverVisible(false)}
          from={
            <TouchableOpacity onPress={() => setPopoverVisible(true)}>
              <Image
                source={require("@/assets/avatar.png")}
                className="w-10 h-10 rounded-full"
              />
            </TouchableOpacity>
          }
        >
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-lg font-bold">Giluan Souza</Text>
            <Text className="mb-2">Agente - CoordOInt</Text>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                setPopoverVisible(false);
                // navigation.navigate("Account"); // Navegar para a página de conta
              }}
            >
              <Text className="text-blue-500">Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                setPopoverVisible(false);
                handleSignOut();
              }}
            >
              <Text className="text-red-500">Sair</Text>
            </TouchableOpacity>
          </View>
        </Popover> */}
        <DropdownHeader />
      </View>
    </SafeAreaView>
  );
}
