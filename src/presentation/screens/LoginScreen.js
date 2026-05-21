import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import RootGradient from '../components/RootGradient';
import {useAuthStore} from '../../state/useAuthStore';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, signUp, isLoading, error} = useAuthStore();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <RootGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Aero-Sense</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#9fb6ce"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#9fb6ce"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </RootGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(15, 33, 51, 0.8)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(77, 171, 247, 0.2)',
  },
  title: {
    color: '#e8f1fb',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4dabf7',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(29, 51, 71, 0.6)',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1d3347',
  },
  button: {
    backgroundColor: '#4dabf7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#4dabf7',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#9fb6ce',
    fontSize: 14,
  },
});

export default LoginScreen;
