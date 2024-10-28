import { View } from "react-native";
import { InputGroup } from "./input-group";
import type { Control, FieldErrors } from "react-hook-form";
import { SelectGroup2 } from "./select-group2";

export const TraitGroup = ({
  control,
  errors,
  index,
}: {
  control: Control<any>;
  errors: FieldErrors;
  index: number;
}) => {
  return (
    <View className="p-2 gap-2 border">
      <View className="mx-4">
        <SelectGroup2
          label="Marcas"
          control={control}
          name={`trait.${index}.trait`}
          error={errors}
          options={[
            { label: "Tatuagem", value: "1" },
            { label: "Deformidade física", value: "2" },
            { label: "Cicatriz", value: "3" },
          ]}
          placeholder="Selecione uma marca"
        />
      </View>

      <View className="mx-4">
        <SelectGroup2
          label="Local"
          control={control}
          name={`trait.${index}.location`}
          error={errors}
          options={[
            { label: "Cabeça", value: "Cabeça" },
            { label: "Pescoço", value: "Pescoço" },
            { label: "Ombro direito", value: "Ombro direito" },
            { label: "Ombro esquerdo", value: "Ombro esquerdo" },
            { label: "Braço direito", value: "Braço direito" },
            { label: "Braço esquerdo", value: "Braço esquerdo" },
            { label: "Cotovelo direito", value: "Cotovelo direito" },
            { label: "Cotovelo esquerdo", value: "Cotovelo esquerdo" },
            { label: "Pulso direito", value: "Pulso direito" },
            { label: "Pulso esquerdo", value: "Pulso esquerdo" },
            { label: "Mão direita", value: "Mão direita" },
            { label: "Mão esquerda", value: "Mão esquerda" },
            { label: "Tronco frente", value: "Tronco frente" },
            { label: "Tronco costa", value: "Tronco costa" },
            { label: "Perna direita", value: "Perna direita" },
            { label: "Perna esquerda", value: "Perna esquerda" },
            { label: "Joelho direito", value: "Joelho direito" },
            { label: "Joelho esquerdo", value: "Joelho esquerdo" },
            { label: "Tornozelo direito", value: "Tornozelo direito" },
            { label: "Tornozelo esquerdo", value: "Tornozelo esquerdo" },
            { label: "Pé direito", value: "Pé direito" },
            { label: "Pé esquerdo", value: "Pé esquerdo" },
          ]}
          placeholder="Selecione um local"
        />
      </View>

      <InputGroup
        label="Descrição"
        control={control}
        name={`trait.${index}.description`}
        errors={errors}
      />
    </View>
  );
};
