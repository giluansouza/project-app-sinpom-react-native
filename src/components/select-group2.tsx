import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import { ChevronDown, Check } from "lucide-react-native";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

export const SelectGroup2 = ({
  label,
  options,
  placeholder = "Selecione uma opção",
  error,
  control,
  name,
  rules,
}: {
  label: string;
  options: any;
  placeholder: string;
  error: FieldErrors;
  control: Control<any>;
  name: string;
  rules?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className="px-4 py-3 gap-2">
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          const selectedOption = options.find(
            (opt: any) => opt.value === value
          );
          return (
            <View className="w-full">
              {label && (
                <Text className="text-gray-700 text-sm mb-1 font-medium">
                  {label}
                </Text>
              )}

              <TouchableOpacity
                onPress={toggleSelect}
                className={`flex-row items-center justify-between p-3 bg-white border rounded-lg ${
                  error?.message ? "border-red-500" : "border-gray-300"
                }`}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-base ${
                    !selectedOption ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <ChevronDown size={20} color="#6B7280" />
              </TouchableOpacity>

              {error?.message && (
                <Text className="text-red-500 text-sm mt-1">
                  {error[name]?.message?.toString()}
                </Text>
              )}

              <Modal
                visible={isOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsOpen(false)}
              >
                <TouchableOpacity
                  className="flex-1 bg-black/50"
                  activeOpacity={1}
                  onPress={() => setIsOpen(false)}
                >
                  <SafeAreaView className="flex-1 justify-end">
                    <View className="bg-white rounded-t-2xl max-h-[70%]">
                      <View className="p-4 border-b border-gray-200">
                        <Text className="text-lg font-semibold text-center">
                          {label || "Select Option"}
                        </Text>
                      </View>

                      <FlatList
                        data={options}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              if (value === item.value) {
                                onChange(""); // Limpa a seleção
                              } else {
                                onChange(item.value);
                              }
                              setIsOpen(false);
                            }}
                            className="flex-row items-center justify-between p-4 border-b border-gray-100"
                          >
                            <Text className="text-base text-gray-900">
                              {item.label}
                            </Text>
                            {value === item.value && (
                              <Check size={20} color="#4F46E5" />
                            )}
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </SafeAreaView>
                </TouchableOpacity>
              </Modal>
            </View>
          );
        }}
      />
    </View>
  );
};
