// import { Controller, type Control, type FieldErrors } from "react-hook-form";
// import { StyleSheet, Text, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// export const SelectGroup = ({
//   label,
//   control,
//   name,
//   errors,
//   data,
//   valueKey = "value",
//   labelKey = "label",
// }: {
//   label: string;
//   control: Control<any>;
//   name: string;
//   errors: FieldErrors;
//   data: any[];
//   valueKey?: string;
//   labelKey?: string;
// }) => {
//   return (
//     <View className="px-4 py-3 gap-2">
//       <Text className="text-zinc-500">{label}</Text>
//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <Picker
//             selectedValue={value} // Vincula o valor do Picker ao valor do campo
//             onValueChange={(itemValue) => {
//               onChange(itemValue); // Atualiza o estado do formulário
//             }}
//             onBlur={onBlur}
//             mode="dropdown"
//             style={styles.picker}
//           >
//             {data.map((item) => (
//               <Picker.Item
//                 key={item[valueKey]}
//                 label={item[labelKey]}
//                 value={item[valueKey]}
//               />
//             ))}
//           </Picker>
//         )}
//       />
//       {errors[name] && (
//         <Text className="text-red-500">
//           {errors[name]?.message?.toString()}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   picker: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB", // cor semelhante a border-zinc-300
//     borderRadius: 4, // equivalente a rounded-md
//     padding: 8, // equivalente a p-2
//     backgroundColor: "#F9FAFB", // equivalente a bg-zinc-50
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5, // Para Android
//   },
// });
