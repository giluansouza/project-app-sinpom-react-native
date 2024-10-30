import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { useRouter } from "expo-router";
import { Filter, Plus, Trash } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fetchOccurrences, type OccurrenceBody } from "@/api/fetch-occurrences";

export default function index() {
  const navigation = useRouter();
  const [occurrences, setOccurrences] = useState<OccurrenceBody[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const queryOccurrences = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchOccurrences({
        page,
        startDate: dateStart?.toISOString(),
        endDate: dateEnd?.toISOString(),
      });

      const result = response.data;
      setTotal(response.total);
      setHasMore(response.current_page < response.last_page);
      setOccurrences((prevPeople) => [...prevPeople, ...result]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryOccurrences();
  }, []);

  const handleFilter = async (formData: any) => {
    if (!dateStart && !dateEnd) {
      alert("Por favor, selecione pelo menos uma data.");
      return;
    }

    console.log("Clique filtro");

    queryOccurrences();
  };

  const resetFilters = () => {
    setOccurrences([]);
    setPage(1);
    setHasMore(true);
    setDateStart(null);
    setDateEnd(null);

    queryOccurrences();
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      queryOccurrences();
    }
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
            <View className="flex-row gap-2 items-center">
              <View className="flex-1 gap-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Data inicial
                </Text>
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                  <TextInput
                    placeholder="Data Inicial"
                    value={
                      dateStart ? new Date(dateStart).toLocaleDateString() : ""
                    }
                    editable={false}
                    className="border text-zinc-800 border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50"
                  />
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={dateStart || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowStartDatePicker(false);
                      if (selectedDate) {
                        setDateStart(selectedDate);
                      }
                    }}
                  />
                )}
              </View>

              {/* Campo de Data Final */}
              <View className="flex-1 gap-1">
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  Data final
                </Text>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                  <TextInput
                    placeholder="Data Final"
                    value={
                      dateEnd ? new Date(dateEnd).toLocaleDateString() : ""
                    }
                    editable={false}
                    className="border text-zinc-800 border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50"
                  />
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={dateEnd || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowEndDatePicker(false);
                      if (selectedDate) {
                        setDateEnd(selectedDate);
                      }
                    }}
                  />
                )}
              </View>
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
                onPress={resetFilters}
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

            <Text>Mostrando: {total}</Text>
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
              <Text className="font-bold">Data/Hora:</Text>{" "}
              {new Date(item?.occurred_at).toLocaleString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
            <Text className="text-base">
              <Text className="font-bold">Tipo:</Text> {item?.type}
            </Text>
            <Text className="text-base">
              <Text className="font-bold">OPM:</Text> {item?.opm}
            </Text>
            <Text className="text-base text-zinc-500">
              <Text className="font-bold">Lançada em: </Text>
              {new Date(item?.created_at).toLocaleString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </TouchableOpacity>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.9}
      />
    </View>
  );
}
