import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, Text, TextInput, View } from "react-native"

export default function Modal()  {
  return (
    <ScrollView className='flex m-4 gap-4'>
      <View className='gap-2 mb-2'>
        <Text>Apelido da pessoa</Text>
        <TextInput 
          className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50'
          placeholder='Digite o apelido da pessoa'  
        />
      </View>
      <View className='gap-2 mb-2'>
        <Text>Matrícula de PM</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>Nome da mãe</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>CPF</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>RG</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>Área de atuação</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>Bairro</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
      <View className='gap-2 mb-2'>
        <Text>Cidade</Text>
        <TextInput className='border border-zinc-300 rounded-md p-2 shadow-md bg-zinc-50' />
      </View>
    </ScrollView>
  )
}