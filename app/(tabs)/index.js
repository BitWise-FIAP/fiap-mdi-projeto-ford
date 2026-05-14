import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import CardPerdido from '../../components/CardPerdido';
import CardHome from '../../components/CardHome';
import Carossel from '../../components/Carrossel';

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
        <Image source={require('../../assets/fiap-logo.png')} style={styles.logo}/>
      </View>
      <CardPerdido></CardPerdido>
      <View style={styles.section}> 
        <Carossel></Carossel>
      </View>
      
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
  section: {
    marginTop: 50,
  },
  // botao:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, alignItems: "center" },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },

  button: {
    backgroundColor: '#EC0E7A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
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
 
  
});