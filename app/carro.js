import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function InspectCarro() {
  const { tema } = useTheme();
  const router = useRouter();
  const { id, nome, ano, cor, imagem } = useLocalSearchParams();

  const isTemplate = imagem === 'template' || id?.startsWith('template-');

  const imagemSource = isTemplate
    ? id === 'template-1'
      ? require('../assets/ranger-azul.png')
      : require('../assets/ranger-vermelha.png')
    : { uri: imagem };

  const handleRemover = () => {
    if (isTemplate) {
      Alert.alert('Aviso', 'Este é um carro de demonstração e não pode ser removido.');
      return;
    }

    Alert.alert(
      'Remover carro',
      `Tem certeza que deseja remover ${nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem('carros');
              if (stored) {
                const carros = JSON.parse(stored);
                const atualizados = carros.filter(c => c.id !== id);
                await AsyncStorage.setItem('carros', JSON.stringify(atualizados));
              }
              router.back();
            } catch (error) {
              Alert.alert('Erro', 'Falha ao remover o carro.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]} contentContainerStyle={styles.content}>
      <Image source={imagemSource} style={styles.image} resizeMode="cover" />

      <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <Text style={[styles.nome, { color: tema.texto }]}>{nome}</Text>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#1D7DFF" />
          <Text style={[styles.detailText, { color: tema.subtitulo }]}>Ano: {ano}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="color-palette-outline" size={20} color="#1D7DFF" />
          <Text style={[styles.detailText, { color: tema.subtitulo }]}>Cor: {cor}</Text>
        </View>
      </View>

      {!isTemplate && (
        <TouchableOpacity style={[styles.removeButton, { borderColor: '#b91c1c' }]} onPress={handleRemover}>
          <Ionicons name="trash-outline" size={20} color="#b91c1c" />
          <Text style={styles.removeText}>Remover carro</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  nome: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  removeButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: '#b91c1c',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});
