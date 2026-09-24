import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../src/context/ThemeContext';
import { getJsonUserData, setJsonUserData } from '../../src/utils/userStorage';

const ANO_MAXIMO = new Date().getFullYear() + 1;

export default function Cadastro() {
  const router = useRouter();
  const { tema } = useTheme();
  const [form, setForm] = useState({
    nome: '',
    ano: '',
    cor: '',
    placa: '',
    quilometragem: '',
    vin: '',
    proximaRevisao: '',
    garantia: '',
    planoManutencao: '',
    imagem: '',
  });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      updateField('imagem', result.assets[0].uri);
    }
  };

  const validar = () => {
    const ano = Number.parseInt(form.ano, 10);
    const quilometragem = Number.parseInt(form.quilometragem.replace(/\D/g, ''), 10);
    const vinValido = !form.vin.trim() || /^[A-HJ-NPR-Z0-9]{17}$/i.test(form.vin.trim());

    if (form.nome.trim().length < 2) {
      Alert.alert('Erro', 'Informe o modelo do veículo.');
      return false;
    }
    if (!Number.isInteger(ano) || ano < 1886 || ano > ANO_MAXIMO) {
      Alert.alert('Erro', `Informe um ano válido entre 1886 e ${ANO_MAXIMO}.`);
      return false;
    }
    if (!form.cor.trim()) {
      Alert.alert('Erro', 'Informe a cor do veículo.');
      return false;
    }
    if (!/^[A-Z]{3}\d[A-Z0-9]\d{2}$/i.test(form.placa.replace(/[^a-zA-Z0-9]/g, ''))) {
      Alert.alert('Erro', 'Informe uma placa válida, como ABC1D23.');
      return false;
    }
    if (!Number.isFinite(quilometragem) || quilometragem < 0) {
      Alert.alert('Erro', 'Informe uma quilometragem válida.');
      return false;
    }
    if (!vinValido) {
      Alert.alert('Erro', 'O VIN deve ter 17 caracteres alfanuméricos.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validar()) {
      return;
    }

    const novoCarro = {
      id: Date.now().toString(),
      nome: form.nome.trim(),
      ano: form.ano.trim(),
      cor: form.cor.trim(),
      placa: form.placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase(),
      km: `${Number.parseInt(form.quilometragem.replace(/\D/g, ''), 10).toLocaleString('pt-BR')} km`,
      vin: form.vin.trim().toUpperCase(),
      proximaRevisao: form.proximaRevisao.trim() || 'A definir',
      garantiaStatus: form.garantia.trim() || 'Não informada',
      garantiaValidade: form.garantia.trim() ? 'consultar concessionária' : '',
      planoManutencao: form.planoManutencao.trim() || 'Padrão',
      imagem: form.imagem.trim() || 'https://via.placeholder.com/600x400?text=Ford+Vehicle',
      historico: [],
      criadoEm: new Date().toISOString(),
    };

    try {
      const carros = await getJsonUserData('carros', []);
      await setJsonUserData('carros', [...carros, novoCarro]);
      Alert.alert('Veículo cadastrado', `${novoCarro.nome} foi adicionado aos seus veículos.`, [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o veículo.');
    }
  };

  const previewUri = form.imagem.trim();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.titulo, { color: tema.texto }]}>Adicionar veículo</Text>
        <Text style={[styles.subtitulo, { color: tema.subtitulo }]}>Preencha os dados do seu Ford.</Text>

        <Text style={[styles.label, { color: tema.subtitulo }]}>Modelo</Text>
        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="Ex.: Ranger XLT"
          placeholderTextColor={tema.subtitulo}
          value={form.nome}
          onChangeText={(value) => updateField('nome', value)}
        />

        <View style={styles.linha}>
          <View style={styles.campoMetade}>
            <Text style={[styles.label, { color: tema.subtitulo }]}>Ano</Text>
            <TextInput
              style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
              placeholder="2022"
              placeholderTextColor={tema.subtitulo}
              value={form.ano}
              onChangeText={(value) => updateField('ano', value.replace(/\D/g, '').slice(0, 4))}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <View style={styles.campoMetade}>
            <Text style={[styles.label, { color: tema.subtitulo }]}>Quilometragem</Text>
            <TextInput
              style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
              placeholder="45000"
              placeholderTextColor={tema.subtitulo}
              value={form.quilometragem}
              onChangeText={(value) => updateField('quilometragem', value.replace(/\D/g, ''))}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <Text style={[styles.label, { color: tema.subtitulo }]}>Cor</Text>
        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="Ex.: Azul"
          placeholderTextColor={tema.subtitulo}
          value={form.cor}
          onChangeText={(value) => updateField('cor', value)}
        />

        <Text style={[styles.label, { color: tema.subtitulo }]}>Placa</Text>
        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="ABC1D23"
          placeholderTextColor={tema.subtitulo}
          value={form.placa}
          onChangeText={(value) => updateField('placa', value.toUpperCase().slice(0, 7))}
          autoCapitalize="characters"
          maxLength={7}
        />

        <Text style={[styles.label, { color: tema.subtitulo }]}>VIN (opcional)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="17 caracteres"
          placeholderTextColor={tema.subtitulo}
          value={form.vin}
          onChangeText={(value) => updateField('vin', value.toUpperCase().slice(0, 17))}
          autoCapitalize="characters"
          maxLength={17}
        />

        <View style={styles.linha}>
          <View style={styles.campoMetade}>
            <Text style={[styles.label, { color: tema.subtitulo }]}>Próxima revisão</Text>
              <TextInput
              style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
              placeholder="Ex.: 50.000 km"
              placeholderTextColor={tema.subtitulo}
              value={form.proximaRevisao}
              onChangeText={(value) => updateField('proximaRevisao', value)}
            />
          </View>
          <View style={styles.campoMetade}>
            <Text style={[styles.label, { color: tema.subtitulo }]}>Garantia</Text>
            <TextInput
              style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
              placeholder="Ativa"
              placeholderTextColor={tema.subtitulo}
              value={form.garantia}
              onChangeText={(value) => updateField('garantia', value)}
            />
          </View>
        </View>

        <Text style={[styles.label, { color: tema.subtitulo }]}>Plano de manutenção</Text>
        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="Ex.: Premium Care"
          placeholderTextColor={tema.subtitulo}
          value={form.planoManutencao}
          onChangeText={(value) => updateField('planoManutencao', value)}
        />

        <Text style={[styles.label, { color: tema.subtitulo }]}>Imagem</Text>
        <TouchableOpacity
          style={[styles.imageButton, { backgroundColor: tema.card, borderColor: '#1D7DFF' }]}
          onPress={pickImage}
        >
          <Text style={[styles.imageButtonText, { color: '#1D7DFF' }]}>Escolher foto do veículo</Text>
        </TouchableOpacity>

        {previewUri ? <Image source={{ uri: previewUri }} style={styles.preview} /> : null}

        <TextInput
          style={[styles.input, { backgroundColor: tema.card, borderColor: tema.borda, color: tema.texto }]}
          placeholder="URL da imagem (opcional)"
          placeholderTextColor={tema.subtitulo}
          value={form.imagem.startsWith('file://') ? '' : form.imagem}
          onChangeText={(value) => updateField('imagem', value.trim())}
          autoCapitalize="none"
        />
        {form.imagem.startsWith('file://') ? (
          <Text style={[styles.ajuda, { color: tema.subtitulo }]}>Uma foto foi selecionada da galeria.</Text>
        ) : null}

        <TouchableOpacity style={[styles.button, { backgroundColor: '#1D7DFF' }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar veículo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.voltar, { color: '#1D7DFF' }]}>← Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 4,
  },
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
  campoMetade: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 13,
    minHeight: 48,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  imageButton: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  imageButtonText: {
    fontWeight: '700',
    fontSize: 15,
  },
  preview: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: '#eee',
  },
  ajuda: {
    fontSize: 12,
    marginTop: -7,
    marginBottom: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  voltar: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
});
