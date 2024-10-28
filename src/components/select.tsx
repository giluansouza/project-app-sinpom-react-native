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

export const SelectFilter = ({
  label,
  options,
  placeholder = "Selecione uma opção",
  onSelect,
  disabled,
}: {
  label: string;
  options: { label: string; value: any }[];
  placeholder: string;
  onSelect: (value: any) => void;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 text-sm mb-1 font-medium">{label}</Text>
      )}

      <TouchableOpacity
        onPress={toggleSelect}
        className={`flex-row items-center justify-between p-3 bg-white border rounded-lg border-gray-300 ${
          disabled ? "opacity-50" : ""
        }`}
        activeOpacity={0.7}
        disabled={disabled}
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
                    onPress={() => handleSelect(item.value)}
                    className="flex-row items-center justify-between p-4 border-b border-gray-100"
                  >
                    <Text className="text-base text-gray-900">
                      {item.label}
                    </Text>
                    {selectedValue === item.value && (
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
};
