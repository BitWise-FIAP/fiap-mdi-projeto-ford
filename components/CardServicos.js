import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../src/context/ThemeContext';

export default function CardServicos({ icon, title, subtitle, onPress }) {
  const { tema } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: tema.card, borderColor: tema.borda }]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Agendar ${title}`}
    >
      <View style={styles.itemIcon}>
        <MaterialCommunityIcons name={icon} size={28} color="#1D7DFF" />
      </View>

      <View style={styles.itemTextos}>
        <Text style={[styles.itemTitle, { color: tema.texto }]}>{title}</Text>
        <Text style={[styles.itemSubtitle, { color: tema.subtitulo }]}>{subtitle}</Text>
      </View>

      <Text style={styles.agendar}>Agendar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    borderWidth: 1,
  },
  itemIcon: { width: 42, alignItems: 'center', marginRight: 10 },
  itemTextos: { flex: 1, paddingRight: 8 },
  itemTitle: { fontSize: 13, fontWeight: '800', marginBottom: 3 },
  itemSubtitle: { fontSize: 11, fontWeight: '700' },
  agendar: { color: '#2F8CFF', fontSize: 12, fontWeight: '800' },
});
