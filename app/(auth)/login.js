import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Image, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validar = () => {
    const novosErros = {};
    if (!email.includes('@')) novosErros.email = 'E-mail inválido';
    if (senha.length < 6) novosErros.senha = 'Senha deve ter mínimo 6 caracteres';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async () => {
    if (validar()) {
      setLoading(true);
      try {
        const usersStr = await AsyncStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const user = users.find(u => u.email === email && u.senha === senha);

        if (user) {
          await AsyncStorage.setItem('userToken', user.id);
          Alert.alert('Sucesso!', `Bem-vindo, ${user.nome}! 🎉`, [
            { text: 'OK', onPress: () => router.replace('/(tabs)') }
          ]);
        } else {
          Alert.alert('Erro', 'E-mail ou senha incorretos!');
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha no login.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#020B24" />

      <View style={styles.content}>
        <Image
          source={require('../../assets/logo-ford.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Ford {''}
          <Text style={styles.tituloAzul}>VIN</Text>
          <Text style={styles.tituloBranco}>culo</Text>
        </Text>

        <Text style={styles.subtitulo}>Conectado com você.</Text>

        <Text style={styles.chamada}>Entre na sua conta</Text>
        <Text style={styles.chamadaMenor}>para continuar</Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#8C99B2" style={styles.icone}/>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#8C99B2"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#8C99B2" style={styles.icone} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#8C99B2"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>

          <Ionicons
            name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#8C99B2"
          />
        </TouchableOpacity>

      </View>

        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <TouchableOpacity style={styles.esqueciBotao}>
          <Text style={styles.esqueciTexto}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cadastroBotao}
          onPress={() => router.push('/(auth)/cadastro')}
        >
          <Text style={styles.cadastroTexto}>
            Ainda não tem uma conta?{' '}
            <Text style={styles.cadastroLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.socialTexto}>ou entre com</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialCircle}>
            <Text style={styles.google}>G</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialCircle}>
            <Text style={styles.apple}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialCircle, styles.facebookCircle]}>
            <Text style={styles.facebook}>f</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B24',
    
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 70,
    alignItems: 'center',
    //justifyContent: 'center'
  },

  logo: {
    width: 220,
    height: 100,
    marginBottom: 6,
  },

   titulo: {
    fontSize: 46,
    fontWeight: '900',
    color: '#FFFFFF',
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
    marginBottom: 60,
  },

  chamada: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 3,
  },

  chamadaMenor: {
    color: '#C4CAD8',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 24,
  },

  inputBox: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#24436D',
    borderRadius: 8,
    backgroundColor: 'rgba(8, 27, 65, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 10,
  },

icone: {
  marginRight: 10,
},

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  olho: {
    fontSize: 16,
    paddingLeft: 10,
  },

  erro: {
    width: '100%',
    color: '#2F8CFF',
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '700',
  },

  esqueciBotao: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -2,
    marginBottom: 18,
  },

  esqueciTexto: {
    color: '#0B7BFF',
    fontSize: 12,
    fontWeight: '800',
  },

  botao: {
    width: '100%',
    height: 49,
    backgroundColor: '#087BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  cadastroBotao: {
    marginBottom: 70,
  },

  cadastroTexto: {
    color: '#B7C0D3',
    fontSize: 13,
    fontWeight: '600',
  },

  cadastroLink: {
    color: '#0B7BFF',
    fontWeight: '800',
  },

  socialTexto: {
    color: '#C5CAD5',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 20,
  },

  socialContainer: {
    flexDirection: 'row',
    gap: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  google: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4285F4',
  },

  apple: {
    fontSize: 22,
    color: '#111111',
    fontWeight: '800',
  },

  facebookCircle: {
    backgroundColor: '#1877F2',
  },

  facebook: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },
});