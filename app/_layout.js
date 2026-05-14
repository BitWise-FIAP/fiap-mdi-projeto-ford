import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './ThemeContext';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log('Erro ao verificar auth:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/cadastro" />
      </Stack>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="historico"
        options={{
          title: 'Histórico de solicitações',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="configuracoes"
        options={{
          title: 'Configurações da conta',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="suporte"
        options={{
          title: 'Suporte',
          headerShown: true,
        }}
      />

      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/cadastro" options={{ headerShown: false }} />
    </Stack>
    </ThemeProvider>
    
  );
}
