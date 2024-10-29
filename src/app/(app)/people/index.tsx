import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { Loading } from "@/components/loading";
import { useRouter } from "expo-router";
import { Plus, Trash } from "lucide-react-native";
import { z } from "zod";
import { InputGroup } from "@/components/input-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup2 } from "@/components/select-group2";
import { fetchOrcrim, type OrcrimBody } from "@/api/fetch-orcrim";
import { fetchCities, type CityBody } from "@/api/fetch-cities";

const cpfRegex = /^\d{11}$/;
const validateCPF = (cpf: string) => cpfRegex.test(cpf);

const filterSchema = z.object({
  name: z.string().optional(),
  nickname: z.string().optional(),
  enrollment: z.number().optional(),
  mother: z.string().optional(),
  orcrimId: z.string().optional(),
  workArea: z.string().optional(),
  district: z.string().optional(),
  cityId: z.string().optional(),
  cpf: z
    .string()
    .optional()
    .refine((cpf) => !cpf || validateCPF(cpf), {
      message: "CPF deve ter 11 dígitos numéricos",
    }),
  rg: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface ListItems {
  label: string;
  value: string;
}

export default function Index() {
  const navigation = useRouter();
  const [loading, setLoading] = useState(false);
  const [orcrims, setOrcrims] = useState<ListItems[]>([]);
  const [cities, setCities] = useState<ListItems[]>([]);

  useEffect(() => {
    const queries = async () => {
      setLoading(true);
      try {
        const [orcrimResponse, citiesResponse] = await Promise.all([
          fetchOrcrim(),
          fetchCities(),
        ]);

        setOrcrims(
          orcrimResponse.data.map((item: OrcrimBody) => ({
            label: item.orcrim_name,
            value: item.id.toString(),
          }))
        );

        setCities(
          citiesResponse.data.map((item: CityBody) => ({
            label: item.city_name,
            value: item.id.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    queries();
  }, []);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      orcrimId: "",
      cityId: "",
    }
  });

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (data: FilterFormData) => {
    if (Object.values(data).every((value) => !value)) {
      reset();
      alert("Por favor, preencha pelo menos um filtro.");
      return;
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value)
    );

    navigation.push({
      pathname: "/(app)/people/result",
      params: { filters: JSON.stringify(filteredData) },
    });
  };

  return (
    <View className="flex-1">
      <ScrollView>
        <InputGroup
          control={control}
          errors={errors}
          label="Nome"
          name="name"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="Apelido da pessoa"
          name="nickname"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="Matrícula de PM"
          name="enrollment"
          keyboardType="numeric"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="Nome da mãe"
          name="mother"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="CPF"
          name="cpf"
          keyboardType="numeric"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="RG"
          name="rg"
          keyboardType="numeric"
        />

        <SelectGroup2
          control={control}
          error={errors}
          label="Grupo-crime"
          name="orcrimId"
          options={orcrims}
          placeholder="Selecione..."
        />

        <InputGroup
          control={control}
          errors={errors}
          label="Área de atuação"
          name="workArea"
        />

        <InputGroup
          control={control}
          errors={errors}
          label="Bairro"
          name="district"
        />

        <SelectGroup2
          control={control}
          error={errors}
          label="Cidade"
          name="cityId"
          options={cities}
          placeholder="Selecione..."
        />
      </ScrollView>

      <View className="mx-4 mt-4 flex-row gap-1">
        <TouchableOpacity
          className="flex-1 bg-zinc-600 rounded-md px-4 h-12 justify-center shadow-lg"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-white text-lg">Consultar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-500 rounded-md px-4 h-12 justify-center shadow-lg"
          onPress={() => reset()}
        >
          <Trash color="white" size={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="m-4 flex-row gap-2 items-center bg-blue-500 rounded-md px-4 h-12 justify-center shadow-lg"
        onPress={() => navigation.push("/(app)/people/new")}
      >
        <Plus color="white" size={24} />
        <Text className="text-white text-lg">Nova pessoa</Text>
      </TouchableOpacity>
    </View>
  );
}
