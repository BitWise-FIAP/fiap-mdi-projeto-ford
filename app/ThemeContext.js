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
    fundo: modoEscuro ? '#1C1C1C' : '#000D24',
    card: modoEscuro ? '#2A2A2A' : '#051833',
    texto: modoEscuro ? '#111111' : '#FFFFFF',
    subtitulo: modoEscuro ? '#B8B8B8' : '#666666',
    borda: modoEscuro ? '#505050' : '#1d7bff79',
    divisor: modoEscuro ? '#333333' : '#1d7bff81',
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