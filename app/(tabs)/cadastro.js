import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [imagem, setImagem] = useState('');
  const { tema } = useTheme();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'É preciso permitir acesso à galeria para escolher uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!nome || !ano || !cor) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const novoCarro = {
      id: Date.now().toString(),
      nome,
      ano,
      cor,
      imagem: imagem || 'https://via.placeholder.com/300',
    };

    try {
      const stored = await AsyncStorage.getItem('carros');
      const carros = stored ? JSON.parse(stored) : [];
      carros.push(novoCarro);
      await AsyncStorage.setItem('carros', JSON.stringify(carros));
      Alert.alert('Sucesso', 'Carro cadastrado com sucesso!');

      setNome('');
      setAno('');
      setCor('');
      setImagem('');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o carro.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, {color: tema.texto}]}>Adicionar Carro</Text>

      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        placeholder="Modelo do carro"
        placeholderTextColor={tema.subtitulo}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        placeholder="Ano (ex: 2022)"
        placeholderTextColor={tema.subtitulo}
        value={ano}
        onChangeText={setAno}
        keyboardType="number-pad"
      />

      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        placeholder="Cor"
        placeholderTextColor={tema.subtitulo}
        value={cor}
        onChangeText={setCor}
      />

      <TouchableOpacity style={[styles.imageButton, { borderColor: '#1D7DFF' }]} onPress={pickImage}>
        <Text style={[styles.imageButtonText, { color: '#1D7DFF' }]}>Escolher foto do carro</Text>
      </TouchableOpacity>

      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.preview} />
      ) : null}

      <TextInput
        style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
        placeholder="URL da imagem (opcional)"
        placeholderTextColor={tema.subtitulo}
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: '#1D7DFF' }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.voltar, { color: '#1D7DFF' }]}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  voltar: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
