import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, StatusBar, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function Cadastro() {
  const { tema } = useTheme();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [repetirSenhaVisivel, setRepetirSenhaVisivel] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validar = () => {
    const novosErros = {};

    if (nome.trim().length < 2) novosErros.nome = 'Nome deve ter pelo menos 2 caracteres';
    if (!email.includes('@') || !email.includes('.')) novosErros.email = 'E-mail inválido';
    if (cpf.length < 11) novosErros.cpf = 'CPF inválido';
    if (telefone.length < 10) novosErros.telefone = 'Telefone inválido';
    if (senha.length < 8) novosErros.senha = 'Senha deve ter mínimo 8 caracteres';
    if (senha !== repetirSenha) novosErros.repetirSenha = 'Senhas não coincidem';
    if (!aceitouTermos) novosErros.termos = 'Você precisa aceitar os termos';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async () => {
    if (validar()) {
      setLoading(true);

      try {
        const usersStr = await AsyncStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];

        if (users.find(u => u.email === email)) {
          Alert.alert('Erro', 'E-mail já cadastrado!');
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          nome,
          email,
          cpf,
          telefone,
          senha
        };

        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
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
      style={[styles.container, { backgroundColor: tema.fundo }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={tema.fundo} />

      <ScrollView
        contentContainerStyle={[styles.content, { backgroundColor: tema.fundo }]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.voltar} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={tema.texto} />
        </TouchableOpacity>

        <Text style={[styles.titulo, { color: tema.texto }]}>Criar conta</Text>
        <Text style={[styles.subtitulo, { color: tema.subtitulo }]}>É rápido e fácil</Text>

        <View style={styles.steps}>
          <View style={styles.stepAtivo}>
            <Text style={styles.stepAtivoTexto}>1</Text>
          </View>
          <View style={styles.linhaStep} />
          <View style={styles.step}>
            <Text style={styles.stepTexto}>2</Text>
          </View>
          <View style={styles.linhaStep} />
          <View style={styles.step}>
            <Text style={styles.stepTexto}>3</Text>
          </View>
        </View>

        <Text style={[styles.label, { color: tema.subtitulo }]}>Nome completo</Text>
        <TextInput
          placeholder="Digite seu nome"
          placeholderTextColor={tema.subtitulo}
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        />
        {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

        <Text style={[styles.label, { color: tema.subtitulo }]}>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          placeholderTextColor={tema.subtitulo}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <Text style={[styles.label, { color: tema.subtitulo }]}>CPF</Text>
        <TextInput
          placeholder="000.000.000-00"
          placeholderTextColor={tema.subtitulo}
          value={cpf}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, '');

            let formatted = cleaned;

            formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
            formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
            formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

            setCpf(formatted);
          }}
          keyboardType="number-pad"
          maxLength={14}
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        />
        {erros.cpf && <Text style={styles.erro}>{erros.cpf}</Text>}

        <Text style={[styles.label, { color: tema.subtitulo }]}>Telefone</Text>
        <TextInput
          placeholder="(11) 99999-9999"
          placeholderTextColor={tema.subtitulo}
          value={telefone}
          onChangeText={(text) => {
            const cleaned = text.replace(/\D/g, '');

            let formatted = cleaned;

            formatted = formatted.replace(/^(\d{2})(\d)/g, '($1) $2');
            formatted = formatted.replace(/(\d{5})(\d)/, '$1-$2');

            setTelefone(formatted);
          }}
          keyboardType="number-pad"
          maxLength={15}
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        />
        
        {erros.telefone && <Text style={styles.erro}>{erros.telefone}</Text>}

        <Text style={[styles.label, { color: tema.subtitulo }]}>Senha</Text>
        <View style={[styles.senhaContainer, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <TextInput
            placeholder="Mínimo de 8 caracteres"
            placeholderTextColor={tema.subtitulo}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            style={[styles.inputSenha, { color: tema.texto }]}
          />

          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Ionicons
              name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={tema.subtitulo}
            />
          </TouchableOpacity>
        </View>
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <Text style={[styles.label, { color: tema.subtitulo }]}>Confirmar senha</Text>
        <View style={[styles.senhaContainer, { backgroundColor: tema.card, borderColor: tema.borda }]}>
          <TextInput
            placeholder="Confirme sua senha"
            placeholderTextColor={tema.subtitulo}
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            secureTextEntry={!repetirSenhaVisivel}
            style={[styles.inputSenha, { color: tema.texto }]}
          />

          <TouchableOpacity onPress={() => setRepetirSenhaVisivel(!repetirSenhaVisivel)}>
            <Ionicons
              name={repetirSenhaVisivel ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={tema.subtitulo}
            />
          </TouchableOpacity>
        </View>
        {erros.repetirSenha && <Text style={styles.erro}>{erros.repetirSenha}</Text>}

        <TouchableOpacity
          style={styles.termosContainer}
          onPress={() => setAceitouTermos(!aceitouTermos)}
        >
          <View style={[styles.checkbox, aceitouTermos && styles.checkboxAtivo]}>
            {aceitouTermos && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
          </View>

          <Text style={[styles.termosTexto, { color: tema.subtitulo }]}>
            Li e aceito os <Text style={styles.link}>Termos de Uso</Text> e a{'\n'}
            <Text style={styles.link}>Política de Privacidade</Text>
          </Text>
        </TouchableOpacity>
        {erros.termos && <Text style={styles.erro}>{erros.termos}</Text>}

        <TouchableOpacity
          style={styles.botao}
          onPress={handleCadastro}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Continuar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020B24',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 58,
    paddingBottom: 32,
  },

  voltar: {
    position: 'absolute',
    top: 58,
    left: 28,
    zIndex: 10,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitulo: {
    color: '#C9D0DE',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 22,
  },

  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  stepAtivo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#087BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepAtivoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#24436D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepTexto: {
    color: '#8C99B2',
    fontSize: 13,
    fontWeight: '800',
  },

  linhaStep: {
    width: 28,
    height: 1,
    backgroundColor: '#24436D',
  },

  label: {
    color: '#D9DEEA',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },

  input: {
    width: '100%',
    height: 43,
    borderWidth: 1,
    borderColor: '#1D3B63',
    borderRadius: 8,
    backgroundColor: 'rgba(13, 37, 75, 0.85)',
    color: '#FFFFFF',
    paddingHorizontal: 13,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },

  senhaContainer: {
    width: '100%',
    height: 43,
    borderWidth: 1,
    borderColor: '#1D3B63',
    borderRadius: 8,
    backgroundColor: 'rgba(13, 37, 75, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 10,
  },

  inputSenha: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  erro: {
    color: '#0B7BFF',
    fontSize: 11,
    fontWeight: '700',
    marginTop: -5,
    marginBottom: 8,
  },

  termosContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0B7BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },

  checkboxAtivo: {
    backgroundColor: '#0B7BFF',
  },

  termosTexto: {
    color: '#C9D0DE',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  link: {
    color: '#0B7BFF',
    fontWeight: '800',
  },

  botao: {
    width: '100%',
    height: 48,
    backgroundColor: '#087BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
}); 