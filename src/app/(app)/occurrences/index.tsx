import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import data from "@/assets/data.json";
import { Loading } from "@/components/loading";
import { useRouter } from "expo-router";
import { Filter, Plus, Trash } from "lucide-react-native";
import { SelectFilter } from "@/components/select";

export default function index() {
  const navigation = useRouter();
  const [occurrences, setOccurrences] = useState<
    | {
        id: number;
        dateFact: string;
        type: string;
        opm: string;
        date: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [inputName, setInputName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOccurrences(data.occurrences);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    if (inputName === "") {
      return;
    }

    setOccurrences([]);
    // setPage(1);
    // setHasMore(true);
    // fetchPeople();
  };

  const handleClearFilter = () => {
    // setHasMore(true);
    setInputName("");
    setOccurrences([]);
    // setPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="m-4 gap-4">
            <View className="gap-2">
              <SelectFilter
                label="Selecione o tipo de ocorrência"
                onSelect={(value) => console.log(value)}
                options={data.occurrencesTypes}
                placeholder="Selecione uma opção"
              />
            </View>
            <View className="flex-row gap-1">
              <TouchableOpacity
                className="flex-1 bg-zinc-400 rounded-md px-4 h-12 items-center flex-row gap-2 justify-center shadow-lg"
                onPress={handleFilter}
              >
                <Filter color="white" size={24} />
                <Text className="text-center text-white text-lg">Filtrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-orange-500 rounded-md px-4 h-12 justify-center shadow-lg"
                onPress={handleClearFilter}
              >
                <Trash color="white" size={24} />
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-500 flex-row items-center rounded-md px-4 h-12 justify-center shadow-lg"
                onPress={() => navigation.push("/occurrences/new")}
              >
                <Plus color="white" size={24} />
                <Text className="text-center text-white text-lg">Nova</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push(`/occurrences/${item.id.toString()}`)
            }
            className="mx-4 my-2 bg-white p-4 rounded-md shadow-lg"
          >
            <Text className="text-base">
              <Text className="font-bold">Data/Hora:</Text> {item.date}
            </Text>
            <Text className="text-base">
              <Text className="font-bold">Tipo:</Text> {item.type}
            </Text>
            <Text className="text-base">
              <Text className="font-bold">OPM:</Text> {item.opm}
            </Text>
            <Text className="text-base text-zinc-500">
              <Text className="font-bold">Lançada em:</Text> {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
