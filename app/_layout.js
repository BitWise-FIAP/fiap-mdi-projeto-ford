import { Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function RootNavigator() {
  const { isAuthenticated, isGuest, loading } = useAuth();
  const { tema } = useTheme();
  const hasAccess = isAuthenticated || isGuest;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: tema.fundo }}>
        <ActivityIndicator size="large" color="#1D7DFF" />
      </View>
    );
  }

  if (!hasAccess) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/cadastro" />
      </Stack>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: tema.fundo },
        headerTintColor: tema.texto,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="carros" options={{ title: 'Meus veículos' }} />
      <Stack.Screen name="recompensas" options={{ title: 'Recompensas' }} />
      <Stack.Screen name="historico" options={{ title: 'Histórico de serviços' }} />
      <Stack.Screen name="configuracoes" options={{ title: 'Configurações da conta' }} />
      <Stack.Screen name="suporte" options={{ title: 'Suporte' }} />
      <Stack.Screen name="agendamento" options={{ title: 'Agendamento' }} />
      <Stack.Screen name="carro" options={{ title: 'Meu veículo' }} />
      <Stack.Screen name="editar-perfil" options={{ title: 'Editar perfil' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
