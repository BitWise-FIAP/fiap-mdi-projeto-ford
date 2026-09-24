import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CardAgendamento from '../../components/CardAgendamento';
import CardHome from '../../components/CardHome';
import Carrossel from '../../components/Carrossel';
import CardRisco from '../../components/CardRisco';
import { getUserData } from '../../src/utils/userStorage';
import { useAuth } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('Usuário');
  const [pontos, setPontos] = useState(0);
  const { isGuest } = useAuth();
  const { tema } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const [token, pontosSalvos] = await Promise.all([
            AsyncStorage.getItem('userToken'),
            getUserData('pontos', '0'),
          ]);

          const pontosNumero = Number.parseInt(pontosSalvos, 10);
          setPontos(Number.isFinite(pontosNumero) ? pontosNumero : 0);

          if (token) {
            const usersStr = await AsyncStorage.getItem('users');
            const users = usersStr ? JSON.parse(usersStr) : [];
            const user = users.find((usuario) => usuario.id === token);
            if (user?.nome) {
              setUserName(user.nome.split(' ')[0]);
            }
          } else if (isGuest) {
            setUserName('Convidado');
          }
        } catch (error) {
          console.log('Erro ao carregar dados da Home:', error);
        }
      };

      carregarDados();
    }, [isGuest])
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.saudacao}>
          <Text style={[styles.title, { color: tema.texto }]}>Olá, {userName}</Text>
          <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Seu Ford conectado.</Text>
        </View>
        <Image source={require('../../assets/logo-ford.png')} style={styles.logo} />
      </View>

      <CardAgendamento />
      <CardRisco />
      <Carrossel />

      <TouchableOpacity
        style={[styles.cardPontuacao, { backgroundColor: tema.card, borderColor: tema.borda }]}
        onPress={() => router.push('/recompensas')}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.label}>Veja sua pontuação</Text>
          <Text style={[styles.pontos, { color: tema.texto }]}>
            {pontos.toLocaleString('pt-BR')} <Text style={styles.pts}>pts</Text>
          </Text>
        </View>
        <MaterialCommunityIcons name="seal-variant" size={78} color="#1D7DFF" />
      </TouchableOpacity>

      <View style={styles.actions}>
        <CardHome
          icon="car-outline"
          title="Adicionar carro"
          onPress={() => router.push('/(tabs)/cadastro')}
        />
        <CardHome
          icon="eye-outline"
          title="Ver todos os carros"
          onPress={() => router.push('/carros')}
        />
        <CardHome
          icon="chatbubble-outline"
          title="Falar com suporte"
          onPress={() => router.push('/suporte')}
        />
        <CardHome
          icon="person-outline"
          title="Ir para o perfil"
          onPress={() => router.push('/(tabs)/perfil')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saudacao: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  cardPontuacao: {
    borderRadius: 14,
    padding: 18,
    minHeight: 105,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
  },
  label: {
    color: '#2F8CFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  pontos: {
    fontSize: 30,
    fontWeight: '900',
  },
  pts: {
    fontSize: 15,
    fontWeight: '800',
  },
  actions: {
    marginTop: 8,
  },
});
