import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Agendamento() {
  const router = useRouter();
  const [diaSelecionado, setDiaSelecionado] = useState('TER 20');
  const [horaSelecionada, setHoraSelecionada] = useState('09:00');

  const dias = [
    { semana: 'DOM', dia: '18' },
    { semana: 'SEG', dia: '19' },
    { semana: 'TER', dia: '20' },
    { semana: 'QUA', dia: '21' },
    { semana: 'QUI', dia: '22' },
    { semana: 'SEX', dia: '23' },
    { semana: 'SÁB', dia: '24' },
  ];

  const horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020B24" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Agendar serviço</Text>

        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Serviço selecionado</Text>

      <View style={styles.card}>
        <View style={styles.iconBoxYellow}>
          <MaterialCommunityIcons name="oil" size={24} color="#FFFFFF" />
        </View>

        <View>
          <Text style={styles.cardTitle}>Revisão 40.000 km</Text>
          <Text style={styles.cardSubtitle}>Ranger Limited 2022</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Concessionária</Text>

      <View style={styles.card}>
        <View style={styles.iconBoxDark}>
          <Ionicons name="location-outline" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>Ford Mix - Vila Olímpia</Text>
          <Text style={styles.cardSubtitle}>1,2 km de você</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.trocar}>Trocar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Escolha a data</Text>

      <View style={styles.daysContainer}>
        {dias.map((item) => {
          const ativo = diaSelecionado === `${item.semana} ${item.dia}`;

          return (
            <TouchableOpacity
              key={`${item.semana}-${item.dia}`}
              style={[styles.dayItem, ativo && styles.dayItemActive]}
              onPress={() => setDiaSelecionado(`${item.semana} ${item.dia}`)}
            >
              <Text style={[styles.dayWeek, ativo && styles.activeText]}>
                {item.semana}
              </Text>
              <Text style={[styles.dayNumber, ativo && styles.activeText]}>
                {item.dia}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Horários disponíveis</Text>

      <View style={styles.hoursContainer}>
        {horarios.map((hora) => {
          const ativo = horaSelecionada === hora;

          return (
            <TouchableOpacity
              key={hora}
              style={[styles.hourItem, ativo && styles.hourItemActive]}
              onPress={() => setHoraSelecionada(hora)}
            >
              <Text style={[styles.hourText, ativo && styles.activeText]}>
                {hora}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B24',
    paddingHorizontal: 24,
    paddingTop: 54,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  sectionTitle: {
    color: '#2F8CFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 9,
  },

  card: {
    backgroundColor: '#071B3B',
    borderRadius: 11,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  iconBoxYellow: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: '#D79B21',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  iconBoxDark: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: '#102B55',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 3,
  },

  cardSubtitle: {
    color: '#9AA8BF',
    fontSize: 12,
    fontWeight: '600',
  },

  trocar: {
    color: '#2F8CFF',
    fontSize: 12,
    fontWeight: '800',
  },

  daysContainer: {
    backgroundColor: '#071B3B',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  dayItem: {
    width: 36,
    height: 48,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayItemActive: {
    backgroundColor: '#087BFF',
  },

  dayWeek: {
    color: '#9AA8BF',
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 5,
  },

  dayNumber: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  activeText: {
    color: '#FFFFFF',
  },

  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 'auto',
  },

  hourItem: {
    width: 64,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#24436D',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#071B3B',
  },

  hourItemActive: {
    backgroundColor: '#087BFF',
    borderColor: '#087BFF',
  },

  hourText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },

  confirmButton: {
    height: 48,
    borderRadius: 9,
    backgroundColor: '#087BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});