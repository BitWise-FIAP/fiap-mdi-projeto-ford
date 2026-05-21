import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import CardServico from '../../components/CardServicos'

export default function Servicos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020B24" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Recomendações</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.cardDestaque}>
          <View style={styles.cardTexto}>
            <Text style={styles.label}>Recomendação para você</Text>
            <Text style={styles.tituloCard}>Troca de óleo</Text>
            <Text style={styles.descricao}>
              Com base no uso do seu veículo, recomendamos a troca de óleo em breve.
            </Text>

            <TouchableOpacity style={styles.botao} onPress={() => router.push('/agendamento')}>
              <Text style={styles.botaoTexto}>Agendar agora</Text>
            </TouchableOpacity>
          </View>

          <MaterialCommunityIcons name="car-wrench" size={88} color="#AFCBFF" />
        </View>

        <Text style={styles.sectionTitle}>Outras recomendações</Text>

        <CardServico
          icon="car-tire-alert"
          title="Alinhamento e balanceamento"
          subtitle="Ideal a cada 10.000 km"
        />

        <CardServico
          icon="car-brake-alert"
          title="Verificação de freios"
          subtitle="Segurança em primeiro lugar"
        />

        <CardServico
          icon="air-filter"
          title="Higienização do ar"
          subtitle="Mais saúde para você"
        />
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B24',
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  cardDestaque: {
    backgroundColor: '#062E70',
    borderRadius: 14,
    padding: 16,
    minHeight: 160,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 22,
  },

  cardTexto: {
    flex: 1,
  },

  label: {
    color: '#2F8CFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },

  tituloCard: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },

  descricao: {
    color: '#D5DCEB',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  botao: {
    backgroundColor: '#087BFF',
    borderRadius: 8,
    width: 150,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  sectionTitle: {
    color: '#2F8CFF',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },

  
});