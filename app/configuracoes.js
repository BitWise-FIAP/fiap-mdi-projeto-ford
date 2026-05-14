import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';

export default function Configuracoes() {
  const [notificacoes, setNotificacoes] = useState(true);
  const { modoEscuro, alternarTema, tema } = useTheme();
  const [localizacao, setLocalizacao] = useState(true);

  return (
    <ScrollView
       style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title,{ color: tema.texto }]}>Configurações da conta</Text>
        <Text style={[styles.subtitle]}>
          Gerencie preferências, notificações e opções da sua conta.
        </Text>
      </View>

      <View style={styles.highlightCard}>
        <View style={styles.highlightIcon}>
          <Ionicons name="settings-outline" size={24} color="#E83D84" />
        </View>

        <View style={styles.highlightTextArea}>
          <Text style={styles.highlightTitle}>Personalize sua experiência</Text>
          <Text style={styles.highlightText}>
            Ajuste as opções do aplicativo de acordo com sua preferência.
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Preferências</Text>

      <View style={[styles.settingsCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="notifications-outline" size={20} color="#E83D84" />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Notificações</Text>
              <Text style={styles.settingSubtitle}>Receber avisos sobre itens e atualizações</Text>
            </View>
          </View>

          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            trackColor={{ false: '#D9D9D9', true: '#F7A9C9' }}
            thumbColor={notificacoes ? '#E83D84' : '#F4F4F4'}
          />
        </View>

        <View style={[styles.divider, {backgroundColor: tema.borda}]} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="moon-outline" size={20} color="#E83D84" />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Modo escuro</Text>
              <Text style={styles.settingSubtitle}>Alterar a aparência visual do app</Text>
            </View>
          </View>

          <Switch
            value={modoEscuro}
            onValueChange={alternarTema}
            trackColor={{ false: '#D9D9D9', true: '#F7A9C9' }}
            thumbColor={modoEscuro ? '#E83D84' : '#F4F4F4'}
          />
        </View>

        <View style={[styles.divider, {backgroundColor: tema.borda}]} />

        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="location-outline" size={20} color="#E83D84" />
            </View>
            <View>
              <Text style={[styles.settingTitle, { color: tema.texto }]}>Localização</Text>
              <Text style={styles.settingSubtitle}>Permitir acesso ao local do dispositivo</Text>
            </View>
          </View>

          <Switch
            value={localizacao}
            onValueChange={setLocalizacao}
            trackColor={{ false: '#D9D9D9', true: '#F7A9C9' }}
            thumbColor={localizacao ? '#E83D84' : '#F4F4F4'}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Conta</Text>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85}>
        <View style={styles.optionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={20} color="#E83D84" />
          </View>
          <View>
            <Text style={[styles.optionTitle, { color: tema.texto }]}>Editar dados pessoais</Text>
            <Text style={styles.optionSubtitle}>Atualize nome, e-mail e telefone</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85}>
        <View style={styles.optionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#E83D84" />
          </View>
          <View>
            <Text style={[styles.optionTitle, { color: tema.texto }]}>Alterar senha</Text>
            <Text style={styles.optionSubtitle}>Mantenha sua conta protegida</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85}>
        <View style={styles.optionLeft}>
          <View style={styles.iconBox}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#E83D84" />
          </View>
          <View>
            <Text style={[styles.optionTitle, { color: tema.texto }]}>Privacidade</Text>
            <Text style={styles.optionSubtitle}>Controle de dados e permissões</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85}>
        <Ionicons name="trash-outline" size={18} color="#E83D84" />
        <Text style={styles.logoutText}>Desativar conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
  },
  highlightCard: {
    backgroundColor: '#FFF1F8',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFD3E8',
  },
  highlightIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  highlightTextArea: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#EFEFF2',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#777777',
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F3',
    marginVertical: 14,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFEFF2',
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#777777',
  },
  logoutButton: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD3E8',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#E83D84',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});