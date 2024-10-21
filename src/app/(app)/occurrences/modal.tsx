import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import data from '@/assets/data.json'

type Entity = {
  id: number;
  disabled: boolean;
  status: string;
  name: string;
  profession: string;
  service: string;
  condition: string;
}

export default function Modal()  {
  const params = useLocalSearchParams();
  const oid = params.oid as string | undefined;
  const id = params.id as string | undefined;
  const [entity, setEntity] = useState<Entity | null>(null)


  useEffect(() => {
    if (!oid || !id) {
      console.error('Parâmetros inválidos');
      return;
    }

    const occurrence = data.occurrences.find((oc) => oc.id.toString() === oid);
    const entity = occurrence?.entities.find((en) => en.id.toString() === id);

    if (!occurrence || !entity) {
      console.error('Ocorrencia ou entidade nulas');
      return;
    }

    setEntity(entity);
    
  }, [oid, id]);

  if (!entity) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-lg'>Entidade não encontrada.</Text>
      </View>
    );
  }

  const entityPM = [
    { label: 'Nome', value: entity.name },
    { label: 'Profissão', value: entity.profession },
    { label: 'Unidade atual', value: "00ª CIPM" },
    { label: 'Matrícula', value: "30.000.111" },
    { label: 'Post/Grad', value: "Post/Grad PM" },
    { label: 'Sexo', value: 'Sexo' },
    { label: 'Mãe', value: 'Nome da mãe' },
    { label: 'Pai', value: 'Nome do pai' },
    { label: 'CPF', value: '012.345.678-90' },
    { label: 'RG', value: '0123456789' },
    { label: 'Nascimento', value: '01/02/2000' },
  ];

  const entityPeople = [
    { label: 'Nome', value: entity.name },
    { label: 'Profissão', value: entity.profession },
    { label: 'Sexo', value: 'Sexo' },
    { label: 'Mãe', value: 'Nome da mãe' },
    { label: 'Pai', value: 'Nome do pai' },
    { label: 'CPF', value: '012.345.678-90' },
    { label: 'RG', value: '0123456789' },
    { label: 'Nascimento', value: '01/02/2000' },
    { label: 'Apelido', value: 'Apelido' },
    { label: 'Facção', value: 'Não informada' },
    { label: 'Possuí registro', value: 'SIM' },
    { label: 'Registro', value: 'Tráfico de drogas' },
  ];

  const entityDetails = entity.profession === 'Policial Militar (Ativa)' ? entityPM : entityPeople;

  return (
    <ScrollView className='flex-1 bg-white p-6'>
      {entityDetails.map((detail, index) => (
        <View
          key={index}
          className='flex-row items-center justify-between py-3 px-2 gap-2'
          style={{
            backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
            borderRadius: 4,
            marginBottom: 10
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{detail.label}:</Text>
          <Text style={{ fontSize: 16 }}>{detail.value}</Text>
        </View>
      ))}
    </ScrollView>
  )
}