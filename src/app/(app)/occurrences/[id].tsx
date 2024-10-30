import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, UrlTile } from "react-native-maps";
import { Loading } from "@/components/loading";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import MapView from "react-native-maps";
import type { OccurrenceBody } from "@/api/fetch-occurrences";
import { getOccurenceById } from "@/api/get-occurrence-by-id";
import type { Person } from "@/api/fetch-people";

export default function Occurrence() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [occurrence, setOccurrence] = useState<OccurrenceBody | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const queryOccurrences = async () => {
      setLoading(true);

      try {
        const response = await getOccurenceById({ id: Number(id) });

        if (!response) {
          throw new Error("Ocorrência não encontrada");
        }

        const result = response.data;

        console.log(result);
        setOccurrence(result);
        navigation.setOptions({ title: result.type || "Ocorrência" });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    queryOccurrences();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1">
      {/* <View className="mx-4 mt-4 p-4 bg-white rounded-md">
        <Text className="text-base">
          <Text className="font-bold">Tipo:</Text> {occurrence?.type}
        </Text>
      </View> */}

      <View className="m-4 p-4 bg-white rounded-md">
        <View>
          <Text className="text-lg">
            <Text className="font-bold">Registrado por:</Text>{" "}
            {occurrence?.opm || "Não informado"}
          </Text>
          {occurrence?.opm ? (
            <Text className="text-lg">
              <Text className="font-bold">Ocorrência originária:</Text>{" "}
              {occurrence.opm}
            </Text>
          ) : (
            <Text className="text-lg">
              <Text className="font-bold">Motivação:</Text> Outros
            </Text>
          )}
          <Text className="text-lg">
            <Text className="font-bold">Data/Hora:</Text>{" "}
            {occurrence?.occurred_at &&
              new Date(occurrence?.occurred_at).toLocaleString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
          </Text>
          <Text className="text-lg">
            <Text className="font-bold">Local:</Text>{" "}
            {occurrence?.city?.city_name || "Não informado"}
          </Text>
          <Text className="text-lg">
            <Text className="font-bold">Área de responsabilidade:</Text>{" "}
            {occurrence?.opm || "Não informado"}
          </Text>
          <Text className="text-lg">
            <Text className="font-bold">Grupo crime predominante na área:</Text>{" "}
            {occurrence?.orcrim?.orcrim_name || "Não informado"}
          </Text>
        </View>

        <View>
          <Text className="text-lg font-bold mt-4">Entidades</Text>
          {occurrence?.people?.length ? (
            (occurrence.people as Person[]).map((v: Person) => (
              <Link
                key={v.id}
                className="text-blue-500 mt-1"
                href={`/occurrences/modal?oid=${id}&id=${v.id}`}
                // disabled={v.disabled}
              >
                {v.name}
                {/* {v.status && v.status + ": "} {v.name} */}
                {/* {v.profession && ", " + v.profession + ", "} */}
                {/* {v.service} */}
                {/* {v.condition && ", " + v.condition} */}
              </Link>
            ))
          ) : (
            <Text>Nenhuma entidade associada.</Text>
          )}
        </View>

        <View>
          <Text className="text-lg font-bold mt-4">
            Descrição da ocorrência
          </Text>
          <Text>{occurrence?.description || "Não informado"}</Text>
          <Text className="text-lg">
            <Text className="font-bold">Número da ocorrência na DP:</Text> 000
          </Text>
        </View>

        <View className="mt-4 h-72">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: parseFloat(
                occurrence?.latitude?.toString() || "-9.420794"
              ),
              longitude: parseFloat(
                occurrence?.longitude?.toString() || "-40.507595"
              ),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <UrlTile
              urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
            />

            {occurrence?.latitude !== undefined &&
            occurrence?.longitude !== undefined ? (
              <Marker
                coordinate={{
                  latitude: parseFloat(occurrence.latitude.toString()),
                  longitude: parseFloat(occurrence.longitude.toString()),
                }}
              />
            ) : (
              <Text className="text-center">
                Nenhuma localização disponível.
              </Text>
            )}
          </MapView>
        </View>
      </View>

      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="m-4 p-4 bg-blue-500 rounded-lg"
      >
        <Text className="text-white text-center">Voltar</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}
