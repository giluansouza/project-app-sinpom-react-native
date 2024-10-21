import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Loading } from '@/components/loading';
import { documents as inputDocuments } from '@/assets/data.json'

export default function index() {
  const navigation = useRouter();
  const [documents, setDocuments] = useState<{ 
    id: number,
    origin: string,
    date: string,
    title: string,
    content: string 
  }[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDocuments(inputDocuments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    if (loading) {
      return <Loading />
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
             className='mx-4 my-2 bg-white p-3 shadow-md rounded-md'>
              <Text className='text-md mb-1'>De: {item.origin}</Text>
              <Text className='text-lg mb-2'>{item.title}</Text>
              <Text className='text-xs'>{item.date}</Text>
            </TouchableOpacity>
          // </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className='flex flex-row justify-between p-4'>
            <Link href='/(documents)/output' asChild>
              <TouchableOpacity className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
                <Text>Saída</Text>
              </TouchableOpacity>
            </Link>
            <Link href='/(documents)/my-drafts' asChild>
              <TouchableOpacity className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
                <Text>Meus rascunhos</Text>
              </TouchableOpacity>
            </Link>
            <Link href='/(documents)/personal-archive' asChild>
              <TouchableOpacity className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
                <Text>Arquivo pessoal</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
      />
    </View>
  );
}
