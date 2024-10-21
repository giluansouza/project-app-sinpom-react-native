import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import data from '@/assets/data.json'
import { Loading } from '@/components/loading'
import { useRouter } from 'expo-router'

export default function index() {
  const navigation = useRouter()
  const [occurrences, setOccurrences] = useState<{ 
    id: number, 
    dateFact: string,
    type: string,
    opm: string, 
    date: string }[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOccurrences(data.occurrences)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <View className='flex-1'>
      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className='m-4 gap-4'>
            <View className='flex-row'>
              <View className='flex-1 mr-4'>
                <Text>Data inicial</Text>
                <TextInput className='border border-zinc-400 rounded-md p-2' />
              </View>
              <View className='flex-1 '>
                <Text>Data final</Text>
                <TextInput className='border border-zinc-400 rounded-md p-2' />
              </View>
            </View>
            <View>
              <Text>Tipo</Text>
            </View>
            <View>
              <Text>OPM</Text>
      
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push(`/occurrences/${item.id.toString()}`)} className='mx-4 my-2 bg-white p-4 rounded-md shadow-lg'>
            <Text className='text-base'><Text className='font-bold'>Data/Hora:</Text> {item.date}</Text>
            <Text className='text-base'><Text className='font-bold'>Tipo:</Text> {item.type}</Text>
            <Text className='text-base'><Text className='font-bold'>OPM:</Text> {item.opm}</Text>
            <Text className='text-base text-zinc-500'><Text className='font-bold'>Lançada em:</Text> {item.date}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}