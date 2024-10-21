import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import data from "@/assets/data.json";
import AuthContext from "@/utils/context";

export default function Home() {
  const { user, setUser } = useContext(AuthContext);
  const [notices, setNotices] = useState<
    | {
        id: number;
        title: string;
        content: string;
        date: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNotices(data.notices);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View className="flex-1">
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="my-4">
            <Text className="text-lg font-bold px-4">AVISOS</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="mx-4 my-2 bg-white p-4 rounded-lg shadow-md">
            <Text className="text-sm text-slate-500">
              Criado em {item.date}
            </Text>
            <Text className="text-base font-bold mb-2">{item.title}</Text>
            <Text className="text-sm mb-1">{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
