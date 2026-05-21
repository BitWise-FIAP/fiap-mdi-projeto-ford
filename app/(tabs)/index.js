import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import CardPerdido from '../../components/CardAgendamento';
import CardHome from '../../components/CardHome';
import Carossel from '../../components/Carrossel';
import CardRisco from '../../components/CardRisco';

import { useTheme } from '../ThemeContext';


export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('Usuário');
  const { tema } = useTheme();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const usersStr = await AsyncStorage.getItem('users');
          if (usersStr) {
            const users = JSON.parse(usersStr);
            const user = users.find(u => u.id === token);
            if (user) {
              setUserName(user.nome);
            }
          }
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      }
    };
    loadUser();
  }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { backgroundColor: tema.fundo }]}>
        <Text style={[styles.title, { color: tema.texto }]}>Olá, {userName}</Text>
        <Image source={require('../../assets/logo-ford.png')} style={styles.logo}/>
      </View>
      <CardPerdido></CardPerdido>
      <CardRisco></CardRisco>
      <View style={styles.section}> 
        <Carossel></Carossel>
      </View>

      <TouchableOpacity style={[styles.cardPontuacao, { backgroundColor: tema.card }]}  onPress={() => router.push('/recompensas')}>
              <View>
                <Text style={styles.label}>Veja Sua Pontuação</Text>
                <Text style={styles.pontos}>2.750 <Text style={styles.pts}>pts</Text></Text>
              </View>
      
              <MaterialCommunityIcons name="seal-variant" size={78} color="#1D7DFF" />
      </TouchableOpacity>
      
      <View style={styles.section}> 
       <View style={styles.actions}>
        <CardHome
          icon="cube-outline"
          title="Cadastrar item encontrado"
          onPress={() => router.push('/cadastro')}
        />

        <CardHome
          icon="eye-outline"
          title="Ver todos os itens"
          onPress={() => router.push('/itens')}
        />

        <CardHome
          icon="chatbubble-outline"
          title="Falar com suporte"
          onPress={() => router.push('/suporte')}
        />
        </View>
      </View>

      {/* <Text style={styles.titulo}>🏠 Home</Text> */}
     <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText} onPress={() => router.push('/perfil')}>Ir para Perfil</Text>
  </TouchableOpacity>
</View>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9FB' },
  // titulo:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
   content: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111',
    // marginBottom: 20,
    // marginTop: 10, 
  },
  
  // botao:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, alignItems: "center" },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },

  button: {
    backgroundColor: '#051833',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  buttonText: {
    color: '#1D7DFF',
    fontWeight: '600',
    fontSize: 16,
  },

  header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},


logo: {
  width: 100,
  height: 50,
  resizeMode: 'contain',
},

cardPontuacao: {
    backgroundColor: '#071B3B',
    borderRadius: 14,
    padding: 18,
    minHeight: 105,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

   label: {
    color: '#2F8CFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },

   pontos: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },

});