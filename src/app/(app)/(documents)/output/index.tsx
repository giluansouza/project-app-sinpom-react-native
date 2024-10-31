import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { outputDocuments } from "@/assets/data.json";
import { Link, useNavigation, usePathname } from "expo-router";
import { Loading } from "@/components/loading";
import { ChevronDown } from "lucide-react-native";
import { DocumentoButtonGroup } from "@/components/documents-button-group";

export default function index() {
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
          <Link href={`/(documents)/output/${item.id}`} asChild>
            <TouchableOpacity className="mx-4 my-2 bg-white p-3 shadow-md rounded-md">
              <Text className="text-md mb-1">Para: {item.origin}</Text>
              <Text className="text-lg mb-2">{item.title}</Text>
              <Text className="text-xs">{item.date}</Text>
            </TouchableOpacity>
          </Link>
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
