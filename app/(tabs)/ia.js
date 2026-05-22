import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, StyleSheet, ScrollView, Alert, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const GROQ_API_KEY = 'gsk_SUA_CHAVE_AQUI';

const calcularBadge = (pontos) => {
  if (pontos >= 100) return { emoji: '🏎️', titulo: 'Motor Expert' };
  if (pontos >= 50) return { emoji: '🔧', titulo: 'Mecânico Digital' };
  if (pontos >= 20) return { emoji: '📊', titulo: 'Analista Iniciante' };
  return { emoji: '🚗', titulo: 'Piloto de Garagem' };
};

const getBadgeIcon = (pontos) => {
  if (pontos >= 100) return 'car-sports';
  if (pontos >= 50) return 'tools';
  if (pontos >= 20) return 'chart-bar';
  return 'car';
};

export default function IA() {
  const [veiculo1, setVeiculo1] = useState('');
  const [veiculo2, setVeiculo2] = useState('');
  const [analise, setAnalise] = useState('');
  const [insight, setInsight] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [pontos, setPontos] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('pontos').then(valor => {
      if (valor) setPontos(parseInt(valor));
    });
  }, []);

  const adicionarPontos = async (quantidade) => {
    const novoTotal = pontos + quantidade;
    setPontos(novoTotal);
    await AsyncStorage.setItem('pontos', String(novoTotal));
    return novoTotal;
  };

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
    {
      role: 'system',
      content: `
Você é um especialista automotivo da Ford, integrado em um aplicativo moderno de gerenciamento veicular.

Seu objetivo é fornecer comparações inteligentes, rápidas e tecnológicas entre veículos.

REGRAS:
- Responda em português do Brasil.
- Seja objetivo.
- Use tom moderno e premium.
- Demonstre conhecimento automotivo real.
- Destaque desempenho, conforto, consumo, tecnologia e uso ideal.
- Evite respostas longas.
- Não invente dados absurdos.
`
    },
    {
      role: 'user',
      content: prompt
    }
  ],
  max_tokens: 300,
  temperature: 0.7,
}),
    });

    const dados = await resposta.json();
    return dados.choices[0].message.content;
  };

  const comparar = async () => {
    if (!veiculo1 || !veiculo2) {
      Alert.alert('Ops!', 'Preencha os dois veículos 🚗');
      return;
    }

    setCarregando(true);
    setAnalise('');
    setInsight('');

    try {
      const promptAnalise = `
        Compare os veículos "${veiculo1}" e "${veiculo2}".

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

      const totalAtualizado = await adicionarPontos(10);

      const promptInsight = `
        O usuário acabou de comparar os veículos ${veiculo1} e ${veiculo2} no app Ford IA.

        Ele possui ${totalAtualizado} pontos no sistema de gamificação.

        Gere:
        - uma frase curta
        - motivadora
        - moderna
        - estilo aplicativo premium automotivo

        REGRAS:
        - usar no máximo 1 linha
        - mencionar um dos veículos
        - usar emojis de forma leve
        - incentivar o usuário a continuar explorando o app
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#020B24" />

      <Text style={styles.headerTitle}>IA</Text>

      <View style={styles.painelGamificacao}>
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons
            name={getBadgeIcon(pontos)}
            size={36}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.badgeInfo}>
          <Text style={styles.badgeLabel}>Seu nível</Text>
          <Text style={styles.badgeTitulo}>{badge.titulo}</Text>
          <Text style={styles.proximoBadge}>
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
        <MaterialCommunityIcons name="robot-outline" size={30} color="#2F8CFF" />
        <Text style={styles.titulo}>Comparador IA</Text>
      </View>

      <Text style={styles.subtitulo}>
        Powered by Llama + Groq • +10 pts por comparação
      </Text>

      <View style={styles.inputBox}>
        <Ionicons name="car-sport-outline" size={20} color="#8C99B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Veículo 1 (ex: Ford Ranger Raptor)"
          placeholderTextColor="#8C99B2"
          value={veiculo1}
          onChangeText={setVeiculo1}
        />
      </View>

      <View style={styles.vsContainer}>
        <View style={styles.vsLine} />
        <Text style={styles.vs}>VS</Text>
        <View style={styles.vsLine} />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="car-outline" size={20} color="#8C99B2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Veículo 2 (ex: Toyota Hilux)"
          placeholderTextColor="#8C99B2"
          value={veiculo2}
          onChangeText={setVeiculo2}
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
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="brain" size={22} color="#2F8CFF" />
            <Text style={styles.cardTitulo}>Análise da IA</Text>
          </View>

          <Text style={styles.cardTexto}>{analise}</Text>
        </View>
      ) : null}

      {insight ? (
        <View style={styles.cardInsight}>
          <View style={styles.cardHeader}>
            <Ionicons name="sparkles-outline" size={21} color="#78F34D" />
            <Text style={styles.cardInsightTitulo}>Insight motivador</Text>
          </View>

          <Text style={styles.cardInsightTexto}>{insight}</Text>
          <Text style={styles.cardInsightPontos}>+10 pts adicionados! Total: {pontos} pts</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#020B24',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 20,
    textAlign:"center"
  },

  painelGamificacao: {
    width: '100%',
    backgroundColor: '#071B3B',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#123763',
  },

  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#087BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  badgeInfo: {
    flex: 1,
  },

  badgeLabel: {
    color: '#2F8CFF',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },

  badgeTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 5,
  },

  proximoBadge: {
    color: '#9AA8BF',
    fontSize: 11,
    fontWeight: '600',
  },

  pontosBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  pontosTexto: {
    color: '#78F34D',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 2,
  },

  pontosLabel: {
    color: '#9AA8BF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: -2,
  },

  tituloBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  titulo: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
    marginLeft: 8,
  },

  subtitulo: {
    fontSize: 13,
    color: '#9AA8BF',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },

  inputBox: {
    width: '100%',
    height: 52,
    backgroundColor: '#071B3B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1D3B63',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  vsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1D3B63',
  },

  vs: {
    color: '#2F8CFF',
    fontSize: 18,
    fontWeight: '900',
    marginHorizontal: 14,
  },

  botao: {
    width: '100%',
    height: 52,
    backgroundColor: '#087BFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  botaoIcon: {
    marginRight: 8,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  card: {
    width: '100%',
    backgroundColor: '#071B3B',
    borderRadius: 14,
    padding: 16,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#123763',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cardTitulo: {
    color: '#2F8CFF',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },

  cardTexto: {
    color: '#D9DEEA',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },

  cardInsight: {
    width: '100%',
    backgroundColor: '#052B68',
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#087BFF',
  },

  cardInsightTitulo: {
    color: '#78F34D',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },

  cardInsightTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },

  cardInsightPontos: {
    color: '#2F8CFF',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 10,
  },
});