import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import data from '@/assets/data.json'
import { Loading } from '@/components/loading'
import { useLocalSearchParams, useNavigation } from 'expo-router';

export default function People() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation()
  const [people, setPeople] = useState<{ 
    id: number, 
    name: string,
    profession: string,
    mother: string,
    father: string,
    rg: string,
    birthday: string,
    address: string,
    orcrim: string,
    function: string,
    register: string,
    atuation: string,
    condition: string,
    disabled: boolean,
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = data.people.find((p) => p.id.toString() === id);

        if (!response) {
          throw new Error('Pessoa não encontrada');
        }

        setPeople(response)
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
    <ScrollView className='flex-1'>
      <View className='p-4 bg-white'>
        <Image 
          className='w-30 h-30 rounded-md' source={require('@/assets/avatar.png')}
        />
        <View className='mt-4 gap-2'>
          <Text className='text-base'><Text className='font-bold'>Nome:</Text> {people?.name}</Text>
          <Text className='text-base'><Text className='font-bold'>Profissão:</Text> {people?.profession}</Text>
          <Text className='text-base'><Text className='font-bold'>Mãe:</Text> {people?.address}</Text>
          <Text className='text-base'><Text className='font-bold'>Pai:</Text> {people?.address}</Text>
          <Text className='text-base'><Text className='font-bold'>RG:</Text> {people?.rg}</Text>
          <Text className='text-base'><Text className='font-bold'>Nascimento:</Text> {people?.birthday}</Text>
          <Text className='text-base'><Text className='font-bold'>Endereço:</Text> {people?.address}</Text>
          <Text className='text-base'><Text className='font-bold'>Facção:</Text> {people?.orcrim}</Text>
          <Text className='text-base'><Text className='font-bold'>Função:</Text> {people?.function}</Text>
          <Text className='text-base'><Text className='font-bold'>Registro:</Text> {people?.register}</Text>
          <Text className='text-base'><Text className='font-bold'>Área de atuação:</Text> {people?.atuation}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} className='m-4 p-4 bg-blue-500 rounded-lg'>
        <Text className='text-white text-center'>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}