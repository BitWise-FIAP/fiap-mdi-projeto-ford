import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../app/ThemeContext';

export default function CardHome({ icon, title, onPress }) {
  const { tema } = useTheme();
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: tema.card }, {borderColor: tema.borda}]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color="#EC0E7A" />
        <Text style={[styles.title, { color: tema.texto }]}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward-outline" size={20} color="#777" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFF2',
    borderRadius: 14,
    minHeight: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#111',
    marginLeft: 12,
    fontWeight: '500',
  },
});