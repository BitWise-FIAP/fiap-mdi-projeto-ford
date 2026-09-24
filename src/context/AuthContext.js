import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(Boolean(token));
    } catch (error) {
      console.log('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (userId) => {
    await AsyncStorage.setItem('userToken', userId);
    setIsGuest(false);
    setIsAuthenticated(true);
  }, []);

  const enterGuest = useCallback(() => {
    setIsGuest(true);
    setIsAuthenticated(false);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setIsGuest(false);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isGuest,
      loading,
      refreshAuth,
      signIn,
      enterGuest,
      signOut,
    }),
    [isAuthenticated, isGuest, loading, refreshAuth, signIn, enterGuest, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}
