import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Map, { Marker, UrlTile } from 'react-native-maps'

import data from '@/assets/data.json'
import { Loading } from '@/components/loading'
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import MapView from 'react-native-maps'

export default function Occurrence() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation()
  const [occurrence, setOccurrence] = useState<{ 
    id: number, 
    dateFact: string,
    type: string,
    occurrenceOrigin?: string,
    opm: string,
    opmArea: string,
    date: string,
    numberDp: string,
    motivation: string,
    entities: any[],
    orcrimArea: string,
    address: string,
    coordinates: { lat: number | null, lng: number | null },
    description: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = data.occurrences.find((oc) => oc.id.toString() === id);

        if (!response) {
          throw new Error('Ocorrencia não encontrada');
        }

        setOccurrence(response)
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
      <View className='mx-4 mt-4 p-4 bg-white rounded-md'>
        <Text className='text-base'><Text className='font-bold'>Tipo:</Text> {occurrence?.type}</Text>
      </View>
      <View className='m-4 p-4 bg-white rounded-md'>
        <View>
          <Text className='text-base'><Text className='font-bold'>Registrado por:</Text> {occurrence?.opm}</Text>
          {occurrence?.occurrenceOrigin ? 
            <Text className='text-base'><Text className='font-bold'>Ocorrência originária:</Text> {occurrence?.occurrenceOrigin}</Text> :
            <Text className='text-base'><Text className='font-bold'>Motivação:</Text> {occurrence?.motivation}</Text>
          }
          <Text className='text-base'><Text className='font-bold'>Data/Hora:</Text> {occurrence?.date}</Text>
          <Text className='text-base'><Text className='font-bold'>Local:</Text> {occurrence?.address}</Text>
          <Text className='text-base'><Text className='font-bold'>Área de responsabilidade:</Text> {occurrence?.opmArea}</Text>
          <Text className='text-base'><Text className='font-bold'>Grupo crime predominante na área:</Text> {occurrence?.orcrimArea}</Text>
        </View>
        <View>
          <Text className='text-base font-bold mt-4'>Entidades</Text>
          {occurrence?.entities.map((v) => (
            <Link 
              key={v.id} 
              className='text-blue-500 mt-1' 
              href={`/occurrences/modal?oid=${id}&id=${v.id}`} 
              disabled={v.disabled}
            >
              {v.status && v.status+': '} {v.name}{v.profession && ', '+v.profession+', '}{v.service}{v.condition && ', '+v.condition}
            </Link>
          ))}
        </View>
        <View>
          <Text className='text-base font-bold mt-4'>Descrição da ocorrência</Text>
          <Text>{occurrence?.description}</Text>
          <Text className='text-base'><Text className='font-bold'>Número da ocorrência na DP:</Text> {occurrence?.numberDp}</Text>
        </View>
        <View className='mt-4 h-72'>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: occurrence?.coordinates.lat ?? -9.420794, 
              longitude: occurrence?.coordinates.lng ?? -40.507595,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <UrlTile 
               urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               maximumZ={19}
             />

            {occurrence?.coordinates && <Marker
              coordinate={{
                latitude: occurrence?.coordinates.lat ?? 0, 
                longitude: occurrence?.coordinates.lng ?? 0
              }}
            />}
          </MapView>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} className='m-4 p-4 bg-blue-500 rounded-lg'>
        <Text className='text-white text-center'>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}