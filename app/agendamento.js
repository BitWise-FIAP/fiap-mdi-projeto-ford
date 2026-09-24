import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../src/context/ThemeContext';
import { getJsonUserData, setJsonUserData } from '../src/utils/userStorage';

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function displayDate(date) {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

function createNextDays(total) {
  return Array.from({ length: total }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return {
      key: dateKey(date),
      semana: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '').toUpperCase(),
      dia: String(date.getDate()).padStart(2, '0'),
      data: displayDate(date),
    };
  });
}

export default function Agendamento() {
  const router = useRouter();
  const { tema, modoEscuro } = useTheme();
  const { servico = 'Revisão preventiva', veiculo = '', veiculoId = '' } = useLocalSearchParams();
  const [diaSelecionado, setDiaSelecionado] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState('09:00');
  const [concessionaria, setConcessionaria] = useState('Ford Mix - Vila Olímpia');
  const [veiculos, setVeiculos] = useState([]);
  const dias = useMemo(() => createNextDays(7), []);
  const horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];
  const concessionarias = ['Ford Mix - Vila Olímpia', 'Ford Center - Vila Crucis', 'Ford - Anhembi'];

  useEffect(() => {
    if (!diaSelecionado && dias.length) {
      setDiaSelecionado(dias[0].key);
    }
  }, [diaSelecionado, dias]);

  useEffect(() => {
    const carregarVeiculos = async () => {
      const carros = await getJsonUserData('carros', []);
      setVeiculos(Array.isArray(carros) ? carros : []);
    };
    carregarVeiculos();
  }, []);

  const veiculoSelecionado = veiculos.find((carro) => carro.id === veiculoId) || veiculos[0];

  const confirmarAgendamento = async () => {
    if (!diaSelecionado || !horaSelecionada) {
      Alert.alert('Escolha data e horário', 'Selecione uma data e um horário disponível.');
      return;
    }

    const agendamento = {
      id: Date.now().toString(),
      veiculoId: veiculoSelecionado?.id || veiculoId || 'demonstracao',
      veiculo: veiculoSelecionado?.nome || veiculo || 'Veículo de demonstração',
      servico,
      data: diaSelecionado,
      dataFormatada: displayDate(new Date(`${diaSelecionado}T12:00:00`)),
      hora: horaSelecionada,
      concessionaria,
      status: 'Agendado',
      descricao: 'Serviço reservado para atendimento',
    };

    try {
      const agendamentos = await getJsonUserData('agendamentos', []);
      await setJsonUserData('agendamentos', [...(Array.isArray(agendamentos) ? agendamentos : []), agendamento]);
      Alert.alert('Agendamento confirmado', `${servico} foi agendado para ${agendamento.dataFormatada} às ${horaSelecionada}.`, [
        { text: 'Ver histórico', onPress: () => router.replace('/historico') },
        { text: 'Continuar', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar o agendamento.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={modoEscuro ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: tema.texto }]}>Agendamento</Text>
        <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Escolha o melhor dia e horário para o seu Ford.</Text>

        <Text style={[styles.sectionTitle, { color: '#2F8CFF' }]}>Serviço selecionado</Text>
        <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <View style={styles.iconBoxYellow}>
            <MaterialCommunityIcons name="oil" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.cardTitle, { color: tema.texto }]}>{servico}</Text>
            <Text style={[styles.cardSubtitle, { color: tema.subtitulo }]}>
              {veiculoSelecionado?.nome || veiculo || 'Selecione um veículo nos detalhes do carro'}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: '#2F8CFF' }]}>Concessionária</Text>
        <View style={[styles.dealerList, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          {concessionarias.map((nomeConcessionaria) => {
            const ativa = concessionaria === nomeConcessionaria;
            return (
              <TouchableOpacity
                key={nomeConcessionaria}
                style={[styles.dealerOption, ativa && styles.dealerOptionActive]}
                onPress={() => setConcessionaria(nomeConcessionaria)}
              >
                <Ionicons name={ativa ? 'radio-button-on' : 'radio-button-off'} size={20} color={ativa ? '#FFFFFF' : tema.subtitulo} />
                <Text style={[styles.dealerText, { color: ativa ? '#FFFFFF' : tema.texto }]}>{nomeConcessionaria}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: '#2F8CFF' }]}>Escolha a data</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
          {dias.map((item) => {
            const ativa = diaSelecionado === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.dayItem, { backgroundColor: ativa ? '#087BFF' : tema.card, borderColor: ativa ? '#087BFF' : tema.borda }]}
                onPress={() => setDiaSelecionado(item.key)}
              >
                <Text style={[styles.dayWeek, { color: ativa ? '#FFFFFF' : tema.subtitulo }]}>{item.semana}</Text>
                <Text style={[styles.dayNumber, { color: ativa ? '#FFFFFF' : tema.texto }]}>{item.dia}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: '#2F8CFF' }]}>Horários disponíveis</Text>
        <View style={styles.hoursContainer}>
          {horarios.map((hora) => {
            const ativa = horaSelecionada === hora;
            return (
              <TouchableOpacity
                key={hora}
                style={[styles.hourItem, { backgroundColor: ativa ? '#087BFF' : tema.card, borderColor: ativa ? '#087BFF' : tema.borda }]}
                onPress={() => setHoraSelecionada(hora)}
              >
                <Text style={[styles.hourText, { color: ativa ? '#FFFFFF' : tema.texto }]}>{hora}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={confirmarAgendamento}>
          <Text style={styles.confirmButtonText}>Confirmar agendamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 4 },
  subtitle: { fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '800', marginBottom: 9, marginTop: 8 },
  card: { borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 18, borderWidth: 1 },
  iconBoxYellow: { width: 38, height: 38, borderRadius: 9, backgroundColor: '#D79B21', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '800', marginBottom: 3 },
  cardSubtitle: { fontSize: 12, fontWeight: '600' },
  dealerList: { borderRadius: 12, padding: 8, marginBottom: 18, borderWidth: 1 },
  dealerOption: { minHeight: 44, borderRadius: 8, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  dealerOptionActive: { backgroundColor: '#087BFF' },
  dealerText: { fontSize: 13, fontWeight: '700', marginLeft: 8, flex: 1 },
  daysContainer: { gap: 9, paddingBottom: 20 },
  dayItem: { width: 54, height: 62, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dayWeek: { fontSize: 10, fontWeight: '800', marginBottom: 5 },
  dayNumber: { fontSize: 16, fontWeight: '800' },
  hoursContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  hourItem: { width: 72, height: 42, borderRadius: 9, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  hourText: { fontSize: 12, fontWeight: '800' },
  confirmButton: { height: 50, borderRadius: 10, backgroundColor: '#087BFF', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  confirmButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
