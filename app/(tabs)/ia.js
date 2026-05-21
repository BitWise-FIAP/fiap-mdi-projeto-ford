import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
// ⚠️ Substitua pela sua chave do console.groq.com
const GROQ_API_KEY = 'gsk_SUA_CHAVE_AQUI';
 
// 🎖️ Lógica de badges — quanto mais pontos, maior o prestígio
const calcularBadge = (pontos) => {
  if (pontos >= 100) return { emoji: '🏎️', titulo: 'Motor Expert' };
  if (pontos >= 50)  return { emoji: '🔧', titulo: 'Mecânico Digital' };
  if (pontos >= 20)  return { emoji: '📊', titulo: 'Analista Iniciante' };
  return { emoji: '🚗', titulo: 'Piloto de Garagem' };
};
 
export default function IA() {
  const [veiculo1, setVeiculo1]     = useState('');
  const [veiculo2, setVeiculo2]     = useState('');
  const [analise, setAnalise]       = useState('');
  const [insight, setInsight]       = useState('');
  const [carregando, setCarregando] = useState(false);
  const [pontos, setPontos]         = useState(0);
 
  // 💾 Carrega pontos salvos ao abrir o app
  useEffect(() => {
    AsyncStorage.getItem('pontos').then(valor => {
      if (valor) setPontos(parseInt(valor));
    });
  }, []);
 
  // ➕ Adiciona pontos e persiste no AsyncStorage
  const adicionarPontos = async (quantidade) => {
    const novoTotal = pontos + quantidade;
    setPontos(novoTotal);
    await AsyncStorage.setItem('pontos', String(novoTotal));
    return novoTotal;
  };
 
  // 🤖 Função genérica de chamada ao Llama via Groq
  const chamarLlama = async (prompt) => {
    const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Você é analista automotivo. Responda em português, direto ao ponto.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
      }),
    });
    const dados = await resposta.json();
    return dados.choices[0].message.content;
  };
 
  // 🔍 Ação principal: comparar + gamificar
  const comparar = async () => {
    if (!veiculo1 || !veiculo2) {
      Alert.alert('Ops!', 'Preencha os dois veículos 🚗');
      return;
    }
 
    setCarregando(true);
    setAnalise('');
    setInsight('');
 
    try {
      // 1️⃣ Pede a análise comparativa ao Llama
      const promptAnalise = `
        Compare ${veiculo1} vs ${veiculo2}.
        Diga qual é melhor para uso urbano e qual para off-road.
        Seja direto, máximo 3 linhas.
      `;
      const textoAnalise = await chamarLlama(promptAnalise);
      setAnalise(textoAnalise);
 
      // 2️⃣ Adiciona pontos pela comparação (+10 pts)
      const totalAtualizado = await adicionarPontos(10);
 
      // 3️⃣ Pede um insight motivador personalizado com pontos atuais
      const promptInsight = `
        O usuário comparou ${veiculo1} vs ${veiculo2} e agora tem ${totalAtualizado} pontos.
        Gere UMA frase curta e animada incentivando a continuar pesquisando.
        Use emojis e mencione os veículos. Máximo 1 linha.
      `;
      const textoInsight = await chamarLlama(promptInsight);
      setInsight(textoInsight);
 
    } catch (erro) {
      Alert.alert('Erro', 'Não consegui conectar à IA 😢\nVerifique sua chave Groq.');
    } finally {
      setCarregando(false);
    }
  };
 
  const badge = calcularBadge(pontos);
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
 
      {/* ===== 🏆 PAINEL DE GAMIFICAÇÃO ===== */}
      <View style={styles.painelGamificacao}>
        <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
        <Text style={styles.badgeTitulo}>{badge.titulo}</Text>
        <Text style={styles.pontosTexto}>⭐ {pontos} pontos</Text>
        <Text style={styles.proximoBadge}>
          {pontos < 20  && `Faltam ${20 - pontos} pts para 📊 Analista`}
          {pontos >= 20 && pontos < 50  && `Faltam ${50 - pontos} pts para 🔧 Mecânico`}
          {pontos >= 50 && pontos < 100 && `Faltam ${100 - pontos} pts para 🏎️ Motor Expert`}
          {pontos >= 100 && '🏆 Nível máximo atingido!'}
        </Text>
      </View>
 
      <Text style={styles.titulo}>🚗 Comparador IA</Text>
      <Text style={styles.subtitulo}>Powered by Llama + Groq • +10 pts por comparação</Text>
 
      {/* ===== INPUTS ===== */}
      <TextInput
        style={styles.input}
        placeholder="Veículo 1 (ex: Ford Ranger Raptor)"
        value={veiculo1}
        onChangeText={setVeiculo1}
      />
 
      <Text style={styles.vs}>⚔️ VS ⚔️</Text>
 
      <TextInput
        style={styles.input}
        placeholder="Veículo 2 (ex: Toyota Hilux)"
        value={veiculo2}
        onChangeText={setVeiculo2}
      />
 
      {/* ===== BOTÃO ===== */}
      <TouchableOpacity style={styles.botao} onPress={comparar} disabled={carregando}>
        <Text style={styles.botaoTexto}>
          {carregando ? '⏳ Analisando...' : '🔍 Comparar com IA (+10 pts)'}
        </Text>
      </TouchableOpacity>
 
      {carregando && <ActivityIndicator size="large" color="#003087" style={{ marginTop: 16 }} />}
 
      {/* ===== RESULTADO DA ANÁLISE ===== */}
      {analise ? (
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>🤖 Análise do Llama:</Text>
          <Text style={styles.cardTexto}>{analise}</Text>
        </View>
      ) : null}
 
      {/* ===== INSIGHT MOTIVADOR (gerado pela IA com contexto de pontos) ===== */}
      {insight ? (
        <View style={styles.cardInsight}>
          <Text style={styles.cardInsightTexto}>{insight}</Text>
          <Text style={styles.cardInsightPontos}>+10 pts adicionados! Total: ⭐ {pontos}</Text>
        </View>
      ) : null}
 
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#F0F4FF', alignItems: 'center' },
 
  // Painel de gamificação
  painelGamificacao: {
    backgroundColor: '#003087', borderRadius: 16, padding: 16,
    width: '100%', alignItems: 'center', marginTop: 40, marginBottom: 24,
  },
  badgeEmoji:    { fontSize: 40 },
  badgeTitulo:   { color: '#FFD700', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  pontosTexto:   { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 4 },
  proximoBadge:  { color: '#aac4ff', fontSize: 12, marginTop: 6, textAlign: 'center' },
 
  // Cabeçalho
  titulo:    { fontSize: 26, fontWeight: 'bold', color: '#003087', marginBottom: 4 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 20, textAlign: 'center' },
 
  // Inputs
  input: {
    width: '100%', backgroundColor: '#fff', borderRadius: 10,
    padding: 14, fontSize: 16, borderWidth: 1, borderColor: '#ddd', marginBottom: 8,
  },
  vs: { fontSize: 22, fontWeight: 'bold', marginVertical: 8, color: '#CC0000' },
 
  // Botão
  botao: {
    backgroundColor: '#003087', borderRadius: 10, padding: 16,
    width: '100%', alignItems: 'center', marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
 
  // Card de análise
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginTop: 20, width: '100%',
    borderLeftWidth: 4, borderLeftColor: '#003087',
  },
  cardTitulo: { fontSize: 15, fontWeight: 'bold', color: '#003087', marginBottom: 8 },
  cardTexto:  { fontSize: 14, color: '#333', lineHeight: 22 },
 
  // Card de insight motivador (dourado = recompensa visual)
  cardInsight: {
    backgroundColor: '#FFD700', borderRadius: 12, padding: 16,
    marginTop: 12, width: '100%', alignItems: 'center',
  },
  cardInsightTexto:  { fontSize: 14, color: '#003087', fontWeight: 'bold', textAlign: 'center' },
  cardInsightPontos: { fontSize: 13, color: '#333', marginTop: 8 },
});
 