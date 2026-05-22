import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  useEffect(() => {
    const carregarTema = async () => {
      const valor = await AsyncStorage.getItem('modoEscuro');
      if (valor !== null) {
        setModoEscuro(JSON.parse(valor));
      }
    };
    carregarTema();
  }, []);

  const alternarTema = async (novoValor) => {
    setModoEscuro(novoValor);
    await AsyncStorage.setItem('modoEscuro', JSON.stringify(novoValor));
  };

  const tema = {
    fundo: modoEscuro ? '#000D24' : '#F4F6F9',
    card: modoEscuro ? '#051833' : '#FFFFFF',
    texto: modoEscuro ? '#FFFFFF' : '#0A1628',
    subtitulo: modoEscuro ? '#94A3B8' : '#6B7280',
    borda: modoEscuro ? '#1d7bff79' : '#E2E8F0',
    divisor: modoEscuro ? '#1d7bff33' : '#F1F5F9',
  };

  return (
    <ThemeContext.Provider value={{ modoEscuro, alternarTema, tema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}