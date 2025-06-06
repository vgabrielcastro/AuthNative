import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AUTH_TOKEN_KEY = '@auth_token';

const API_URL = __DEV__
  ? 'http://10.0.2.2:3000' // Para Android Emulator
  : 'http://localhost:3000'; // Para iOS Simulator

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token inválido ou expirado
          AsyncStorage.removeItem(AUTH_TOKEN_KEY);
          break;
        case 403:
          // Acesso negado
          break;
        case 404:
          // Recurso não encontrado
          break;
        case 500:
          // Erro interno do servidor
          break;
      }
    } else if (error.request) {
      // Erro de rede
      console.error('Erro de rede:', error.request);
    } else {
      // Erro na configuração da requisição
      console.error('Erro:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
