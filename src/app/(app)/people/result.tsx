import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { Loading } from "@/components/loading";
import { useRouter, useGlobalSearchParams } from "expo-router";
import {
  fetchPeople,
  type PeopleResponse,
  type Person,
} from "@/api/fetch-people";

const filterLabels: Record<string, string> = {
  name: "Nome",
  cpf: "CPF",
  rg: "RG",
  birthDate: "DN",
  mother: "Mãe",
  nickname: "Apelido",
};

export default function Result() {
  const navigation = useRouter();
  const { filters } = useGlobalSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const parsedFilters = filters ? JSON.parse(filters as string) : {};

  const queryPeople = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);
    try {
      const response = (await fetchPeople({
        page,
        filters: parsedFilters,
      })) as PeopleResponse;
      const newPeople = response.data;

      setHasMore(response.current_page < response.last_page);

      setPeople((prevPeople) => [...prevPeople, ...newPeople]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryPeople();
  }, []);

  const loadMore = () => {
    if (hasMore && !loading) {
      queryPeople();
    }
  };

  if (loading && people.length === 0) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <View className="mt-2 flex-1">
        {people.length === 0 ? ( // Mostra mensagem quando não há pessoas e o campo está vazio
          <Text className="text-center text-gray-500">
            Nenhum resultado encontrado!
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
            ListHeaderComponent={
              <View className="flex-row flex-wrap gap-1 mx-4 my-2 items-start">
                {Object.entries(parsedFilters).map(([key, value]) => (
                  <View
                    key={key}
                    className="mb-1 px-2 py-1 rounded-full bg-blue-500 "
                  >
                    <Text
                      className="text-gray-100"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {`${filterLabels[key] || key}: ${value}`}
                    </Text>
                  </View>
                ))}
              </View>
            }
            ListFooterComponent={loading ? <Loading /> : null}
          />
        )}
      </View>
    </View>
  );
}
