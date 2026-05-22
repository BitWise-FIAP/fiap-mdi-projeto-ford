import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function EditarPerfil() {
  const { tema } = useTheme();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [userId, setUserId] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserId(token);
          const usersStr = await AsyncStorage.getItem('users');
          if (usersStr) {
            const users = JSON.parse(usersStr);
            const user = users.find(u => u.id === token);
            if (user) {
              setNome(user.nome || '');
              setEmail(user.email || '');
              setTelefone(user.telefone || '');
            }
          }
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, []);

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome não pode ficar vazio.');
      return;
    }

    try {
      const usersStr = await AsyncStorage.getItem('users');
      if (usersStr && userId) {
        const users = JSON.parse(usersStr);
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
          users[index].nome = nome.trim();
          users[index].telefone = telefone;
          await AsyncStorage.setItem('users', JSON.stringify(users));
          Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
          router.back();
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar alterações.');
    }
  };

  if (carregando) {
    return (
      <View style={[styles.container, { backgroundColor: tema.fundo, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.carregando, { color: tema.subtitulo }]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]} contentContainerStyle={styles.content}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Editar Perfil</Text>

      <Text style={[styles.label, { color: tema.subtitulo }]}>Nome</Text>
      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        placeholderTextColor={tema.subtitulo}
      />

      <Text style={[styles.label, { color: tema.subtitulo }]}>E-mail</Text>
      <View style={[styles.inputDisabled, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <Ionicons name="lock-closed-outline" size={16} color={tema.subtitulo} style={{ marginRight: 6 }} />
        <Text style={[styles.emailTexto, { color: tema.subtitulo }]}>{email}</Text>
      </View>
      <Text style={[styles.aviso, { color: tema.subtitulo }]}>O e-mail não pode ser alterado, pois é o identificador principal da conta.</Text>

      <Text style={[styles.label, { color: tema.subtitulo }]}>Telefone</Text>
      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="(11) 99999-9999"
        placeholderTextColor={tema.subtitulo}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: '#1D7DFF' }]} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputDisabled: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emailTexto: {
    fontSize: 15,
    fontWeight: '600',
  },
  aviso: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  carregando: {
    fontSize: 16,
  },
});
