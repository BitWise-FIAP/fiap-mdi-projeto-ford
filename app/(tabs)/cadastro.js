import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
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
    if (!nome || !descricao || !local || !data) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const newItem = {
      id: Date.now(),
      nome,
      descricao,
      local_perdido: local,
      data,
      imagem: imagem || 'https://via.placeholder.com/300',
    };

    try {
      const storedItens = await AsyncStorage.getItem('itens');
      const itens = storedItens ? JSON.parse(storedItens) : [];
      itens.push(newItem);
      await AsyncStorage.setItem('itens', JSON.stringify(itens));
      Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
      
      setNome('');
      setDescricao('');
      setLocal('');
      setData('');
      setImagem('');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o item.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, {color: tema.texto}]}>Cadastrar Item</Text>

      <TextInput
        style={[styles.input, { backgroundColor: tema.card }, {borderColor: tema.borda}]}
        placeholder="Nome do item"
        placeholderTextColor={tema.texto}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={[styles.input, { backgroundColor: tema.card }, {borderColor: tema.borda}]}
        placeholder="Descrição"
        placeholderTextColor={tema.texto}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={[styles.input, { backgroundColor: tema.card }, {borderColor: tema.borda}]}
        placeholder="Local perdido"
        placeholderTextColor={tema.texto}
        value={local}
        onChangeText={setLocal}
      />

      <TextInput
        style={[styles.input, { backgroundColor: tema.card }, {borderColor: tema.borda}]}
        placeholder="Data (YYYY-MM-DD)"
        placeholderTextColor={tema.texto}
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Escolher imagem do iPhone</Text>
      </TouchableOpacity>

      {imagem ? (
        <Image source={{ uri: imagem }} style={styles.preview} />
      ) : null}

      <TextInput
        style={[styles.input, , { backgroundColor: tema.card }, {borderColor: tema.borda}]}
        placeholder="URL da imagem (opcional)"
        placeholderTextColor={tema.texto}
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
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
    borderColor: '#EFEFF2',
    backgroundColor: "#FFFFFF", 
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#EC0E7A',
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
    borderColor: '#E83D84',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#E83D84',
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
    color: '#E83D84',
    fontWeight: '600',
    textAlign: 'center',
  },
});