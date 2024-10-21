import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { outputDocuments} from '@/assets/data.json'
import { Link, useNavigation } from 'expo-router'
import { Loading } from '@/components/loading'

export default function MyDrafts() {
  const [documents, setDocuments] = useState<{ 
    id: number,
    origin: string,
    date: string,
    status: string,
    title: string,
    content: string 
  }[] | null>(null)
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        setDocuments(outputDocuments)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className='flex-1'>
      <View className='flex flex-row justify-between p-4'>
        <Link href='/(app)/(documents)/entry' asChild>
          <TouchableOpacity 
            className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
            <Text>Entrada</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/(app)/(documents)/output' asChild>
          <TouchableOpacity 
            className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
            <Text>Saída</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/(app)/(documents)/personal-archive' asChild>
          <TouchableOpacity 
            className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
            <Text>Arquivo pessoal</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View className='flex-1 justify-center items-center'>
        <Text>Nenhum documento encontrado</Text>
      </View>
      {/* <FlatList 
        data={documents}
        renderItem={({ item }) => (
          <TouchableOpacity className='mx-4 my-2 bg-white p-3 shadow-md rounded-md'>
            <View className='flex flex-row justify-start flex-wrap'>
              {item.status === 'draft' ? <Text className='text-md mb-1 italic'>Documento em construção {` > `} </Text> : ''}
              <Text className='text-md mb-1'>Para: {item.origin}</Text>
            </View>
            <Text className='text-lg mb-2'>{item.title}</Text>
            <Text className='text-xs'>{item.date}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <View className='flex flex-row justify-between p-4'>
          <Link href='/(app)/(documents)/entry' asChild>
            <TouchableOpacity 
              className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
              <Text>Entrada</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/(app)/(documents)/output' asChild>
            <TouchableOpacity 
              className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
              <Text>Saída</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/(app)/(documents)/personal-archive' asChild>
            <TouchableOpacity 
              className='flex justify-center items-center bg-white border rounded-md h-10 min-w-16 px-2'>
              <Text>Arquivo pessoal</Text>
            </TouchableOpacity>
          </Link>
        </View>}
      /> */}
    </View>
  )
}