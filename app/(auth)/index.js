import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export default function AuthIndex() {
  const router = useRouter();

  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificarLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');

      if (token) {
        router.replace('/(tabs)');
        return;
      }

      setVerificando(false);
    };

    verificarLogin();
  }, []);

  if (verificando) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#087BFF" />
    </View>
  );
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <Image
          source={require('../../assets/logo-ford.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          <Text style={styles.tituloAzul}>VIN</Text>
          <Text style={styles.tituloBranco}>culo</Text>
        </Text>

        <Text style={styles.subtitulo}>
          Sua jornada Ford{'\n'}começa aqui.
        </Text>

        <Image
          source={require('../../assets/ranger-azul.png')}
          style={styles.carro}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.botaoEntrarTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={() => router.push('/(auth)/cadastro')}
        >
          <Text style={styles.botaoCriarTexto}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.convidado}>Entrar como convidado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B4D',
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 220,
    height: 100,
    marginBottom: 4,
  },

  titulo: {
    fontSize: 46,
    fontWeight: '900',
    marginBottom: 12,
  },

  tituloAzul: {
    color: '#0A74FF',
  },

  tituloBranco: {
    color: '#FFFFFF',
  },

  subtitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 22,
  },

  carro: {
    width: 360,
    height: 230,
    marginBottom: 42,
  },

  botaoEntrar: {
    width: '100%',
    backgroundColor: '#087BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },

  botaoEntrarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  botaoCriar: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#087BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },

  botaoCriarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  convidado: {
    color: '#9FA8C0',
    fontSize: 14,
    fontWeight: '600',
  },
});