import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';
import { getJsonUserData } from '../src/utils/userStorage';

function formatDate(value) {
  if (!value) return 'Data não informada';
  if (value.includes?.('-') && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(`${value}T12:00:00`));
  }
  return value;
}

function statusColors(status, tema) {
  const normalized = status?.toLowerCase() || '';
  if (normalized.includes('agendado') || normalized.includes('análise')) {
    return { color: '#F59E0B', backgroundColor: modoSeguro('#FEF3C7', tema) };
  }
  if (normalized.includes('retirada') || normalized.includes('andamento')) {
    return { color: '#2563EB', backgroundColor: modoSeguro('#DBEAFE', tema) };
  }
  return { color: '#16A34A', backgroundColor: modoSeguro('#DCFCE7', tema) };
}

function modoSeguro(color, tema) {
  return tema.card === '#FFFFFF' ? color : `${color}22`;
}

export default function Historico() {
  const { tema } = useTheme();
  const [registros, setRegistros] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        const [carros, agendamentos] = await Promise.all([
          getJsonUserData('carros', []),
          getJsonUserData('agendamentos', []),
        ]);

        const veiculos = Array.isArray(carros) ? carros : [];
        const historicoVeiculos = veiculos.flatMap((carro) =>
          (Array.isArray(carro.historico) ? carro.historico : []).map((servico) => ({
            ...servico,
            veiculo: carro.nome,
          }))
        );
        const historicoAgendamentos = (Array.isArray(agendamentos) ? agendamentos : []).map((agendamento) => ({
          ...agendamento,
          titulo: agendamento.servico,
          data: agendamento.data,
        }));

        setRegistros([...historicoAgendamentos, ...historicoVeiculos]);
      };

      carregar();
    }, [])
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: tema.texto }]}>Histórico de serviços</Text>
        <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Acompanhe os serviços e agendamentos dos seus veículos.</Text>
      </View>

      <View style={[styles.highlightCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={[styles.highlightIcon, { backgroundColor: tema.divisor }]}>
          <Ionicons name="time-outline" size={24} color="#1D7DFF" />
        </View>
        <View style={styles.highlightTextArea}>
          <Text style={[styles.highlightTitle, { color: tema.texto }]}>Tudo em um só lugar</Text>
          <Text style={[styles.highlightText, { color: tema.subtitulo }]}>Consulte o histórico dos seus veículos e agendamentos.</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Seus serviços</Text>

      {registros.length ? registros.map((registro) => {
        const status = statusColors(registro.status, tema);
        return (
          <View key={registro.id} style={[styles.requestCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="construct-outline" size={20} color="#1D7DFF" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemTitle, { color: tema.texto }]}>{registro.titulo || 'Serviço'}</Text>
                <Text style={[styles.itemSubtitle, { color: tema.subtitulo }]}>
                  {registro.veiculo || 'Veículo'} • {registro.concessionaria || 'Concessionária não informada'}
                </Text>
              </View>
            </View>

            <View style={styles.cardBottom}>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={15} color="#1D7DFF" />
                <Text style={[styles.infoText, { color: tema.subtitulo }]}>{formatDate(registro.data)}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
                <Text style={[styles.statusText, { color: status.color }]}>{registro.status || 'Concluído'}</Text>
              </View>
            </View>
          </View>
        );
      }) : (
        <View style={[styles.emptyCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <Ionicons name="file-tray-outline" size={28} color="#1D7DFF" />
          <Text style={[styles.emptyTitle, { color: tema.texto }]}>Nenhum serviço registrado</Text>
          <Text style={[styles.emptyText, { color: tema.subtitulo }]}>Agende um serviço para que ele apareça neste histórico.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 15, fontWeight: '600', lineHeight: 22 },
  highlightCard: { borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, borderWidth: 1 },
  highlightIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  highlightTextArea: { flex: 1 },
  highlightTitle: { fontSize: 17, fontWeight: '800', marginBottom: 4 },
  highlightText: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 12 },
  requestCard: { borderRadius: 18, borderWidth: 1, padding: 15, marginBottom: 12 },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(29, 125, 255, 0.14)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  itemSubtitle: { fontSize: 12, fontWeight: '600', lineHeight: 18 },
  cardBottom: { marginTop: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoText: { marginLeft: 6, fontSize: 12, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  statusText: { fontSize: 12, fontWeight: '800' },
  emptyCard: { borderRadius: 18, borderWidth: 1, padding: 24, alignItems: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '800', marginTop: 10 },
  emptyText: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginTop: 5 },
});
