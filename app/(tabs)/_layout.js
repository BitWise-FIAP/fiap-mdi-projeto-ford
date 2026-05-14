import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function TabsLayout() {
  const { tema, modoEscuro } = useTheme();
  return (
    <Tabs
      screenOptions={{
      tabBarStyle: {
      backgroundColor: tema.card,
      borderTopColor: tema.borda,
    },
    tabBarActiveTintColor: '#EC0E7A',
    tabBarInactiveTintColor: modoEscuro ? '#888' : '#8E8E93',
    headerStyle: {
      backgroundColor: tema.fundo,
    },
    headerTitleStyle: {
      color: tema.texto,
    },
    headerTintColor: tema.texto,
  }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="itens"
        options={{
          title: 'Itens',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-up-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}