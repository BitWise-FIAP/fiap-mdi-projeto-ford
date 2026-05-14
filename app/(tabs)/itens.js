import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

import itensData from '../../storage/itens.json';

const imagensLocais = {
  mochila: require('../../assets/mochila.jpg'),
  caderno: require('../../assets/caderno.avif'),
  fone: require('../../assets/fone.jpg'),
  garrafa: require('../../assets/garrafa.png'),
  casaco: require('../../assets/casaco.jpg'),
};

const getImagem = (imagem) => {
  if (!imagem) {
    return imagensLocais.default;
  }

  if (imagem.startsWith('http') || imagem.startsWith('file')) {
    return { uri: imagem };
  }

  return imagensLocais[imagem] || imagensLocais.default;
};

export default function Itens() {
  const router = useRouter();
  const [itens, setItens] = useState([]);
  const { tema } = useTheme();

  useFocusEffect(() => {
    const loadItens = async () => {
      const storedItens = await AsyncStorage.getItem('itens');
      const parsedStoredItens = storedItens ? JSON.parse(storedItens) : [];
      setItens([...itensData, ...parsedStoredItens]);
    };
    loadItens();
  });

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Itens Perdidos</Text>
        <Text style={styles.descricao}>Lista completa de itens perdidos e encontrados na FIAP</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {itens.length === 0 ? (
          <Text style={styles.empty}>Nenhum item cadastrado ainda.</Text>
        ) : (
          itens.map(item => (
            <View key={item.id} style={[styles.card, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
              <Image 
                source={getImagem(item.imagem)}
                style={styles.imagem}
                resizeMode="cover"
                onError={(e) => console.log('ERRO IMG:', item.imagem)}
              />
              <View style={styles.cardContent}>
                <Text style={[styles.nome, { color: tema.texto }]}>{item.nome}</Text>
                <Text style={styles.desc}>{item.descricao}</Text>
                {/* <Text style={styles.local}>📍 {item.local_perdido}</Text> */}
                <View style={styles.row}>
                  <Ionicons name="location-outline" size={13} color="#EC0E7A" />
                  <Text style={styles.local}>{item.local_perdido}</Text>
                </View>
                {/* <Text style={styles.data}>📅 {item.data}</Text> */}
                <View style={styles.row}>
                  <Ionicons name="time-outline" size={13} color="#EC0E7A" />
                  <Text style={styles.data}>{item.data}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#F9F9FB' },
  header: {
    backgroundColor: '#EC0E7A',
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
   
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFF2',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: 150,
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  local: {
    fontSize: 14,
    color: '#E83D84',
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#999',  
    marginLeft: 4,
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 7,
},
});