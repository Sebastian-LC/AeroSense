import {create} from 'zustand';
import auth from '@react-native-firebase/auth';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  setUser: (user) => set({user, isLoading: false, error: null}),

  // Registrar nuevo usuario
  signUp: async (email, password) => {
    try {
      set({isLoading: true, error: null});
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      set({error: e.message, isLoading: false});
      throw e;
    }
  },

  // Iniciar sesión
  signIn: async (email, password) => {
    try {
      set({isLoading: true, error: null});
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      set({error: e.message, isLoading: false});
      throw e;
    }
  },

  // Cerrar sesión
  signOut: async () => {
    try {
      await auth().signOut();
    } catch (e) {
      set({error: e.message});
    }
  },

  setLoading: (loading) => set({isLoading: loading}),
}));
