import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  getOrcrim,
  type OrcrimBody,
  type OrcrimResponse,
} from "@/api/get-orcrim";
import { SelectFilter } from "@/components/select";
import data from "@/assets/data.json";
import VehicleAccidentForm from "./forms/vehicle-accident";
import CvliForm from "./forms/cvli-form";

type OccurrenceType = "148" | "cvli"; // Adicione outros tipos conforme necessário

// Interface para o mapeamento de componentes
const formComponents: Record<OccurrenceType, React.ComponentType> = {
  148: VehicleAccidentForm,
  cvli: CvliForm,
};

export default function New() {
  const [orcrims, setOrcrims] = useState<OrcrimBody[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [occurrenceType, setOccurrenceType] = useState<OccurrenceType | "">("");

  useEffect(() => {
    const fetchOrcrim = async () => {
      const response = (await getOrcrim()) as OrcrimResponse;

      setOrcrims(response.data);
    };

    fetchOrcrim();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  const FormComponent = occurrenceType ? formComponents[occurrenceType] : null;

  return (
    <ScrollView ref={scrollViewRef} className="flex-1">
      <View className="m-4">
        <SelectFilter
          label="Selecione o tipo de ocorrência"
          onSelect={(value) => setOccurrenceType(value as OccurrenceType)}
          options={data.occurrencesTypes}
          placeholder="Selecione uma opção"
          disabled={!!occurrenceType}
        />
      </View>

      <View>
        {FormComponent ? (
          <FormComponent />
        ) : (
          <Text className="text-center">
            Selecione um tipo de ocorrência para começar
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
