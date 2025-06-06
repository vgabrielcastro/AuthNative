import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const AUTH_TOKEN_KEY = '@auth_token';
const USER_DATA_KEY = '@user_data';

interface UserData {
  id: number;
  email: string;
  name: string;
  password: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await api.get<UserData[]>(`/users?email=${email}`);
      console.log('📡 Resposta da API:', response.data);
      const user = response.data[0];

      console.log('👤 Usuário encontrado:', user ? 'Sim' : 'Não');

      if (!user) {
        console.log('❌ Usuário não encontrado');
        throw new AuthError('Usuário não encontrado');
      }

      if (user.password !== password) {
        console.log('❌ Senha incorreta');
        throw new AuthError('Senha incorreta');
      }

      console.log('✅ Login bem sucedido');

      const token = `dummy-token-${Date.now()}`;
      console.log('🔑 Token gerado:', token);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password: _pwd, ...userWithoutPassword} = user;

      await AsyncStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(userWithoutPassword),
      );
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

      return true;
    } catch (error) {
      console.log('🚨 Erro durante o login:', error);

      if (error instanceof AuthError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new AuthError('Erro ao fazer login. Tente novamente mais tarde.');
      }
      throw new AuthError('Erro desconhecido ao fazer login');
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('🚪 Iniciando logout');
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
      console.log('✅ Logout realizado com sucesso');
    } catch (error) {
      console.log('🚨 Erro durante o logout:', error);
      throw new AuthError('Erro ao fazer logout');
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    console.log(
      '🔍 Verificando autenticação:',
      token ? 'Autenticado' : 'Não autenticado',
    );
    return !!token;
  },

  async getUserData(): Promise<Omit<UserData, 'password'> | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      console.log(
        '👤 Dados do usuário:',
        userData ? 'Encontrados' : 'Não encontrados',
      );
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.log('🚨 Erro ao obter dados do usuário:', error);
      return null;
    }
  },
};
