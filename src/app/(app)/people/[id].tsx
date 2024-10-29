import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { Loading } from "@/components/loading";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { type Person } from "@/api/fetch-people";
import { getPeopleById } from "@/api/get-people-by-id";

export default function People() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [people, setPeople] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPeopleById({ id: Number(id) });

        if (!response) {
          throw new Error("Pessoa não encontrada");
        }

        setPeople(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1">
      <View className="p-4 bg-white">
        <Image
          className="w-30 h-30 rounded-md"
          source={require("@/assets/avatar.png")}
        />
        <View className="mt-4 gap-2">
          <Text className="text-base">
            <Text className="font-bold">Nome:</Text> {people?.name}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Profissão:</Text> {people?.profession}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Mãe:</Text> {people?.mother}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Pai:</Text> {people?.father}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">CPF:</Text> {people?.cpf}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">RG:</Text> {people?.rg}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Nascimento:</Text>{" "}
            {people?.birthDate &&
              new Date(people?.birthDate).toLocaleDateString("pt-BR")}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Endereço:</Text> Não informado
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Facção:</Text> {people?.crimeGroup}
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Função:</Text> Não informado
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Registro:</Text> Não informado
          </Text>
          <Text className="text-base">
            <Text className="font-bold">Área de atuação:</Text> Não informado
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="m-4 p-4 bg-blue-500 rounded-lg"
      >
        <Text className="text-white text-center">Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
