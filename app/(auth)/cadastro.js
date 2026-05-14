import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [repetirSenhaVisivel, setRepetirSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validar = () => {
    const novosErros = {};
    if (nome.trim().length < 2) novosErros.nome = 'Nome deve ter pelo menos 2 caracteres';
    if (!email.includes('@') || !email.includes('.')) novosErros.email = 'E-mail inválido';
    if (senha.length < 6) novosErros.senha = 'Senha deve ter mínimo 6 caracteres';
    if (senha !== repetirSenha) novosErros.repetirSenha = 'Senhas não coincidem';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async () => {
    if (validar()) {
      setLoading(true);
      try {
        // Load existing users
        const usersStr = await AsyncStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        // Check if email exists
        if (users.find(u => u.email === email)) {
          Alert.alert('Erro', 'E-mail já cadastrado!');
          return;
        }
        // Add new user
        const newUser = {
          id: Date.now().toString(),
          nome,
          email,
          senha // In real app, hash password
        };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        // Auto-login
        await AsyncStorage.setItem('userToken', newUser.id);
        Alert.alert('Sucesso!', `Bem-vindo, ${nome}! 🎉`, [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]);
      } catch (error) {
        Alert.alert('Erro', 'Falha no cadastro.');
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
      <Text style={styles.titulo}>Cadastro</Text>
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!senhaVisivel}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <Text
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          style={styles.olho}
        >
          {senhaVisivel ? '🙈' : '👁️'}
        </Text>
      </View>
      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Repetir senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry={!repetirSenhaVisivel}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <Text
          onPress={() => setRepetirSenhaVisivel(!repetirSenhaVisivel)}
          style={styles.olho}
        >
          {repetirSenhaVisivel ? '🙈' : '👁️'}
        </Text>
      </View>
      {erros.repetirSenha && <Text style={styles.erro}>{erros.repetirSenha}</Text>}
      <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.linkBotao} 
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={styles.linkTexto}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9F9FB',
  },

  titulo: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 32,
    color: '#111111',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFF2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 8,
    fontSize: 16,
    color: '#111111',
  },

  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFF2',
    borderRadius: 16,
    marginBottom: 8,
    paddingRight: 4,
  },

  olho: {
    padding: 14,
    fontSize: 20,
  },

  erro: {
    color: '#E83D84',
    marginBottom: 8,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
  },

  botao: {
    backgroundColor: '#E83D84',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  linkBotao: {
    marginTop: 18,
    alignItems: 'center',
  },

  linkTexto: {
    color: '#E83D84',
    fontSize: 15,
    fontWeight: '700',
  },
});