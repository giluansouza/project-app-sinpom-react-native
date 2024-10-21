import { useLocalSearchParams,  Link, useNavigation, useRouter } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { documents as inputDocuments } from '@/assets/data.json';
import { Loading } from '@/components/loading';

export default function Document() {
  const local = useLocalSearchParams();
  const navigation = useNavigation();

  const [document, setDocument] = useState<{ 
    id: number,
    origin: string,
    type: string,
    date: string,
    title: string,
    content: string 
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const response = inputDocuments.find((doc) => doc.id.toString() === local.id);

        if (!response) {
          throw new Error('Documento não encontrado');
        }

        setDocument(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />
  }

  if (!document) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Documento não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className='mx-4 my-2 bg-white p-3 shadow-md rounded-md'>
        <Text className='text-lg mb-2'>{document.type} - {document.title}</Text>
        <Text className='text-md mb-1'>Agência - {document.origin}</Text>
        <Text className='text-xs text-zinc-400'>{document.date}</Text>
        <Text className='text-md mt-1'>Tramitação e despachos:</Text>

        <View className='flex-row items-center justify-start gap-4 my-4'>
          <TouchableOpacity>
            <Text className='text-md text-blue-500'>Arquivar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className='text-md text-blue-500'>Encaminhar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className='text-md text-blue-500'>Novo documento</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='mx-4 my-2 bg-white p-3 border border-zinc-300 rounded-md'>
        <View className='flex-row items-center'>
          <Text className='text-base font-bold mr-1'>DATA:</Text>
          <Text className='text-base'>{document.date}</Text>
        </View>
        <View className='flex-row'>
          <Text className='text-base font-bold mr-1'>ASSUNTO:</Text>
          <Text className='text-base flex-wrap' style={{ maxWidth: '80%' }}>{document.title}</Text>
        </View>
        <View className='flex-row overflow-hidden'>
          <Text className='text-base font-bold mr-1'>ORIGEM:</Text>
          <Text className='text-base'>{document.origin}</Text>
        </View>
        <View className='flex-row overflow-hidden'>
          <Text className='text-base font-bold mr-1'>DIFUSÃO:</Text>
          <Text className='text-base'>COINT/Subcomando, CPR - N/Agência</Text>
        </View>
        <View className='flex-row overflow-hidden'>
          <Text className='text-base font-bold mr-1'>REFERÊNCIA:</Text>
          <Text className='text-base'>XXX</Text>
        </View>
        <View className='flex-row overflow-hidden'>
          <Text className='text-base font-bold mr-1'>ANEXOS:</Text>
          <Text className='text-base'>XXX</Text>
        </View>

        <View className='border-b border-zinc-400 mt-4 mb-2 py-2'>
          <Text>
            No dia 25/09, por volta das 22h50, este SOInt recebeu informações de que uma motocicleta HONDA/CG 160 TITAN, cor vermelha, placa RZH6D62, roubada na cidade de Petrolina-PE, conforme boletim nº 24e2149008141, equipada com rastreador, estava localizada na Rua Belo Jardim, nº 549, Bairro Argemiro, em Juazeiro. De imediato, as guarnições da CIPT-Norte foram acionadas e se deslocaram até o local. Durante a diligência, a nacional Raiza Ketlen dos Santos Teles chegou à residência, identificando-se como proprietária. Ao ser questionada sobre a origem da motocicleta, afirmou que a única pessoa a quem havia entregue a chave da casa foi seu primo, Pedro Lucas dos Santos Waltmann, o que foi confirmado pela mãe de Pedro Lucas, a nacional Maria Sileide dos Santos. Diante dos fatos, a envolvida e a motocicleta foram conduzidas à 1ª Delegacia Territorial de Juazeiro-BA para as medidas cabíveis, conforme o BO nº 00658165/2024.
          </Text>
          <View>
            <Text className='text-base font-bold mt-4'>Entidades</Text>
            <Link className='text-blue-500 mt-1' href="/">Condutor (de ocorrência): WINDSON DIAS MARINHO DE SOUZA , Policial Militar (Ativa) Em serviço. Ileso</Link>
            <Link className='text-blue-500 mt-1' href="/">Autor de crime: Pedro Lucas dos Santos Waltmann. Ileso</Link>
            <Link className='text-blue-500 mt-1' href="/">Denunciado: Raiza Ketlen dos Santos Teles. Ileso</Link>
            <Link className='text-blue-500 mt-1' href="/">Motocicleta HONDA/CG TITAN , Placa RZH-6D62</Link>
          </View>
        </View>
        <Text>Documento assinado digitalmente por MAJ PM EDMILDO MORENO SOBRAL JUNIOR , Mat. 30376022 em 27/09/2024 19:18
        </Text>
        <Text className='text-xs text-zinc-400 mt-4'>Este documento encontra-se protegido pela Federal nº 12.527, de 18/11/2011, Art. 23, VIII e Art. 24, III c/c o Art. 18, III e IV, Art. 19, III e Art. 22, II, alínea c, do Lei Estadual 12.618 de 28/12/12. A divulgação, revelação, fornecimento, utilização ou reprodução desautorizada de seu conteúdo, a qualquer tempo, meio e modo, inclusive mediante acesso ou facilitação de acessos indevidos, constituem condutas ilícitas que ensejam responsabilidades administrativas e penais (Art. 325 do CPB - revelar fato de que tem ciência em razão do cargo e que devia permanecer em segredo, ou facilitar-lhe a revelação. Pena - Detenção de seis meses a dois anos, ou multa, se o fato não constituir crime mais grave).</Text>
      </View>
      <View>
        <TouchableOpacity className="bg-blue-500 p-4 m-4 rounded-md" onPress={() => navigation.goBack()}>
          <Text className="text-white text-center">Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
