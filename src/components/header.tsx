import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Popover, { PopoverMode } from "react-native-popover-view";
import { DropdownHeader } from "./dropdown-header";
import { LogOut, ReceiptText, UserPen } from "lucide-react-native";
import AuthContext from "@/utils/context";

export default function Header({ title }: { title: string }) {
  const navigation = useNavigation();
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSignOut = () => {
    // Lógica para sair do app
    console.log("Sign out");
  };

  return (
    <SafeAreaView>
      <View className="w-full gap-4 px-4 h-16 flex-row items-center justify-between bg-slate-600">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="sidebar" size={28} color="#94a3b8" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold  text-zinc-300">{title}</Text>

        <Popover
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
          <View className="w-80 bg-white p-4 rounded-xl">
            <Text className="text-lg font-bold">{user?.name}</Text>
            <Text className="mb-2">Agente - CoordOInt</Text>
            <View className="h-px bg-slate-200"></View>
            <TouchableOpacity
              className="py-4 flex-row gap-2 items-center"
              onPress={() => {
                setPopoverVisible(false);
                // navigation.navigate("Account"); // Navegar para a página de conta
              }}
            >
              <UserPen size={18} color={"black"} />
              <Text className="text-zinc-700">Meu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-4 flex-row gap-2 items-center"
              onPress={() => {
                setPopoverVisible(false);
                // navigation.navigate("Account"); // Navegar para a página de conta
              }}
            >
              <ReceiptText size={18} color={"black"} />
              <Text className="text-zinc-700">Termos de uso</Text>
            </TouchableOpacity>

            <View className="h-px bg-slate-200"></View>
            <TouchableOpacity
              className="py-4 flex-row gap-2 items-center"
              onPress={() => {
                setPopoverVisible(false);
                handleSignOut();
              }}
            >
              <LogOut size={18} color={"black"} />
              <Text className="text-red-500">Sair</Text>
            </TouchableOpacity>
          </View>
        </Popover>
      </View>
    </SafeAreaView>
  );
}
