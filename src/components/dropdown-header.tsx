import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownItemSeparator,
  DropDownLabel,
  DropDownTrigger,
} from "@/components/ui/dropdown";
import { CircleUser, CreditCard, Settings } from "lucide-react-native";
import { Image } from "react-native";
import { Button, Text, TouchableOpacity, View } from "react-native";

export const DropdownHeader = () => {
  return (
    <View className="relative rounded-xl z-50">
      <DropDown>
        <DropDownTrigger>
          <TouchableOpacity>
            <Image
              source={require("@/assets/avatar.png")}
              className="w-10 h-10 rounded-full"
            />
          </TouchableOpacity>
        </DropDownTrigger>
        <DropDownContent className="absolute right-0">
          <View className="bg-white shadow-lg rounded-lg p-2 w-48">
            <DropDownLabel labelTitle="My Account" />
            <DropDownItemSeparator />
            <DropDownItem>
              <TouchableOpacity className="flex flex-row gap-2 items-center">
                <CircleUser size={18} color="#000" />
                <Text className="text-primary text-xl">Profile</Text>
              </TouchableOpacity>
            </DropDownItem>
            <DropDownItem>
              <TouchableOpacity className="flex flex-row gap-2 items-center">
                <Settings size={18} color="#000" />
                <Text className="text-primary text-xl">Settings</Text>
              </TouchableOpacity>
            </DropDownItem>
            <DropDownItem>
              <TouchableOpacity className="flex flex-row gap-2 items-center">
                <CreditCard size={18} color="#000" />
                <Text className="text-primary text-xl">Billing</Text>
              </TouchableOpacity>
            </DropDownItem>
            <DropDownLabel labelTitle="Team" />
            <DropDownItemSeparator />
            <DropDownItem>
              <TouchableOpacity className="flex flex-row gap-2 items-center">
                <CreditCard size={18} color="#000" />
                <Text className="text-primary text-xl">Billing</Text>
              </TouchableOpacity>
            </DropDownItem>
          </View>
        </DropDownContent>
      </DropDown>
    </View>
  );
};
