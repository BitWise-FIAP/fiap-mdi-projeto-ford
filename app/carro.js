import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const servicosMock = [
  {
    id: 's1',
    titulo: 'Revisão 30.000 km',
    data: '12/03/2026',
    concessionaria: 'Concessionária Ford Mix',
    descricao: 'Óleo e filtros',
    status: 'OK',
  },
  {
    id: 's2',
    titulo: 'Revisão 20.000 km',
    data: '18/09/2025',
    concessionaria: 'Concessionária Ford Mix',
    descricao: 'Óleo, filtros e alinhamento',
    status: 'OK',
  },
];

export default function InspectCarro() {
  const { tema } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { id, nome, ano, cor, placa, km, proximaRevisao, garantiaStatus, garantiaValidade, planoManutencao, imagem } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Meu veículo',
      headerStyle: { backgroundColor: tema.fundo },
      headerTintColor: tema.texto,
      headerShadowVisible: false,
    });
  }, [navigation, tema]);

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
      <View style={styles.headerSpacer} />

      <View style={[styles.cardPrincipal, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.cardInfo}>
          <Text style={[styles.carName, { color: tema.texto }]}>{nome}</Text>
          <View style={styles.placaBox}>
            <Ionicons name="car-outline" size={14} color="#1D7DFF" />
            <Text style={styles.placaTexto}>{placa}</Text>
          </View>
        </View>
        <Image source={imagemSource} style={styles.carImage} resizeMode="contain" />
      </View>

      <View style={styles.grid}>
        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="speedometer-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{km}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Quilometragem</Text>
        </View>

        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="calendar-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{proximaRevisao}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Próxima revisão</Text>
        </View>

        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#1D7DFF" />
          <View style={styles.garantiaLinha}>
            <Text style={[styles.miniValor, { color: tema.texto }]}>{garantiaStatus}</Text>
            <View style={styles.statusDot} />
          </View>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Garantia {garantiaValidade}</Text>
        </View>

        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="construct-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{planoManutencao}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Plano de manutenção</Text>
        </View>
      </View>

      <View style={styles.historicoSection}>
        <Text style={[styles.historicoTitulo, { color: tema.texto }]}>Histórico de serviços</Text>
        <Text style={[styles.historicoSubtitulo, { color: tema.subtitulo }]}>Últimos serviços realizados</Text>

        {servicosMock.map((servico) => (
          <View key={servico.id} style={[styles.servicoCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
            <View style={styles.servicoHeader}>
              <Text style={[styles.servicoTitulo, { color: tema.texto }]}>{servico.titulo}</Text>
              <Text style={[styles.servicoData, { color: tema.subtitulo }]}>{servico.data}</Text>
            </View>

            <Text style={[styles.servicoConcessionaria, { color: tema.subtitulo }]}>{servico.concessionaria}</Text>
            <Text style={[styles.servicoDescricao, { color: tema.subtitulo }]}>{servico.descricao}</Text>

            <View style={styles.servicoFooter}>
              <View style={styles.statusOk}>
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                <Text style={styles.statusOkTexto}>{servico.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {!isTemplate && (
        <TouchableOpacity style={[styles.removeButton, { borderColor: '#b91c1c' }]} onPress={handleRemover}>
          <Ionicons name="trash-outline" size={20} color="#b91c1c" />
          <Text style={styles.removeText}>Remover veículo</Text>
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
  headerSpacer: {
    height: 4,
  },

  cardPrincipal: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
  },
  placaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 125, 255, 0.12)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  placaTexto: {
    color: '#1D7DFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    marginLeft: 6,
  },
  carImage: {
    width: 140,
    height: 100,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  miniCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  miniValor: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 2,
  },
  miniLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  garantiaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginLeft: 6,
  },

  historicoSection: {
    marginBottom: 24,
  },
  historicoTitulo: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  historicoSubtitulo: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 14,
  },

  servicoCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  servicoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  servicoTitulo: {
    fontSize: 15,
    fontWeight: '800',
  },
  servicoData: {
    fontSize: 12,
    fontWeight: '600',
  },
  servicoConcessionaria: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  servicoDescricao: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
  },
  servicoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusOk: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusOkTexto: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
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
