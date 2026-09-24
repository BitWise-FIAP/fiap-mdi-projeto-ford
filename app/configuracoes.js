import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/context/AuthContext';
import { useTheme } from '../src/context/ThemeContext';
import { getUserData, removeUserData, setUserData, getCurrentUserId } from '../src/utils/userStorage';

export default function Configuracoes() {
  const { tema, modoEscuro, alternarTema } = useTheme();
  const { isGuest, signOut } = useAuth();
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState(true);
  const [localizacao, setLocalizacao] = useState(true);

  useEffect(() => {
    const carregarPreferencias = async () => {
      const [notificacoesSalvas, localizacaoSalva] = await Promise.all([
        getUserData('notificacoes', 'true'),
        getUserData('localizacao', 'true'),
      ]);
      setNotificacoes(notificacoesSalvas !== 'false');
      setLocalizacao(localizacaoSalva !== 'false');
    };
    carregarPreferencias();
  }, []);

  const salvarNotificacoes = async (value) => {
    setNotificacoes(value);
    await setUserData('notificacoes', String(value));
  };

  const salvarLocalizacao = async (value) => {
    setLocalizacao(value);
    await setUserData('localizacao', String(value));
  };

  const desativarConta = () => {
    Alert.alert(
      'Desativar conta',
      'Essa ação remove os dados locais desta conta. Ela não poderá ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desativar',
          style: 'destructive',
          onPress: async () => {
            try {
              const userId = await getCurrentUserId();
              if (userId) {
                const usersStr = await AsyncStorage.getItem('users');
                const users = usersStr ? JSON.parse(usersStr) : [];
                await AsyncStorage.setItem('users', JSON.stringify(users.filter((user) => user.id !== userId)));
                await Promise.all([
                  removeUserData('carros'),
                  removeUserData('agendamentos'),
                  removeUserData('pontos'),
                  removeUserData('notificacoes'),
                  removeUserData('localizacao'),
                ]);
              }
              await signOut();
              router.replace('/(auth)/index');
            } catch (error) {
              console.log('Erro ao desativar conta:', error);
              Alert.alert('Erro', 'Não foi possível desativar a conta.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: tema.texto }]}>Configurações da conta</Text>
        <Text style={[styles.subtitle, { color: tema.subtitulo }]}>Gerencie preferências, notificações e opções do aplicativo.</Text>
      </View>

      <View style={[styles.highlightCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={[styles.highlightIcon, { backgroundColor: tema.divisor }]}>
          <Ionicons name="settings-outline" size={24} color="#1D7DFF" />
        </View>
        <View style={styles.highlightTextArea}>
          <Text style={[styles.highlightTitle, { color: tema.texto }]}>Personalize sua experiência</Text>
          <Text style={[styles.highlightText, { color: tema.subtitulo }]}>Ajuste as opções do app conforme sua preferência.</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Preferências</Text>
      <View style={[styles.settingsCard, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}><Ionicons name="notifications-outline" size={20} color="#1D7DFF" /></View>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Notificações</Text>
              <Text style={[styles.settingSubtitle, { color: tema.subtitulo }]}>Receber avisos sobre serviços e agendamentos</Text>
            </View>
          </View>
          <Switch
            value={notificacoes}
            onValueChange={salvarNotificacoes}
            trackColor={{ false: '#D9D9D9', true: '#d9e6f8' }}
            thumbColor={notificacoes ? '#1D7DFF' : '#F4F4F4'}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: tema.borda }]} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}><Ionicons name="moon-outline" size={20} color="#1D7DFF" /></View>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Modo escuro</Text>
              <Text style={[styles.settingSubtitle, { color: tema.subtitulo }]}>Alterar a aparência visual do app</Text>
            </View>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={alternarTema}
            trackColor={{ false: '#D9D9D9', true: '#d9e6f8' }}
            thumbColor={modoEscuro ? '#1D7DFF' : '#F4F4F4'}
          />
        </View>

        <View style={[styles.divider, { backgroundColor: tema.borda }]} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}><Ionicons name="location-outline" size={20} color="#1D7DFF" /></View>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Localização</Text>
              <Text style={[styles.settingSubtitle, { color: tema.subtitulo }]}>Permitir acesso ao local do dispositivo</Text>
            </View>
          </View>
          <Switch
            value={localizacao}
            onValueChange={salvarLocalizacao}
            trackColor={{ false: '#D9D9D9', true: '#d9e6f8' }}
            thumbColor={localizacao ? '#1D7DFF' : '#F4F4F4'}
          />
        </View>
      </View>

      {!isGuest && (
        <>
          <Text style={[styles.sectionTitle, { color: tema.texto }]}>Conta</Text>
          <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]} onPress={() => router.push('/editar-perfil')} activeOpacity={0.85}>
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}><Ionicons name="person-outline" size={20} color="#1D7DFF" /></View>
              <View>
                <Text style={[styles.optionTitle, { color: tema.texto }]}>Editar dados pessoais</Text>
                <Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Atualizar nome e telefone</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]} onPress={() => Alert.alert('Alterar senha', 'A alteração de senha será conectada à API do projeto em uma próxima etapa.')} activeOpacity={0.85}>
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}><Ionicons name="lock-closed-outline" size={20} color="#1D7DFF" /></View>
              <View>
                <Text style={[styles.optionTitle, { color: tema.texto }]}>Alterar senha</Text>
                <Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Mantenha sua conta protegida</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card, borderColor: tema.borda }]} onPress={() => Alert.alert('Privacidade', 'Você poderá gerenciar consentimentos e dados pessoais quando a API estiver integrada.')} activeOpacity={0.85}>
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}><Ionicons name="shield-checkmark-outline" size={20} color="#1D7DFF" /></View>
              <View>
                <Text style={[styles.optionTitle, { color: tema.texto }]}>Privacidade</Text>
                <Text style={[styles.optionSubtitle, { color: tema.subtitulo }]}>Controle de dados e permissões</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={tema.subtitulo} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.logoutButton, { backgroundColor: tema.card, borderColor: '#1D7DFF' }]} onPress={desativarConta} activeOpacity={0.85}>
            <Ionicons name="trash-outline" size={18} color="#1D7DFF" />
            <Text style={[styles.logoutText, { color: '#1D7DFF' }]}>Desativar conta</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 15, fontWeight: '600', lineHeight: 22 },
  highlightCard: { borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, borderWidth: 1 },
  highlightIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  highlightTextArea: { flex: 1 },
  highlightTitle: { fontSize: 17, fontWeight: '800', marginBottom: 4 },
  highlightText: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', marginBottom: 12, marginTop: 4 },
  settingsCard: { borderRadius: 20, padding: 16, marginBottom: 22, borderWidth: 1 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  iconBox: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(29, 125, 255, 0.14)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  settingText: { flex: 1 },
  settingTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  settingSubtitle: { fontSize: 12, fontWeight: '600', lineHeight: 17 },
  divider: { height: 1, marginVertical: 14 },
  optionCard: { borderRadius: 18, borderWidth: 1, padding: 15, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  optionSubtitle: { fontSize: 13, fontWeight: '600' },
  logoutButton: { marginTop: 8, borderRadius: 16, borderWidth: 1, height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoutText: { fontSize: 15, fontWeight: '800', marginLeft: 8 },
});
