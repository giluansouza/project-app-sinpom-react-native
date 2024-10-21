import { View, Text } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomDrawerContent(props: any) {
  const { navigation } = props;

  return (
    <View className="bg-slate-700" style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View className="flex-1 border-b border-zinc-400 my-4 py-4">
          <Text className="text-2xl font-bold px-4 text-zinc-200">SINPOM</Text>
        </View>

        <DrawerItem
          label="Início"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("index")}
          icon={({ color, size }) => (
            <MaterialIcons name="home" size={24} color="#94a3b8" />
          )}
        />

        <Text className="text-lg font-bold px-4 text-slate-300">
          Documentos
        </Text>

        <DrawerItem
          label="Entrada"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("(documents)/entry")}
          icon={({ color, size }) => (
            <MaterialIcons name="input" size={24} color="#94a3b8" />
          )}
        />
        <DrawerItem
          label="Saída"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("(documents)/output")}
          icon={({ color, size }) => (
            <MaterialIcons name="output" size={24} color="#94a3b8" />
          )}
        />
        <DrawerItem
          label="Meus rascunhos"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("(documents)/my-drafts")}
          icon={({ color, size }) => (
            <MaterialIcons name="drafts" size={24} color="#94a3b8" />
          )}
        />
        <DrawerItem
          label="Arquivo pessoal"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("(documents)/personal-archive")}
          icon={({ color, size }) => (
            <MaterialIcons name="inventory" size={24} color="#94a3b8" />
          )}
        />
        <DrawerItem
          label="Arquivos da seção"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("(documents)/section-files")}
          icon={({ color, size }) => (
            <MaterialIcons name="archive" size={24} color="#94a3b8" />
          )}
        />

        <Text className="text-lg font-bold px-4 text-slate-300">Análise</Text>
        <DrawerItem
          label="Pessoas"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("people")}
          icon={({ color, size }) => (
            <MaterialIcons name="groups" size={24} color="#94a3b8" />
          )}
        />

        <View className="border-b border-zinc-400 my-2"></View>
        <DrawerItem
          label="Ocorrências"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("occurrences")}
          icon={({ color, size }) => (
            <MaterialIcons name="file-copy" size={24} color="#94a3b8" />
          )}
        />

        <View className="border-b border-zinc-400 my-2"></View>
        <DrawerItem
          label="Tutorial"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("tutorial")}
          icon={({ color, size }) => (
            <MaterialIcons name="info" size={24} color="#94a3b8" />
          )}
        />
        <DrawerItem
          label="Ajuda"
          inactiveTintColor="#f1f5f9"
          activeTintColor="#f8fafc"
          onPress={() => navigation.navigate("help")}
          icon={({ color, size }) => (
            <MaterialIcons name="help" size={24} color="#94a3b8" />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
}
