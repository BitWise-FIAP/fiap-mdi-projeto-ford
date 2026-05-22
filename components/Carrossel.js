import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../app/ThemeContext';

const carrosTemplate = [
  {
    id: 'template-1',
    nome: 'Ford Ranger Raptor',
    ano: '2022',
    cor: 'Azul',
    placa: 'ABC1D23',
    km: '32.450 km',
    proximaRevisao: '5.000 km',
    garantiaStatus: 'Ativa',
    garantiaValidade: 'até 12/07/2026',
    planoManutencao: 'Premium Care',
    imagem: require('../assets/ranger-azul.png'),
  },
  {
    id: 'template-2',
    nome: 'Ford Ranger Limited',
    ano: '2023',
    cor: 'Vermelha',
    placa: 'XYZ4E56',
    km: '18.200 km',
    proximaRevisao: '8.000 km',
    garantiaStatus: 'Ativa',
    garantiaValidade: 'até 03/11/2027',
    planoManutencao: 'Premium Care',
    imagem: require('../assets/ranger-vermelha.png'),
  },
];

function CarCard({ item, onPress }) {
  const { tema } = useTheme();
  const imagemSource = typeof item.imagem === 'string' && item.imagem.startsWith('file://')
    ? { uri: item.imagem }
    : item.imagem;
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85} onPress={onPress}>
      <Image source={imagemSource} style={styles.image} />

      <View style={styles.info}>
        <Text style={[styles.nome, { color: tema.texto }]} numberOfLines={2}>
          {item.nome}
        </Text>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={13} color="#1D7DFF" />
          <Text style={[styles.meta, { color: tema.subtitulo }]}>{item.ano}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="color-palette-outline" size={13} color="#1D7DFF" />
          <Text style={[styles.meta, { color: tema.subtitulo }]}>{item.cor}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={18} color={tema.subtitulo} />
    </TouchableOpacity>
  );
}

export default function Carrossel() {
  const { tema } = useTheme();
  const router = useRouter();
  const [carros, setCarros] = useState(carrosTemplate);

  useFocusEffect(
    useCallback(() => {
      const carregarCarros = async () => {
        try {
          const stored = await AsyncStorage.getItem('carros');
          if (stored) {
            const carrosUsuario = JSON.parse(stored);
            setCarros([...carrosTemplate, ...carrosUsuario]);
          } else {
            setCarros(carrosTemplate);
          }
        } catch (error) {
          console.log('Erro ao carregar carros:', error);
        }
      };
      carregarCarros();
    }, [])
  );

  const abrirCarro = (carro) => {
    const dados = {
      id: carro.id,
      nome: carro.nome,
      ano: carro.ano,
      cor: carro.cor,
      placa: carro.placa || '—',
      km: carro.km || '—',
      proximaRevisao: carro.proximaRevisao || '—',
      garantiaStatus: carro.garantiaStatus || '—',
      garantiaValidade: carro.garantiaValidade || '—',
      planoManutencao: carro.planoManutencao || '—',
      imagem: typeof carro.imagem === 'number' ? 'template' : carro.imagem,
    };
    router.push({ pathname: '/carro', params: dados });
  };

  return (
    <View style={[styles.container, {backgroundColor: tema.card}]}>
      <Text style={[styles.title, { color: '#2F8CFF' }]}>Meus Carros Ford</Text>

      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CarCard
            item={item}
            onPress={() => abrirCarro(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: tema.subtitulo }]}>
            Nenhum carro cadastrado ainda
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
  },
  listContent: {
    paddingRight: 8,
  },
  card: {
    width: 325,
    borderRadius: 35,
    padding: 15,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: 136,
    height: 136,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  meta: {
    fontSize: 12,
    marginLeft: 4,
  },
  empty: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
