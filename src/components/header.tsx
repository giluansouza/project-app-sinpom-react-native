import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function Header({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="w-full gap-4 px-4 h-14 flex-row items-center justify-between bg-slate-600">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="sidebar" size={28} color="#94a3b8" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold  text-zinc-300">{title}</Text>
        <Image
          source={require("@/assets/avatar.png")}
          className="w-12 h-12 rounded-full"
        />
      </View>
    </SafeAreaView>
  );
}
