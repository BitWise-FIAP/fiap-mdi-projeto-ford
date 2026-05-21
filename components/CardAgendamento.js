import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function CardAgendamento() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Próxima recomendação</Text>
          <Text style={styles.title}>Revisão em 5.000 km</Text>
          <Text style={styles.subtitle}>ou em 30 dias</Text>
        </View>

        <Ionicons name="calendar-outline" size={34} color="#FFFFFF" />
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