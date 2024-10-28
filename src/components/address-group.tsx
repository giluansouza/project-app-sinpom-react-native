import { View } from "react-native";
import { InputGroup } from "./input-group";
import type { Control, FieldErrors } from "react-hook-form";
import { SelectGroup2 } from "./select-group2";

export const AddressGroup = ({
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
      <InputGroup
        label="Endereço (Av, rua, caminho, etc)"
        control={control}
        name={`addresses.${index}.location`}
        errors={errors}
      />
      <InputGroup
        label="Bairro/distrito/povoado"
        control={control}
        name={`addresses.${index}.district`}
        errors={errors}
      />
      <InputGroup
        label="Número"
        control={control}
        name={`addresses.${index}.number`}
        errors={errors}
      />
      <InputGroup
        label="Ponto de referência"
        control={control}
        name={`addresses.${index}.ref_point`}
        errors={errors}
      />

      <View className="mx-4">
        <SelectGroup2
          label="Cidade"
          control={control}
          name={`addresses.${index}.city_id`}
          error={errors}
          options={[]}
          placeholder="Selecione uma cidade"
        />
      </View>
    </View>
  );
};
