import {
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { Loading } from "@/components/loading";
import { documents as inputDocuments } from "@/assets/data.json";
import {
  ChevronDown,
  FileInput,
  FileOutputIcon,
  NotepadTextDashedIcon,
  Plus,
} from "lucide-react-native";
import { ButtonFloat } from "@/components/button-float";
import { DocumentoButtonGroup } from "@/components/documents-button-group";

export default function index() {
  const navigation = useRouter();
  const pathname = usePathname();
  const [documents, setDocuments] = useState<
    | {
        id: number;
        origin: string;
        date: string;
        title: string;
        content: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setDocuments(inputDocuments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <View>
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          // <Link href={`/(documents)/document/${item.id}`} asChild>
          <TouchableOpacity
            onPress={() => navigation.push(`/(documents)/entry/${item.id}`)}
            className="mx-4 my-2 bg-white p-3 shadow-md rounded-md"
          >
            <Text className="text-md mb-1">De: {item.origin}</Text>
            <Text className="text-lg mb-2">{item.title}</Text>
            <Text className="text-xs">{item.date}</Text>
          </TouchableOpacity>
          // </Link>
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
