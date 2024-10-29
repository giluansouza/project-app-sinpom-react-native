import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, Plus, Trash } from "lucide-react-native";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup } from "@/components/input-group";
import {
  fetchOrcrim,
  type OrcrimBody,
  type OrcrimResponse,
} from "@/api/fetch-orcrim";
import { functions, priorities } from "@/assets/data.json";
import { SelectGroup2 } from "@/components/select-group2";
import { AddressGroup } from "@/components/address-group";
import { TraitGroup } from "@/components/trait-group";
import { fetchCities, type CityBody } from "@/api/fetch-cities";
import { Loading } from "@/components/loading";

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

interface ListItems {
  label: string;
  value: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [orcrims, setOrcrims] = useState<ListItems[]>([]);
  const [cities, setCities] = useState<ListItems[]>([]);
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

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
  };

  const handleFormSubmit = () => {
    // Encontra o primeiro campo com erro
    const firstErrorField = Object.keys(errors)[0];

    // Obtém a posição do campo com erro e rola até ele
    if (firstErrorField) {
      const errorIndex = Object.keys(formSchema.shape).indexOf(firstErrorField);
      scrollViewRef.current?.scrollTo({ y: errorIndex * 100, animated: true });
    }

    handleSubmit(onSubmit)();
  };

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  const {
    fields: traitFields,
    append: appendTrait,
    remove: removeTrait,
  } = useFieldArray({
    control,
    name: "traits",
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView ref={scrollViewRef} className="flex-1">
      <InputGroup label="Nome" control={control} name="name" errors={errors} />

      <InputGroup label="CPF" control={control} name="cpf" errors={errors} />

      <InputGroup label="RG" control={control} name="rg" errors={errors} />

      <InputGroup
        label="Data de nascimento"
        control={control}
        name="birthDate"
        errors={errors}
      />

      <InputGroup
        label="Sexo"
        control={control}
        name="gender"
        errors={errors}
      />

      <InputGroup label="Mãe" control={control} name="mother" errors={errors} />

      <InputGroup label="Pai" control={control} name="father" errors={errors} />

      <InputGroup
        label="Profissão"
        control={control}
        name="profession"
        errors={errors}
      />

      <InputGroup label="Cor" control={control} name="color" errors={errors} />

      <View className="border-t border-zinc-300 mx-6" />
      <InputGroup
        label="Apelidos (separe com vírgula)"
        control={control}
        name="nickNames"
        errors={errors}
      />

      <View className="border-t border-zinc-300 mx-6" />
      {/* Grupo de Endereços */}
      <TouchableOpacity
        onPress={() =>
          appendAddress({
            location: "",
            district: "",
            number: "",
            ref_point: "",
            city_id: "",
          })
        }
        className="m-4 flex-row gap-2 items-center bg-zinc-400 rounded-md px-4 h-12 justify-center shadow-lg"
      >
        <Plus color="white" size={24} />
        <Text className="text-white text-lg">Adicionar Endereço</Text>
      </TouchableOpacity>
      {addressFields.map((field, index) => (
        <View key={field.id} className="mb-4 bg-zinc-300">
          <AddressGroup
            control={control}
            errors={errors}
            index={index}
            cities={cities}
          />
          <TouchableOpacity
            onPress={() => removeAddress(index)}
            className="m-4 flex-row gap-2 items-center rounded-md px-4 h-12 justify-center shadow-lg bg-red-400"
          >
            <Trash color="white" size={24} />
            <Text className="text-white">Remover Endereço</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Grupo de Marcas */}
      <TouchableOpacity
        onPress={() =>
          appendTrait({ trait: "", location: "", description: "" })
        }
        className="m-4 flex-row gap-2 items-center bg-zinc-400 rounded-md px-4 h-12 justify-center shadow-lg"
      >
        <Plus color="white" size={24} />
        <Text className="text-white text-lg">Adicionar Marca</Text>
      </TouchableOpacity>
      {traitFields.map((field, index) => (
        <View key={field.id} className="mb-4 bg-zinc-300">
          <TraitGroup control={control} errors={errors} index={index} />
          <TouchableOpacity
            onPress={() => removeTrait(index)}
            className="m-4 flex-row gap-2 items-center rounded-md px-4 h-12 justify-center shadow-lg bg-red-400"
          >
            <Trash color="white" size={24} />
            <Text className="text-white">Remover Marca</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View className="border-t border-zinc-300 mx-6" />

      <SelectGroup2
        control={control}
        name="crimeGroup"
        label="Selecione o grupo-crime"
        options={orcrims}
        placeholder="Selecione o grupo-crime"
        rules={{}}
        error={errors}
      />

      <SelectGroup2
        control={control}
        name="function"
        label="Escolha a função"
        options={functions}
        placeholder="Selecione uma função"
        rules={{}}
        error={errors}
      />

      <SelectGroup2
        control={control}
        name="priority"
        label="Escolha a prioridade"
        options={priorities}
        placeholder="Selecione uma prioridade"
        rules={{}}
        error={errors}
      />

      {/* <View className="p-4">
        <Text className="text-zinc-500">Possui registros criminais?</Text>
      </View> */}

      <View className="border-t border-zinc-300 mx-6" />
      <InputGroup
        label="Descrição dos registros (Infoseg, portal SSP, etc)"
        control={control}
        name="Descrição dos registros (Infoseg, portal SSP, etc)"
        errors={errors}
        multiline
      />

      <InputGroup
        label="Área de atuação (listar bairros, comunidades, etc)"
        control={control}
        name="Área de atuação (listar bairros, comunidades, etc)"
        errors={errors}
        multiline
      />

      <TouchableOpacity
        onPress={handleFormSubmit}
        className="m-4 flex-row gap-2 items-center bg-blue-400 rounded-md px-4 h-12 justify-center shadow-lg"
      >
        <Text className="text-white text-lg">Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
