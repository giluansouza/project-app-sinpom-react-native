import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";

import data from "@/assets/data.json";
import { Loading } from "@/components/loading";
import { useRouter } from "expo-router";

export default function index() {
  const navigation = useRouter();
  const [people, setPeople] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setPeople(data.people)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const handleFilter = () => {
    setLoading(true);
    const filteredPeople = data.people?.filter((person) => {
      return person.name.toLowerCase().includes(inputName.toLowerCase());
    });

    if (filteredPeople) {
      setPeople(filteredPeople);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <View className="m-4 gap-4">
        <View className="gap-2">
          <Text>Nome da pessoa</Text>
          <TextInput
            className="border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50"
            placeholder="Digite o nome da pessoa"
            value={inputName}
            onChangeText={setInputName}
          />
        </View>
        <TouchableOpacity
          className="px-4 h-12 justify-center"
          onPress={() => navigation.navigate("/(app)/people/modal")}
        >
          <Text className="text-center text-blue-500 text-lg">
            Mais filtros
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 rounded-md px-4 h-12 justify-center shadow-lg"
          onPress={handleFilter}
        >
          <Text className="text-center text-white text-lg">Consultar</Text>
        </TouchableOpacity>
      </View>

      {people && (
        <FlatList
          data={people}
          keyExtractor={(item: {
            id: number;
            name: string;
            condition: string;
            address: string;
          }) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push(`/people/${item.id.toString()}`)}
              className="mx-4 my-2 bg-white p-4 rounded-md shadow-lg"
            >
              <Text className="text-base">
                {item.name} - {item.condition}
              </Text>
              <Text className="text-base">
                <Text className="font-bold">Endereços:</Text> {item.address}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {!people && (
        <View className="flex-1 items-center">
          <Text className="text-lg">Pesquise por</Text>
          <Text className="text-lg">- Wendel</Text>
          <Text className="text-lg">- LUCICLEIDE FURTADO DA SILVA</Text>
          <Text className="text-lg">- Edivaldo</Text>
          <Text className="text-lg">
            - Ou clique em consultar sem digitar nome para retornar todos
          </Text>
        </View>
      )}
    </View>
  );
}
