import { ActivityIndicator, Text, View } from 'react-native'

export const Loading = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="#54b7e5" />
      <Text className='text-lg mt-0'>Carregando informações...</Text>
    </View>
  );
}