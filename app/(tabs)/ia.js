import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';
import { getUserData, setUserData } from '../../src/utils/userStorage';

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || '';

function calcularBadge(pontos) {
  if (pontos >= 100) return { emoji: '🏎️', titulo: 'Motor Expert' };
  if (pontos >= 50) return { emoji: '🔧', titulo: 'Mecânico Digital' };
  if (pontos >= 20) return { emoji: '📊', titulo: 'Analista Iniciante' };
  return { emoji: '🚗', titulo: 'Piloto de Garagem' };
}

function getBadgeIcon(pontos) {
  if (pontos >= 100) return 'car-sports';
  if (pontos >= 50) return 'tools';
  if (pontos >= 20) return 'chart-bar';
  return 'car';
}

export default function IA() {
  const { tema, modoEscuro } = useTheme();
  const [veiculo1, setVeiculo1] = useState('');
  const [veiculo2, setVeiculo2] = useState('');
  const [analise, setAnalise] = useState('');
  const [insight, setInsight] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [pontos, setPontos] = useState(0);

  useEffect(() => {
    const carregarPontos = async () => {
      const valor = await getUserData('pontos', '0');
      const numero = Number.parseInt(valor, 10);
      setPontos(Number.isFinite(numero) ? numero : 0);
    };
    carregarPontos();
  }, []);

  const adicionarPontos = async () => {
    const valorAtual = await getUserData('pontos', '0');
    const numeroAtual = Number.parseInt(valorAtual, 10);
    const total = (Number.isFinite(numeroAtual) ? numeroAtual : 0) + 10;
    await setUserData('pontos', String(total));
    setPontos(total);
    return total;
  };

  const chamarLlama = async (prompt) => {
    if (!GROQ_API_KEY) {
      throw new Error('CHAVE_AUSENTE');
    }

    const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `
Você é um especialista automotivo da Ford, integrado em um aplicativo de gerenciamento veicular.

Seu objetivo é fornecer comparações inteligentes, rápidas e tecnológicas entre veículos.

REGRAS:
- Responda em português do Brasil.
- Seja objetivo.
- Use tom moderno e premium.
- Demonstre conhecimento automotivo real.
- Destaque desempenho, conforto, consumo, tecnologia e uso ideal.
- Não invente dados absurdos.
`,
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!resposta.ok) {
      throw new Error(`ERRO_GROQ_${resposta.status}`);
    }

    const dados = await resposta.json();
    const texto = dados?.choices?.[0]?.message?.content;
    if (!texto) {
      throw new Error('RESPOSTA_VAZIA');
    }
    return texto;
  };

  const comparar = async () => {
    const primeiro = veiculo1.trim();
    const segundo = veiculo2.trim();

    if (!primeiro || !segundo) {
      Alert.alert('Ops!', 'Preencha os dois veículos.');
      return;
    }
    if (primeiro.length > 80 || segundo.length > 80) {
      Alert.alert('Ops!', 'Use nomes com até 80 caracteres.');
      return;
    }

    setCarregando(true);
    setAnalise('');
    setInsight('');

    try {
      const promptAnalise = `
Compare os veículos "${primeiro}" e "${segundo}".

Analise:
- desempenho
- conforto
- tecnologia
- consumo
- uso urbano
- estrada
- off-road

Explique:
- qual veículo é mais equilibrado
- qual é melhor para cidade
- qual é melhor para aventura/off-road

Formato da resposta:
🏙️ Cidade: ...
🛣️ Estrada: ...
🏕️ Off-road: ...
⭐ Destaque: ...

REGRAS:
- máximo 5 linhas
- linguagem moderna
- tom premium
- resposta direta
      `;

      const textoAnalise = await chamarLlama(promptAnalise);
      setAnalise(textoAnalise);

      const totalAtualizado = await adicionarPontos();

      const promptInsight = `
O usuário acabou de comparar os veículos ${primeiro} e ${segundo} no app Ford IA.
Ele possui ${totalAtualizado} pontos no sistema de gamificação.

Gere uma frase curta, motivadora e moderna, mencionando um dos veículos e incentivando o usuário a continuar explorando o app.
Use no máximo uma linha e emojis de forma leve.
      `;

      const textoInsight = await chamarLlama(promptInsight);
      setInsight(textoInsight);
    } catch (erro) {
      console.log('Erro ao consultar a IA:', erro);
      const mensagem = erro?.message === 'CHAVE_AUSENTE'
        ? 'Configure EXPO_PUBLIC_GROQ_API_KEY no arquivo .env para usar a IA.'
        : 'Não consegui consultar a IA. Verifique sua conexão e a configuração da chave Groq.';
      Alert.alert('Erro na IA', mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const badge = calcularBadge(pontos);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle={modoEscuro ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <Text style={[styles.headerTitle, { color: tema.texto }]}>IA</Text>

      <View style={[styles.painelGamificacao, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons name={getBadgeIcon(pontos)} size={36} color="#FFFFFF" />
        </View>
        <View style={styles.badgeInfo}>
          <Text style={styles.badgeLabel}>Seu nível</Text>
          <Text style={[styles.badgeTitulo, { color: tema.texto }]}>{badge.emoji} {badge.titulo}</Text>
          <Text style={[styles.proximoBadge, { color: tema.subtitulo }]}>
            {pontos < 20 && `Faltam ${20 - pontos} pts para Analista`}
            {pontos >= 20 && pontos < 50 && `Faltam ${50 - pontos} pts para Mecânico`}
            {pontos >= 50 && pontos < 100 && `Faltam ${100 - pontos} pts para Motor Expert`}
            {pontos >= 100 && 'Nível máximo atingido!'}
          </Text>
        </View>
        <View style={styles.pontosBox}>
          <Ionicons name="star" size={18} color="#78F34D" />
          <Text style={styles.pontosTexto}>{pontos}</Text>
          <Text style={styles.pontosLabel}>pts</Text>
        </View>
      </View>

      <View style={styles.tituloBox}>
        <MaterialCommunityIcons name="robot-outline" size={30} color="#1D7DFF" />
        <Text style={[styles.titulo, { color: tema.texto }]}>Comparador IA</Text>
      </View>
      <Text style={[styles.subtitulo, { color: tema.subtitulo }]}>Powered by Llama + Groq • +10 pts por comparação</Text>

      <View style={[styles.inputBox, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <Ionicons name="car-sport-outline" size={20} color={tema.subtitulo} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: tema.texto }]}
          placeholder="Veículo 1 (ex: Ford Ranger Raptor)"
          placeholderTextColor={tema.subtitulo}
          value={veiculo1}
          onChangeText={setVeiculo1}
          maxLength={80}
          returnKeyType="next"
        />
      </View>

      <View style={styles.vsContainer}>
        <View style={[styles.vsLine, { backgroundColor: tema.borda }]} />
        <Text style={styles.vs}>VS</Text>
        <View style={[styles.vsLine, { backgroundColor: tema.borda }]} />
      </View>

      <View style={[styles.inputBox, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <Ionicons name="car-outline" size={20} color={tema.subtitulo} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: tema.texto }]}
          placeholder="Veículo 2 (ex: Toyota Hilux)"
          placeholderTextColor={tema.subtitulo}
          value={veiculo2}
          onChangeText={setVeiculo2}
          maxLength={80}
          returnKeyType="done"
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={comparar} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Ionicons name="search-outline" size={19} color="#FFFFFF" style={styles.botaoIcon} />
            <Text style={styles.botaoTexto}>Comparar com IA (+10 pts)</Text>
          </>
        )}
      </TouchableOpacity>

      {analise ? (
        <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="brain" size={22} color="#1D7DFF" />
            <Text style={[styles.cardTitulo, { color: tema.texto }]}>Análise da IA</Text>
          </View>
          <Text style={[styles.cardTexto, { color: tema.texto }]}>{analise}</Text>
        </View>
      ) : null}

      {insight ? (
        <View style={[styles.cardInsight, { backgroundColor: tema.card, borderColor: '#1D7DFF' }]}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="sparkles-outline" size={21} color="#78F34D" />
            <Text style={[styles.cardInsightTitulo, { color: tema.texto }]}>Insight motivador</Text>
          </View>
          <Text style={[styles.cardInsightTexto, { color: tema.texto }]}>{insight}</Text>
          <Text style={styles.cardInsightPontos}>+10 pts adicionados! Total: {pontos} pts</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 120 },
  headerTitle: { fontSize: 22, fontWeight: '900', marginBottom: 20, textAlign: 'center' },
  painelGamificacao: { width: '100%', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 28, borderWidth: 1 },
  badgeIconContainer: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#087BFF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  badgeInfo: { flex: 1 },
  badgeLabel: { color: '#2F8CFF', fontSize: 12, fontWeight: '800', marginBottom: 3 },
  badgeTitulo: { fontSize: 16, fontWeight: '900', marginBottom: 5 },
  proximoBadge: { fontSize: 11, fontWeight: '600' },
  pontosBox: { alignItems: 'center', justifyContent: 'center' },
  pontosTexto: { color: '#78F34D', fontSize: 28, fontWeight: '900', marginTop: 2 },
  pontosLabel: { color: '#9AA8BF', fontSize: 11, fontWeight: '700', marginTop: -2 },
  tituloBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  titulo: { fontSize: 25, fontWeight: '900', marginLeft: 8 },
  subtitulo: { fontSize: 13, fontWeight: '600', marginBottom: 24, textAlign: 'center' },
  inputBox: { width: '100%', height: 52, borderRadius: 10, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, marginBottom: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, fontWeight: '600' },
  vsContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  vsLine: { flex: 1, height: 1 },
  vs: { color: '#2F8CFF', fontSize: 18, fontWeight: '900', marginHorizontal: 14 },
  botao: { width: '100%', height: 52, backgroundColor: '#087BFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 },
  botaoIcon: { marginRight: 8 },
  botaoTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  card: { width: '100%', borderRadius: 14, padding: 16, marginTop: 22, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitulo: { color: '#2F8CFF', fontSize: 15, fontWeight: '900', marginLeft: 8 },
  cardTexto: { fontSize: 14, lineHeight: 22, fontWeight: '600' },
  cardInsight: { width: '100%', borderRadius: 14, padding: 16, marginTop: 14, borderWidth: 1 },
  cardInsightTitulo: { color: '#78F34D', fontSize: 15, fontWeight: '900', marginLeft: 8 },
  cardInsightTexto: { fontSize: 14, fontWeight: '700', lineHeight: 21 },
  cardInsightPontos: { color: '#2F8CFF', fontSize: 13, fontWeight: '900', marginTop: 10 },
});
