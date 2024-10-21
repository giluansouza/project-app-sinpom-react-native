import { View, TextInput, Text } from "react-native";

export function FormTextField({
  label,
  ...rest
}: {
  label?: string;
  [key: string]: any;
}) {
  return (
    <View className="w-full gap-2 mb-2">
      {label && <Text className="text-zinc-500">{label}</Text>}
      <TextInput
        className="border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50"
        autoCapitalize="none"
        {...rest}
      />
    </View>
  );
}
