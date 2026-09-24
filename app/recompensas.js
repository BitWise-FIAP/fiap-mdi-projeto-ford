import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';
import { getUserData } from '../src/utils/userStorage';

function nivelPontos(pontos) {
  if (pontos >= 100) return { nome: 'Motor Expert', proximo: null, progresso: 100 };
  if (pontos >= 50) return { nome: 'Mecânico Digital', proximo: 100, progresso: pontos };
  if (pontos >= 20) return { nome: 'Analista Iniciante', proximo: 50, progresso: pontos };
  return { nome: 'Piloto de Garagem', proximo: 20, progresso: pontos };
}

export default function Recompensas() {
  const { tema, modoEscuro } = useTheme();
  const [pontos, setPontos] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const carregar = async () => {
        const valor = await getUserData('pontos', '0');
        const numero = Number.parseInt(valor, 10);
        setPontos(Number.isFinite(numero) ? numero : 0);
      };
      carregar();
    }, [])
  );

  const nivel = nivelPontos(pontos);
  const progresso = nivel.progresso;
  const inicio = pontos >= 100 ? 100 : pontos >= 50 ? 50 : pontos >= 20 ? 20 : 0;
  const fim = nivel.proximo || 100;
  const percentual = nivel.proximo ? Math.min(100, Math.max(0, ((progresso - inicio) / (fim - inicio)) * 100)) : 100;

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={modoEscuro ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.titulo, { color: tema.texto }]}>Recompensas</Text>

        <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <View style={styles.cardTexto}>
            <Text style={styles.label}>Seu nível</Text>
            <Text style={[styles.nivel, { color: tema.texto }]}>{nivel.nome}</Text>
            <Text style={[styles.descricao, { color: tema.subtitulo }]}>
              {nivel.proximo ? `${nivel.proximo - pontos} pts para o próximo nível` : 'Nível máximo atingido!'}
            </Text>
            <View style={[styles.progressBg, { backgroundColor: tema.divisor }]}>
              <View style={[styles.progressFill, { width: `${percentual}%` }]} />
            </View>
          </View>
          <MaterialCommunityIcons name="medal-outline" size={82} color={tema.subtitulo} />
        </View>

        <View style={[styles.cardMenor, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <View>
            <Text style={styles.label}>Seus pontos</Text>
            <Text style={[styles.pontos, { color: tema.texto }]}>
              {pontos.toLocaleString('pt-BR')} <Text style={styles.pts}>pts</Text>
            </Text>
          </View>
          <MaterialCommunityIcons name="seal-variant" size={78} color="#1D7DFF" />
        </View>

        <View style={[styles.cardMenor, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <View style={styles.recompensaTexto}>
            <Text style={styles.label}>Resgate seus pontos</Text>
            <Text style={[styles.descricao, { color: tema.subtitulo }]}>Os benefícios aparecerão aqui em breve.</Text>
          </View>
          <Ionicons name="gift" size={70} color="#1D7DFF" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginBottom: 26 },
  card: { borderRadius: 14, padding: 18, minHeight: 145, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderWidth: 1 },
  cardMenor: { borderRadius: 14, padding: 18, minHeight: 105, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderWidth: 1 },
  cardTexto: { flex: 1, paddingRight: 10 },
  recompensaTexto: { flex: 1, paddingRight: 10 },
  label: { color: '#2F8CFF', fontSize: 16, fontWeight: '800', marginBottom: 8 },
  nivel: { fontSize: 28, fontWeight: '900', marginBottom: 18 },
  descricao: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  progressBg: { width: '100%', height: 7, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8, backgroundColor: '#2F8CFF' },
  pontos: { fontSize: 30, fontWeight: '900' },
  pts: { fontSize: 16, fontWeight: '800' },
});
