import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function Suporte() {
  const { tema } = useTheme();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, {color: tema.texto}]}>Suporte</Text>
        <Text style={styles.subtitle}>
          Precisa de ajuda? Fale com a equipe responsável ou consulte as dúvidas mais comuns.
        </Text>
      </View>

      <View style={styles.highlightCard}>
        <View style={styles.highlightIcon}>
          <Ionicons name="headset-outline" size={26} color="#EC0E7A" />
        </View>

        <View style={styles.highlightTextArea}>
          <Text style={styles.highlightTitle}>Atendimento rápido</Text>
          <Text style={styles.highlightText}>
            Nossa equipe pode te ajudar com itens perdidos, encontrados e orientações gerais.
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, {color: tema.texto}]}>Canais de atendimento</Text>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.8}>
        <View style={styles.leftArea}>
          <View style={styles.iconCircle}>
            <Ionicons name="logo-whatsapp" size={22} color="#EC0E7A" />
          </View>

          <View>
            <Text style={[styles.optionTitle, {color: tema.texto}]}>WhatsApp</Text>
            <Text style={styles.optionSubtitle}>Fale com o suporte de forma rápida</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.8}>
        <View style={styles.leftArea}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail-outline" size={22} color="#EC0E7A" />
          </View>

          <View>
            <Text style={[styles.optionTitle, {color: tema.texto}]}>E-mail</Text>
            <Text style={styles.optionSubtitle}>Envie sua dúvida ou solicitação</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.8}>
        <View style={styles.leftArea}>
          <View style={styles.iconCircle}>
            <Ionicons name="help-buoy-outline" size={22} color="#EC0E7A" />
          </View>

          <View>
            <Text style={[styles.optionTitle, {color: tema.texto}]}>Perguntas frequentes</Text>
            <Text style={styles.optionSubtitle}>Veja respostas para dúvidas comuns</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, {color: tema.texto}]}>Dúvidas comuns</Text>

      <View style={[styles.faqCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
        <Text style={[styles.faqQuestion, {color: tema.texto}]}>Como sei se meu item foi encontrado?</Text>
        <Text style={styles.faqAnswer}>
          Você pode procurar pelo item na tela inicial ou visualizar todos os itens cadastrados no sistema.
        </Text>
      </View>

      <View style={[styles.faqCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
        <Text style={[styles.faqQuestion, {color: tema.texto}]}>Onde retiro meu item?</Text>
        <Text style={styles.faqAnswer}>
          Ao encontrar o item no sistema, serão exibidos local, data, horário e instruções para retirada.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Entrar em contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginTop: 4,
  },
  optionCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF1F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#777777',
  },
  faqCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 16,
    marginBottom: 12,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#EC0E7A',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});