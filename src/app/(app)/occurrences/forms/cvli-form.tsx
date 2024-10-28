import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, Plus, Trash } from "lucide-react-native";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup } from "@/components/input-group";
import {
  getOrcrim,
  type OrcrimBody,
  type OrcrimResponse,
} from "@/api/get-orcrim";
import { SelectFilter } from "@/components/select";
import data from "@/assets/data.json";

export default function CvliForm() {
  const [orcrims, setOrcrims] = useState<OrcrimBody[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [occurrenceType, setOccurrenceType] = useState<string>("");

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

  return (
    <ScrollView ref={scrollViewRef} className="flex-1">
      <View className="m-4">
        <SelectFilter
          label="Selecione o tipo de ocorrência"
          onSelect={(value) => console.log(value)}
          options={data.occurrencesTypes}
          placeholder="Selecione uma opção"
        />
      </View>
    </ScrollView>
  );
}
