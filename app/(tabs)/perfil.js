import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';

export default function Perfil() {
  const { tema } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const getInitials = (nome) => {
    if (!nome) return 'VF';
    const words = nome.split(' ').filter(w => w.length > 0);
    const initials = words.slice(0, 2).map(w => w[0].toUpperCase()).join('');
    return initials || 'VF';
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const usersStr = await AsyncStorage.getItem('users');
          if (usersStr) {
            const users = JSON.parse(usersStr);
            const foundUser = users.find(u => u.id === token);
            setUser(foundUser);
          }
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              router.replace('/login');
            } catch (error) {
              console.log('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Falha no logout.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: tema.fundo }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
        <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(user?.nome)}</Text>
        </View>

        <Text style={[styles.nome, { color: tema.texto }]}>{user?.nome || 'Nome'}</Text>
        <Text style={styles.email}>{user?.email || 'email@exemplo.com'}</Text>

        <TouchableOpacity style={styles.editButton} activeOpacity={0.85}>
          <Ionicons name="create-outline" size={16} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Informações pessoais</Text>

      <View style={[styles.infoCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]}>
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={20} color="#E83D84" />
          </View>
          <View style={styles.infoTextArea}>
            <Text style={styles.infoLabel}>Nome</Text>
            <Text style={[styles.infoValue, { color: tema.texto }]}>{user?.nome || 'Nome'}</Text>
          </View>
        </View>

        <View style={[styles.divider, {backgroundColor: tema.borda}]} />

        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={20} color="#E83D84" />
          </View>
          <View style={styles.infoTextArea}>
            <Text style={styles.infoLabel}>E-mail</Text>
            <Text style={[styles.infoValue, { color: tema.texto }]}>{user?.email || 'email@exemplo.com'}</Text>
          </View>
        </View>

        <View style={[styles.divider, {backgroundColor: tema.borda}]} />

        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Ionicons name="call-outline" size={20} color="#E83D84" />
          </View>
          <View style={styles.infoTextArea}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={[styles.infoValue, { color: tema.texto }]}>(11) 99999-9999</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Ações rápidas</Text>

      <TouchableOpacity style={[styles.actionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85} onPress={() => router.push('/historico')}>
        <View style={styles.actionLeft}>
          <View style={styles.actionIcon}>
            <Ionicons name="time-outline" size={20} color="#E83D84" />
          </View>
          <Text style={[styles.actionText, , { color: tema.texto }]}>Histórico de solicitações</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85} onPress={() => router.push('/configuracoes')}>
        <View style={styles.actionLeft}>
          <View style={styles.actionIcon}>
            <Ionicons name="settings-outline" size={20} color="#E83D84" />
          </View>
          <Text style={[styles.actionText, { color: tema.texto }]}>Configurações da conta</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionCard, { backgroundColor: tema.card }, {borderColor: tema.borda}]} activeOpacity={0.85} onPress={() => router.push('/suporte')}>
        <View style={styles.actionLeft}>
          <View style={styles.actionIcon}>
            <Ionicons name="help-circle-outline" size={20} color="#E83D84" />
          </View>
          <Text style={[styles.actionText, { color: tema.texto }]}>Ajuda e suporte</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.85} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#E83D84" />
        <Text style={styles.logoutText}>Sair da conta</Text>
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

  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#EFEFF2',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FFD3E8',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E83D84',
  },
  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#E83D84',
    borderRadius: 14,
    paddingHorizontal: 18,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
    marginTop: 2,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#EFEFF2',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoTextArea: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#111111',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F3',
    marginVertical: 14,
  },

  actionCard: {
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
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFF0F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
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
