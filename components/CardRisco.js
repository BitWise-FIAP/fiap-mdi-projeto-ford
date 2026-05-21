import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../app/ThemeContext';

export default function CardRisco() {
    const { tema } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: tema.card }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Churn Risk Score</Text>
          <Text style={styles.risco}>Baixo risco</Text>
        </View>

        <Text style={styles.percentual}>18<Text style={styles.simbolo}>%</Text></Text>
      </View>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.mensagem}>
        <Text style={styles.destaque}>Excelente! </Text>
        Você está no caminho certo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#071B3B',
    borderRadius: 14,
    padding: 16,
    width: '100%',
    marginTop: 20,
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
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  percentual: {
    color: '#78F34D',
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
    backgroundColor: '#223A5F',
    marginBottom: 18,
    overflow: 'hidden',
  },

  progressFill: {
    width: '18%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#78F34D',
  },

  mensagem: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  destaque: {
    color: '#78F34D',
    fontWeight: '800',
  },
});