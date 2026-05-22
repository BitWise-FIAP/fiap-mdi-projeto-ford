import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function Recompensas() {
  const { tema } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle="light-content" backgroundColor={tema.fundo} />

      <Text style={[styles.titulo, { color: tema.texto }]}>Recompensas</Text>

      <View style={[styles.card, { backgroundColor: tema.card }]}>
        <View>
          <Text style={styles.label}>Seu nível</Text>
          <Text style={[styles.nivel, { color: tema.texto }]}>Prata</Text>
          <Text style={[styles.descricao, { color: tema.subtitulo }]}>1.250 pts para o próximo nível</Text>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <MaterialCommunityIcons name="medal-outline" size={82} color={tema.subtitulo} />
      </View>

      <View style={[styles.cardMenor, { backgroundColor: tema.card }]}>
        <View>
          <Text style={styles.label}>Seus pontos</Text>
          <Text style={[styles.pontos, { color: tema.texto }]}>2.750 <Text style={styles.pts}>pts</Text></Text>
        </View>

        <MaterialCommunityIcons name="seal-variant" size={78} color="#1D7DFF" />
      </View>

      <View style={[styles.cardMenor, { backgroundColor: tema.card }]}>
        <View>
          <Text style={styles.label}>Resgate seus pontos</Text>
          <Text style={[styles.descricao, { color: tema.subtitulo }]}>Troque por benefícios exclusivos!</Text>
        </View>

        <Ionicons name="gift" size={70} color="#1D7DFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B24',
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 26,
  },

  card: {
    backgroundColor: '#071B3B',
    borderRadius: 14,
    padding: 18,
    minHeight: 145,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  cardMenor: {
    backgroundColor: '#071B3B',
    borderRadius: 14,
    padding: 18,
    minHeight: 105,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  label: {
    color: '#2F8CFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },

  nivel: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 18,
  },

  descricao: {
    color: '#D4DBEA',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  progressBg: {
    width: 190,
    height: 7,
    borderRadius: 8,
    backgroundColor: '#1A3559',
    overflow: 'hidden',
  },

  progressFill: {
    width: '55%',
    height: '100%',
    backgroundColor: '#2F8CFF',
    borderRadius: 8,
  },

  pontos: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },

  pts: {
    fontSize: 16,
    fontWeight: '800',
  },
});