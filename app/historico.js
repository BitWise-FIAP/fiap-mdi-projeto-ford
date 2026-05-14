import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const solicitacoes = [
  {
    id: 1,
    item: 'Chaves',
    local: 'Recepção',
    data: '08/04/2026',
    status: 'Em análise',
    statusColor: '#F5A623',
    statusBg: '#FFF4DB',
  },
  {
    id: 2,
    item: 'Carteira',
    local: 'Biblioteca',
    data: '07/04/2026',
    status: 'Aprovada',
    statusColor: '#2E9B57',
    statusBg: '#EAF8EF',
  },
  {
    id: 3,
    item: 'Garrafa',
    local: 'Sala 201',
    data: '05/04/2026',
    status: 'Retirada concluída',
    statusColor: '#4A6CF7',
    statusBg: '#EEF2FF',
  },
];

export default function Historico() {
  const { tema } = useTheme();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, {color: tema.texto}]}>Histórico de solicitações</Text>
        <Text style={styles.subtitle}>
          Acompanhe o andamento das suas solicitações de retirada de itens.
        </Text>
      </View>

      <View style={styles.highlightCard}>
        <View style={styles.highlightIcon}>
          <Ionicons name="time-outline" size={24} color="#E83D84" />
        </View>

        <View style={styles.highlightTextArea}>
          <Text style={styles.highlightTitle}>Acompanhe em tempo real</Text>
          <Text style={styles.highlightText}>
            Veja o status atualizado de cada item solicitado no sistema.
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: tema.texto}]}>Suas solicitações</Text>

      {solicitacoes.map((solicitacao) => (
        <TouchableOpacity key={solicitacao.id} style={[styles.requestCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85}>
          <View style={styles.cardTop}>
            <View style={styles.itemLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="cube-outline" size={20} color="#E83D84" />
              </View>

              <View>
                  <Text style={[styles.itemTitle, {color: tema.texto}]}>{solicitacao.item}</Text>
                <Text style={styles.itemSubtitle}>Local: {solicitacao.local}</Text>
              </View>
            </View>

          </View>

          <View style={styles.cardBottom}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={15} color="#E83D84" />
              <Text style={styles.infoText}>{solicitacao.data}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: solicitacao.statusBg },
              ]}
            >
              <Text style={[styles.statusText, { color: solicitacao.statusColor }]}>
                {solicitacao.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.tipCard}>
        <Ionicons name="information-circle-outline" size={20} color="#E83D84" />
        <Text style={styles.tipText}>
          Você será avisado quando houver atualização no status de uma solicitação.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  highlightCard: {
    backgroundColor: '#FFF1F8',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFD3E8',
  },
  highlightIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  highlightTextArea: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFEFF2',
    padding: 15,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#777777',
  },
  cardBottom: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#777777',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tipCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFF2',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: '#666666',
    lineHeight: 19,
  },
});