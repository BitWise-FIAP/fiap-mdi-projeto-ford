import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';
import { getJsonUserData, setJsonUserData } from '../src/utils/userStorage';
import { carrosTemplate } from '../components/Carrossel';

const historicoPadrao = [
  {
    id: 'demo-1',
    titulo: 'Revisão 30.000 km',
    data: '12/03/2026',
    concessionaria: 'Ford Mix',
    descricao: 'Óleo e filtros',
    status: 'Concluído',
  },
  {
    id: 'demo-2',
    titulo: 'Revisão 20.000 km',
    data: '18/09/2025',
    concessionaria: 'Ford Mix',
    descricao: 'Óleo, filtros e alinhamento',
    status: 'Concluído',
  },
];

export default function DetalheCarro() {
  const { tema } = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const {
    id,
    nome,
    ano,
    cor,
    placa,
    km,
    vin,
    proximaRevisao,
    garantiaStatus,
    garantiaValidade,
    planoManutencao,
    imagem,
  } = useLocalSearchParams();
  const [historico, setHistorico] = useState([]);
  const isTemplate = id?.startsWith('template-');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Meu veículo',
      headerStyle: { backgroundColor: tema.fundo },
      headerTintColor: tema.texto,
      headerShadowVisible: false,
    });
  }, [navigation, tema]);

  useEffect(() => {
    const carregarHistorico = async () => {
      if (isTemplate) {
        const template = carrosTemplate.find((carro) => carro.id === id);
        setHistorico(template?.historico?.length ? template.historico : historicoPadrao);
        return;
      }

      const carros = await getJsonUserData('carros', []);
      const carro = (Array.isArray(carros) ? carros : []).find((item) => item.id === id);
      setHistorico(Array.isArray(carro?.historico) ? carro.historico : []);
    };

    carregarHistorico();
  }, [id, isTemplate]);

  const handleRemover = () => {
    if (isTemplate) {
      Alert.alert('Veículo de demonstração', 'Este veículo não pode ser removido.');
      return;
    }

    Alert.alert(
      'Remover veículo',
      `Tem certeza que deseja remover ${nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const carros = await getJsonUserData('carros', []);
              const atualizados = (Array.isArray(carros) ? carros : []).filter((carro) => carro.id !== id);
              await setJsonUserData('carros', atualizados);
              router.back();
            } catch (error) {
              console.log(error);
              Alert.alert('Erro', 'Falha ao remover o veículo.');
            }
          },
        },
      ]
    );
  };

  const imagemSource = isTemplate
    ? id === 'template-1'
      ? require('../assets/ranger-azul.png')
      : require('../assets/ranger-vermelha.png')
    : { uri: imagem || 'https://via.placeholder.com/600x400?text=Ford+Vehicle' };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.cardPrincipal, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.cardInfo}>
          <Text style={[styles.carName, { color: tema.texto }]}>{nome || 'Veículo'}</Text>
          <Text style={[styles.dados, { color: tema.subtitulo }]}>{ano || '—'} • {cor || 'Cor não informada'}</Text>
          <View style={styles.placaBox}>
            <Ionicons name="car-outline" size={14} color="#1D7DFF" />
            <Text style={styles.placaTexto}>{placa || 'Sem placa'}</Text>
          </View>
        </View>
        <Image source={imagemSource} style={styles.carImage} resizeMode="contain" />
      </View>

      <TouchableOpacity
        style={styles.agendarButton}
        onPress={() => router.push({
          pathname: '/agendamento',
          params: {
            servico: 'Revisão preventiva',
            veiculoId: id || '',
            veiculo: nome || '',
          },
        })}
      >
        <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
        <Text style={styles.agendarTexto}>Agendar revisão</Text>
      </TouchableOpacity>

      <View style={styles.grid}>
        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="speedometer-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{km || '—'}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Quilometragem</Text>
        </View>
        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="calendar-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{proximaRevisao || '—'}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Próxima revisão</Text>
        </View>
        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{garantiaStatus || '—'}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Garantia {garantiaValidade || ''}</Text>
        </View>
        <View style={[styles.miniCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="construct-outline" size={22} color="#1D7DFF" />
          <Text style={[styles.miniValor, { color: tema.texto }]}>{planoManutencao || '—'}</Text>
          <Text style={[styles.miniLabel, { color: tema.subtitulo }]}>Plano de manutenção</Text>
        </View>
      </View>

      <View style={styles.detalhes}>
        <Text style={[styles.detalheLabel, { color: tema.subtitulo }]}>VIN</Text>
        <Text style={[styles.detalheValor, { color: tema.texto }]}>{vin || 'Não informado'}</Text>
      </View>

      <View style={styles.historicoSection}>
        <Text style={[styles.historicoTitulo, { color: tema.texto }]}>Histórico de serviços</Text>
        <Text style={[styles.historicoSubtitulo, { color: tema.subtitulo }]}>Serviços registrados para este veículo</Text>

        {historico.length ? historico.map((servico) => (
          <View key={servico.id} style={[styles.servicoCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
            <View style={styles.servicoHeader}>
              <Text style={[styles.servicoTitulo, { color: tema.texto }]}>{servico.titulo}</Text>
              <Text style={[styles.servicoData, { color: tema.subtitulo }]}>{servico.data}</Text>
            </View>
            <Text style={[styles.servicoConcessionaria, { color: tema.subtitulo }]}>{servico.concessionaria}</Text>
            <Text style={[styles.servicoDescricao, { color: tema.subtitulo }]}>{servico.descricao}</Text>
            <View style={styles.statusConcluido}>
              <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
              <Text style={styles.statusTexto}>{servico.status || 'Concluído'}</Text>
            </View>
          </View>
        )) : (
          <View style={[styles.vazio, { backgroundColor: tema.card, borderColor: tema.borda }]}>
            <Ionicons name="time-outline" size={24} color="#1D7DFF" />
            <Text style={[styles.vazioTexto, { color: tema.subtitulo }]}>Nenhum serviço registrado para este veículo.</Text>
          </View>
        )}
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
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  cardPrincipal: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardInfo: { flex: 1 },
  carName: { fontSize: 22, fontWeight: '900', marginBottom: 5 },
  dados: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  placaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(29, 125, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  placaTexto: { color: '#1D7DFF', fontSize: 14, fontWeight: '800', marginLeft: 6, letterSpacing: 1 },
  carImage: { width: 135, height: 100 },
  agendarButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#087BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  agendarTexto: { color: '#FFFFFF', fontWeight: '800', marginLeft: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 18 },
  miniCard: { width: '47%', borderRadius: 16, borderWidth: 1, padding: 16, minHeight: 115 },
  miniValor: { fontSize: 17, fontWeight: '900', marginTop: 10, marginBottom: 2 },
  miniLabel: { fontSize: 12, fontWeight: '600' },
  detalhes: { marginBottom: 24 },
  detalheLabel: { fontSize: 12, fontWeight: '800', marginBottom: 4 },
  detalheValor: { fontSize: 15, fontWeight: '700' },
  historicoSection: { marginBottom: 24 },
  historicoTitulo: { fontSize: 18, fontWeight: '800', marginBottom: 2 },
  historicoSubtitulo: { fontSize: 13, fontWeight: '500', marginBottom: 14 },
  servicoCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  servicoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  servicoTitulo: { fontSize: 15, fontWeight: '800', flex: 1 },
  servicoData: { fontSize: 12, fontWeight: '600', marginLeft: 8 },
  servicoConcessionaria: { fontSize: 13, fontWeight: '600', marginBottom: 3 },
  servicoDescricao: { fontSize: 13, fontWeight: '500', marginBottom: 10 },
  statusConcluido: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(34, 197, 94, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  statusTexto: { color: '#22C55E', fontSize: 12, fontWeight: '700', marginLeft: 4 },
  vazio: { borderRadius: 16, borderWidth: 1, padding: 20, alignItems: 'center' },
  vazioTexto: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginTop: 8 },
  removeButton: { height: 52, borderRadius: 14, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  removeText: { color: '#b91c1c', fontSize: 15, fontWeight: '700', marginLeft: 8 },
});
