import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

export default function CardRisco() {
  const { tema } = useTheme();
  const pontuacao = 18;

  return (
    <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Saúde da relação Ford</Text>
          <Text style={[styles.risco, { color: tema.texto }]}>Baixo risco</Text>
        </View>
        <Text style={styles.percentual}>{pontuacao}<Text style={styles.simbolo}>%</Text></Text>
      </View>

      <View style={[styles.progressBackground, { backgroundColor: tema.divisor }]}>
        <View style={[styles.progressFill, { width: `${pontuacao}%` }]} />
      </View>

      <Text style={[styles.mensagem, { color: tema.subtitulo }]}>
        <Text style={styles.destaque}>Excelente! </Text>
        Você está no caminho certo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  label: {
    color: '#2F8CFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  risco: {
    fontSize: 22,
    fontWeight: '800',
  },
  percentual: {
    color: '#22C55E',
    fontSize: 42,
    fontWeight: '800',
  },
  simbolo: {
    fontSize: 22,
    fontWeight: '800',
  },
  progressBackground: {
    width: '100%',
    height: 8,
    borderRadius: 8,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#22C55E',
  },
  mensagem: {
    fontSize: 14,
    fontWeight: '600',
  },
  destaque: {
    color: '#22C55E',
    fontWeight: '800',
  },
});
