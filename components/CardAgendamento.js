import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../app/ThemeContext';

export default function CardAgendamento() {
  const router = useRouter();
  const { tema } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: tema.card }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Próxima recomendação</Text>
          <Text style={[styles.title, { color: tema.texto }]}>Revisão em 5.000 km</Text>
          <Text style={[styles.subtitle, { color: tema.subtitulo }]}>ou em 30 dias</Text>
        </View>

        <Ionicons name="calendar-outline" size={34} color="#1D7DFF" />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/servicos')}
      >
        <Text style={styles.buttonText}>Agendar serviço</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#051833',
    borderRadius: 14,
    padding: 16,
    width: '100%', 
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  label: {
    color: '#2F8CFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 3,
  },

  subtitle: {
    color: '#B8C5D9',
    fontSize: 13,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#087BFF',
    borderRadius: 9,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});