import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../app/ThemeContext';

const itensRecentes = [
  {
    id: '1',
    nome: 'Chaves',
    local: 'Recepção',
    data: '08/04/2026',
    imagem: require('../assets/chaves.jpg'),
  },
  {
    id: '2',
    nome: 'Carteira',
    local: 'Biblioteca',
    data: '07/04/2026',
    imagem: require('../assets/carteira.jpg'),
  },
  {
    id: '3',
    nome: 'Garrafa',
    local: 'Sala 201',
    data: '06/04/2026',
    imagem: require('../assets/garrafa.webp'),
  },
];

function ItemCard({ item, onPress }) {
  const { tema } = useTheme();
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85} onPress={onPress}>
      <Image source={item.imagem} style={styles.image} />

      <View style={styles.info}>
        <Text style={[styles.nome, { color: tema.texto }]} numberOfLines={1}>
          {item.nome}
        </Text>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color="#EC0E7A" />
          <Text style={styles.meta} numberOfLines={1}>
            {item.local}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={13} color="#EC0E7A" />
          <Text style={styles.meta}>{item.data}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={18} color="#888" />
    </TouchableOpacity>
  );
}

export default function RecentItemsCarousel() {
  const { tema } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: tema.texto }]}>Itens encontrados recentemente</Text>

      <FlatList
        data={itensRecentes}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => console.log('Abrir item:', item.nome)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2B2B2B',
    marginBottom: 20,
  },
  listContent: {
    paddingRight: 8,
  },
  card: {
    width: 325,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 15,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEFF2',
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
    color: '#2B2B2B',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: '#7A7A7A',
    marginLeft: 4,
  },
});