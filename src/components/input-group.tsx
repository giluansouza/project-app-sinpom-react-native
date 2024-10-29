import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { KeyboardTypeOptions } from "react-native";
import { Text, TextInput, View } from "react-native";

export const InputGroup = ({
  label,
  control,
  name,
  errors,
  multiline = false,
  keyboardType = "default",
}: {
  label: string;
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <View className="px-4 py-2 gap-2">
      <Text className="text-gray-700 text-sm mb-1 font-medium">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={label}
            {...{ multiline }}
            numberOfLines={multiline ? 3 : 1}
            keyboardType={keyboardType || "default"}
          />
        )}
      />
      {errors[name] && (
        <Text className="text-red-500">
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </View>
  );
};
