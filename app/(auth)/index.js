import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';

export default function AuthIndex() {
  const router = useRouter();
  const { enterGuest } = useAuth();
  const { tema, modoEscuro } = useTheme();

  const handleGuest = () => {
    enterGuest();
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <StatusBar barStyle={modoEscuro ? 'light-content' : 'dark-content'} backgroundColor={tema.fundo} />

      <View style={styles.content}>
        <Image
          source={require('../../assets/logo-ford.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          <Text style={styles.tituloAzul}>VIN</Text>
          <Text style={[styles.tituloBranco, { color: tema.texto }]}>culo</Text>
        </Text>

        <Text style={[styles.subtitulo, { color: tema.texto }]}>
          Sua jornada Ford{'\n'}começa aqui.
        </Text>

        <Image
          source={require('../../assets/ranger-azul.png')}
          style={styles.carro}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => router.push('/(auth)/login')}
          accessibilityRole="button"
        >
          <Text style={styles.botaoEntrarTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={() => router.push('/(auth)/cadastro')}
          accessibilityRole="button"
        >
          <Text style={[styles.botaoCriarTexto, { color: tema.texto }]}>Criar conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGuest} accessibilityRole="button">
          <Text style={[styles.convidado, { color: tema.subtitulo }]}>Explorar como convidado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 46,
    fontWeight: '900',
    marginBottom: 12,
  },
  tituloAzul: {
    color: '#0A74FF',
  },
  tituloBranco: {
    fontWeight: '900',
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 22,
  },
  carro: {
    width: '100%',
    maxWidth: 360,
    height: 220,
    marginBottom: 36,
  },
  botaoEntrar: {
    width: '100%',
    backgroundColor: '#087BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  botaoEntrarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  botaoCriar: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#087BFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  botaoCriarTexto: {
    fontSize: 16,
    fontWeight: '800',
  },
  convidado: {
    fontSize: 14,
    fontWeight: '600',
  },
});
