import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';
import { getJsonUserData } from '../src/utils/userStorage';

export const carrosTemplate = [
  {
    id: 'template-1',
    nome: 'Ford Ranger Raptor',
    ano: '2022',
    cor: 'Azul',
    placa: 'ABC1D23',
    km: '32.450 km',
    vin: 'DEMO-RANGER-RAPTOR',
    proximaRevisao: '5.000 km',
    garantiaStatus: 'Ativa',
    garantiaValidade: 'consulte a concessionária',
    planoManutencao: 'Premium Care',
    imagem: require('../assets/ranger-azul.png'),
    historico: [
      {
        id: 'template-service-1',
        titulo: 'Revisão 30.000 km',
        data: '12/03/2026',
        concessionaria: 'Ford Mix',
        descricao: 'Óleo e filtros',
        status: 'Concluído',
      },
      {
        id: 'template-service-2',
        titulo: 'Revisão 20.000 km',
        data: '18/09/2025',
        concessionaria: 'Ford Mix',
        descricao: 'Óleo, filtros e alinhamento',
        status: 'Concluído',
      },
    ],
  },
  {
    id: 'template-2',
    nome: 'Ford Ranger Limited',
    ano: '2023',
    cor: 'Vermelha',
    placa: 'XYZ4E56',
    km: '18.200 km',
    vin: 'DEMO-RANGER-LIMITED',
    proximaRevisao: '8.000 km',
    garantiaStatus: 'Ativa',
    garantiaValidade: 'consulte a concessionária',
    planoManutencao: 'Premium Care',
    imagem: require('../assets/ranger-vermelha.png'),
    historico: [],
  },
];

function resolveImageSource(imagem) {
  if (typeof imagem === 'number') {
    return imagem;
  }
  return imagem ? { uri: imagem } : null;
}

function CarCard({ item, onPress }) {
  const { tema } = useTheme();
  const imageSource = resolveImageSource(item.imagem);
  const isTemplate = item.id?.startsWith('template-');

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes de ${item.nome}`}
    >
      {imageSource ? <Image source={imageSource} style={styles.image} /> : <View style={[styles.image, styles.semImagem]} />}

      <View style={styles.info}>
        <Text style={[styles.nome, { color: tema.texto }]} numberOfLines={2}>
          {item.nome}
        </Text>
        <Text style={[styles.badge, { color: isTemplate ? tema.subtitulo : '#1D7DFF' }]}>
          {isTemplate ? 'Demonstração' : 'Meu veículo'}
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
        const carrosUsuario = await getJsonUserData('carros', []);
        const listaValida = Array.isArray(carrosUsuario) ? carrosUsuario : [];
        setCarros([...carrosTemplate, ...listaValida]);
      };

      carregarCarros();
    }, [])
  );

  const abrirCarro = (carro) => {
    router.push({
      pathname: '/carro',
      params: {
        id: carro.id,
        nome: carro.nome,
        ano: carro.ano,
        cor: carro.cor,
        placa: carro.placa || '—',
        km: carro.km || '—',
        vin: carro.vin || '—',
        proximaRevisao: carro.proximaRevisao || '—',
        garantiaStatus: carro.garantiaStatus || '—',
        garantiaValidade: carro.garantiaValidade || '—',
        planoManutencao: carro.planoManutencao || '—',
        imagem: typeof carro.imagem === 'number' ? 'template' : carro.imagem,
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.card, borderColor: tema.borda }]}>
      <View style={styles.tituloLinha}>
        <Text style={[styles.title, { color: tema.texto }]}>Meus carros Ford</Text>
        <TouchableOpacity onPress={() => router.push('/carros')}>
          <Text style={styles.verTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <CarCard item={item} onPress={() => abrirCarro(item)} />}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: tema.subtitulo }]}>Nenhum carro cadastrado ainda.</Text>
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
    borderWidth: 1,
  },
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
  },
  verTodos: {
    color: '#1D7DFF',
    fontSize: 13,
    fontWeight: '800',
  },
  listContent: {
    paddingRight: 8,
  },
  card: {
    width: 325,
    minHeight: 166,
    borderRadius: 22,
    padding: 15,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: 126,
    height: 126,
    borderRadius: 18,
    resizeMode: 'cover',
    marginRight: 10,
  },
  semImagem: {
    backgroundColor: '#E2E8F0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  badge: {
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
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
