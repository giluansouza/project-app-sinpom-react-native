import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Loading } from "@/components/loading";
import { useFocusEffect, useRouter } from "expo-router";
import { GetPeople, type PeopleResponse, type Person } from "@/api/get-people";
import { Plus, Trash } from "lucide-react-native";

export default function Index() {
  const navigation = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPeople = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);
    try {
      const response = (await GetPeople({
        page,
        id: null,
        name: inputName,
      })) as PeopleResponse;
      const newPeople = response.data;

      setHasMore(response.current_page < response.last_page);

      setPeople((prevPeople) => [...prevPeople, ...newPeople]);
      setPage((prevPage) => prevPage + 1); // Incrementa a página para a próxima requisição
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setInputName("");
  //     setPeople([]);
  //     setPage(1);
  //     setHasMore(true);
  //   }, [])
  // );

  const handleFilter = () => {
    if (inputName === "") {
      return;
    }

    setPeople([]);
    setPage(1);
    setHasMore(true);
    fetchPeople();
  };

  const handleClearFilter = () => {
    setHasMore(true);
    setInputName(""); // Limpa o input
    setPeople([]); // Limpa a lista de pessoas
    setPage(1); // Reseta a página para a primeira
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchPeople();
    }
  };

  if (loading && people.length === 0) {
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
        <View className="flex-row gap-1">
          <TouchableOpacity
            className="flex-1 bg-zinc-400 rounded-md px-4 h-12 justify-center shadow-lg"
            onPress={handleFilter}
          >
            <Text className="text-center text-white text-lg">Filtrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-orange-500 rounded-md px-4 h-12 justify-center shadow-lg"
            onPress={handleClearFilter}
          >
            <Trash color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        {people.length === 0 ? ( // Mostra mensagem quando não há pessoas e o campo está vazio
          <Text className="text-center text-gray-500">
            Digite um nome para pesquisar!
          </Text>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.push(`/people/${item.id}`)}
                className="mx-4 my-2 bg-white p-4 rounded-md shadow-lg flex-row"
              >
                <Image
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("@/assets/avatar.png")
                  }
                  className="w-16 h-16 rounded-full"
                  style={{ marginRight: 16 }}
                />
                <View className="flex-1 justify-center">
                  <Text className="text-lg font-bold">{item.name}</Text>
                  <Text className="text-sm text-gray-500">CPF: {item.cpf}</Text>
                </View>
              </TouchableOpacity>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.9}
            ListFooterComponent={loading ? <Loading /> : null}
          />
        )}
      </View>
      <TouchableOpacity
        className="m-4 flex-row gap-2 items-center bg-blue-500 rounded-md px-4 h-12 justify-center shadow-lg"
        onPress={() => navigation.push("/(app)/people/new")}
      >
        <Plus color="white" size={24} />
        <Text className="text-white text-lg">Nova</Text>
      </TouchableOpacity>
    </View>
  );
}
