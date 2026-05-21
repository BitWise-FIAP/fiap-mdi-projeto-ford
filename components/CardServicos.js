import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ServicoItem({ icon, title, subtitle }) {
    const router = useRouter();
  return (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <MaterialCommunityIcons name={icon} size={28} color="#A9B7D0" />
      </View>

      <View style={styles.itemTextos}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity>
        <Text style={styles.agendar}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
    backgroundColor: '#071B3B',
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },

  itemIcon: {
    width: 42,
    alignItems: 'center',
    marginRight: 10,
  },

  itemTextos: {
    flex: 1,
  },

  itemTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  itemSubtitle: {
    color: '#8F9CB4',
    fontSize: 11,
    fontWeight: '700',
  },

  agendar: {
    color: '#2F8CFF',
    fontSize: 12,
    fontWeight: '800',
  },
})