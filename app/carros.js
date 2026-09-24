import { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { carrosTemplate } from '../components/Carrossel';
import { useTheme } from '../src/context/ThemeContext';
import { getJsonUserData } from '../src/utils/userStorage';

function normalizeImage(imagem) {
  if (typeof imagem === 'number') {
    return imagem;
  }
  return imagem ? { uri: imagem } : null;
}

export default function Carros() {
  const router = useRouter();
  const { tema } = useTheme();
  const [carrosUsuario, setCarrosUsuario] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        const veiculos = await getJsonUserData('carros', []);
        setCarrosUsuario(Array.isArray(veiculos) ? veiculos : []);
      };
      carregar();
    }, [])
  );

  const abrirVeiculo = (carro) => {
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

  const todosOsCarros = [...carrosUsuario, ...carrosTemplate];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTexto}>
          <Text style={[styles.title, { color: tema.texto }]}>Veículos</Text>
          <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Gerencie os Ford cadastrados e veja os veículos de demonstração.</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/cadastro')}
          accessibilityLabel="Adicionar veículo"
        >
          <Ionicons name="add" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {todosOsCarros.map((carro) => {
        const imageSource = normalizeImage(carro.imagem);
        const isTemplate = carro.id?.startsWith('template-');

        return (
          <TouchableOpacity
            key={carro.id}
            style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}
            onPress={() => abrirVeiculo(carro)}
            activeOpacity={0.85}
          >
            {imageSource ? (
              <Image source={imageSource} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.semImagem, { backgroundColor: tema.divisor }]}>
                <Ionicons name="car-outline" size={42} color={tema.subtitulo} />
              </View>
            )}

            <View style={styles.info}>
              <Text style={[styles.nome, { color: tema.texto }]}>{carro.nome}</Text>
              <Text style={[styles.meta, { color: tema.subtitulo }]}>{carro.ano} • {carro.cor}</Text>
              <View style={styles.placa}>
                <Ionicons name="car-outline" size={14} color="#1D7DFF" />
                <Text style={styles.placaTexto}>{carro.placa || 'Sem placa'}</Text>
              </View>
              <Text style={[styles.tipo, { color: isTemplate ? tema.subtitulo : '#1D7DFF' }]}>
                {isTemplate ? 'Veículo de demonstração' : 'Veículo da minha conta'}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
          </TouchableOpacity>
        );
      })}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTexto: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1D7DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minHeight: 142,
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 118,
    height: 112,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  semImagem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
  nome: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
  },
  placa: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(29, 125, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 7,
  },
  placaTexto: {
    color: '#1D7DFF',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 4,
  },
  tipo: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 7,
  },
});
