import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';

export default function Suporte() {
  const { tema } = useTheme();
  const [faqAberta, setFaqAberta] = useState(null);

  const abrirLink = async (url) => {
    try {
      const suportado = await Linking.canOpenURL(url);
      if (suportado) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Link indisponível', 'Não foi possível abrir este recurso neste dispositivo.');
      }
    } catch (error) {
      Alert.alert('Link indisponível', 'Tente novamente mais tarde.');
    }
  };

  const faqs = [
    {
      pergunta: 'Como sei quando meu veículo precisa de uma revisão?',
      resposta: 'Acompanhe a quilometragem, a data da última revisão e as recomendações exibidas na tela de serviços.',
    },
    {
      pergunta: 'Como agendo uma manutenção?',
      resposta: 'Acesse Serviços, escolha uma recomendação e selecione data, horário e concessionária.',
    },
    {
      pergunta: 'Onde consulto meu histórico?',
      resposta: 'Abra Perfil > Histórico de serviços. Os agendamentos confirmados também aparecem nessa tela.',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: tema.texto }]}>Suporte</Text>
        <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Precisa de ajuda com seu veículo ou com o aplicativo? Fale com a equipe responsável.</Text>
      </View>

      <View style={[styles.highlightCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={[styles.highlightIcon, { backgroundColor: tema.divisor }]}>
          <Ionicons name="headset-outline" size={26} color="#1D7DFF" />
        </View>
        <View style={styles.highlightTextArea}>
          <Text style={[styles.highlightTitle, { color: tema.texto }]}>Atendimento rápido</Text>
          <Text style={[styles.highlightText, { color: tema.subtitulo }]}>Consulte as dúvidas frequentes ou entre em contato com o suporte Ford.</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Canais de atendimento</Text>

      <TouchableOpacity
        style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]}
        activeOpacity={0.8}
        onPress={() => abrirLink('https://www.ford.com.br')}
      >
        <View style={styles.leftArea}>
          <View style={[styles.iconCircle, { backgroundColor: tema.divisor }]}><Ionicons name="globe-outline" size={22} color="#1D7DFF" /></View>
          <View><Text style={[styles.optionTitle, { color: tema.texto }]}>Site oficial Ford</Text><Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Consulte produtos e serviços</Text></View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]}
        activeOpacity={0.8}
        onPress={() => abrirLink('mailto:suporte@ford.com.br?subject=Suporte%20Ford%20VINculo')}
      >
        <View style={styles.leftArea}>
          <View style={[styles.iconCircle, { backgroundColor: tema.divisor }]}><Ionicons name="mail-outline" size={22} color="#1D7DFF" /></View>
          <View><Text style={[styles.optionTitle, { color: tema.texto }]}>E-mail</Text><Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Envie sua dúvida ou solicitação</Text></View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]}
        activeOpacity={0.8}
        onPress={() => setFaqAberta(faqAberta === 'contato' ? null : 'contato')}
      >
        <View style={styles.leftArea}>
          <View style={[styles.iconCircle, { backgroundColor: tema.divisor }]}><Ionicons name="help-buoy-outline" size={22} color="#1D7DFF" /></View>
          <View><Text style={[styles.optionTitle, { color: tema.texto }]}>Perguntas frequentes</Text><Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Veja respostas para dúvidas comuns</Text></View>
        </View>
        <Ionicons name={faqAberta === 'contato' ? 'chevron-up' : 'chevron-forward'} size={20} color={tema.subtitulo} />
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Dúvidas comuns</Text>
      {faqs.map((faq, index) => {
        const aberta = faqAberta === index;
        return (
          <TouchableOpacity
            key={faq.pergunta}
            style={[styles.faqCard, { backgroundColor: tema.card, borderColor: tema.borda }]}
            onPress={() => setFaqAberta(aberta ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={[styles.faqQuestion, { color: tema.texto }]}>{faq.pergunta}</Text>
              <Ionicons name={aberta ? 'chevron-up' : 'chevron-down'} size={18} color="#1D7DFF" />
            </View>
            {aberta ? <Text style={[styles.faqAnswer, { color: tema.subtitulo }]}>{faq.resposta}</Text> : null}
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.primaryButton} onPress={() => abrirLink('https://www.ford.com.br')} activeOpacity={0.85}>
        <Text style={styles.primaryButtonText}>Acessar suporte Ford</Text>
      </TouchableOpacity>
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
  highlightIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  highlightTextArea: { flex: 1 },
  highlightTitle: { fontSize: 17, fontWeight: '800', marginBottom: 4 },
  highlightText: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 12, marginTop: 4 },
  optionCard: { borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  leftArea: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  optionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  optionSubtitle: { fontSize: 13, fontWeight: '600' },
  faqCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestion: { fontSize: 15, fontWeight: '800', flex: 1, paddingRight: 10 },
  faqAnswer: { fontSize: 14, fontWeight: '600', lineHeight: 20, marginTop: 10 },
  primaryButton: { height: 52, borderRadius: 14, backgroundColor: '#1D7DFF', alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
