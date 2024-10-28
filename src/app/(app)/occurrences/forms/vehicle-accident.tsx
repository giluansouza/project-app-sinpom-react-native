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

const formSchema = z.object({
  name: z.string().optional(), //.min(1, "Nome é obrigatório"),
  cpf: z.string().optional(), //.min(11, "CPF inválido"),
  rg: z.string().optional(), //.min(7, "RG inválido"),
  birthDate: z.string().optional(), //.min(1, "Data de nascimento é obrigatória"),
  gender: z.string().optional(), //.min(1, "Sexo é obrigatório"),
  father: z.string().optional(),
  mother: z.string().optional(),
  profession: z.string().optional(),
  color: z.string().optional(),
  nicknames: z.string().optional(),
  crimeGroup: z.string().optional(),
  function: z.string().optional(),
  priority: z.string().optional(),
  hasCriminalRecords: z.boolean().optional(),
  recordDescription: z.string().optional(),
  workArea: z.string().optional(),
  addresses: z
    .array(
      z.object({
        location: z.string().optional(),
        district: z.string().optional(),
        number: z.string().optional(),
        ref_point: z.string().optional(),
        city_id: z.string().optional(),
      })
    )
    .optional(),
  traits: z
    .array(
      z.object({
        trait: z.string().optional(),
        location: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function VehicleAccidentForm() {
  const [orcrims, setOrcrims] = useState<OrcrimBody[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      rg: "",
      birthDate: "",
      gender: "",
      father: "",
      mother: "",
      profession: "",
      color: "",
      nicknames: "",
      crimeGroup: "",
      function: "",
      priority: "",
      hasCriminalRecords: false,
      recordDescription: "",
      workArea: "",
      addresses: [],
      traits: [],
    },
  });

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
      <InputGroup
        label="Data do fato"
        control={control}
        name="name"
        errors={errors}
      />

      <InputGroup
        label="Descrição"
        control={control}
        name="cpf"
        errors={errors}
      />
    </ScrollView>
  );
}
