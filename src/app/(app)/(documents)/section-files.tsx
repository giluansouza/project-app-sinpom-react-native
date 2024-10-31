import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { outputDocuments } from "@/assets/data.json";
import { Link, useNavigation } from "expo-router";
import { Loading } from "@/components/loading";
import { usePathname } from "expo-router";
import { DocumentoButtonGroup } from "@/components/documents-button-group";

export default function SectionFiles() {
  const [documents, setDocuments] = useState<
    | {
        id: number;
        origin: string;
        date: string;
        status: string;
        title: string;
        content: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        setDocuments(outputDocuments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <TouchableOpacity className="mx-4 my-2 bg-white p-3 shadow-md rounded-md">
            <View className="flex flex-row justify-start flex-wrap">
              {item.status === "draft" ? (
                <Text className="text-md mb-1 italic">
                  Documento em construção {` > `}{" "}
                </Text>
              ) : (
                ""
              )}
              <Text className="text-md mb-1">Para: {item.origin}</Text>
            </View>
            <Text className="text-lg mb-2">{item.title}</Text>
            <Text className="text-xs">{item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <DocumentoButtonGroup pathname={pathname} />
          </ScrollView>
        )}
      />
    </View>
  );
}
