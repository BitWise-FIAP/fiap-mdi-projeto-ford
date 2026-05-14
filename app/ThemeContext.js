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
    fundo: modoEscuro ? '#1C1C1C' : '#F9F9FB',
    card: modoEscuro ? '#2A2A2A' : '#FFFFFF',
    texto: modoEscuro ? '#FFFFFF' : '#111111',
    subtitulo: modoEscuro ? '#B8B8B8' : '#666666',
    borda: modoEscuro ? '#505050' : '#EFEFF2',
    divisor: modoEscuro ? '#333333' : '#F1F1F3',
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