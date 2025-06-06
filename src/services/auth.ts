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

const logInfo = (message: string, data?: any) => {
  console.log(`ℹ️ ${message}`, data ? data : '');
};

const logError = (message: string, error?: any) => {
  console.log(`❌ ${message}`, error ? error : '');
};

const logSuccess = (message: string) => {
  console.log(`✅ ${message}`);
};

export const authService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      logInfo('Iniciando processo de login', {email});

      const response = await api.get<UserData[]>(`/users?email=${email}`);
      logInfo('Resposta da API recebida', response.data);

      const user = response.data[0];
      logInfo('Usuário encontrado', user ? 'Sim' : 'Não');

      if (!user) {
        logError('Usuário não encontrado');
        throw new AuthError('Usuário não encontrado');
      }

      if (user.password !== password) {
        logError('Senha incorreta');
        throw new AuthError('Senha incorreta');
      }

      const token = `dummy-token-${Date.now()}`;
      logInfo('Token gerado', token);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password: _pwd, ...userWithoutPassword} = user;

      await AsyncStorage.setItem(
        USER_DATA_KEY,
        JSON.stringify(userWithoutPassword),
      );
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

      logSuccess('Login realizado com sucesso');
      return true;
    } catch (error) {
      logError('Erro durante o login', error);

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
      logInfo('Iniciando processo de logout');
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
      logSuccess('Logout realizado com sucesso');
    } catch (error) {
      logError('Erro durante o logout', error);
      throw new AuthError('Erro ao fazer logout');
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    logInfo(
      'Verificando autenticação',
      token ? 'Autenticado' : 'Não autenticado',
    );
    return !!token;
  },

  async getUserData(): Promise<Omit<UserData, 'password'> | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      logInfo('Dados do usuário', userData ? 'Encontrados' : 'Não encontrados');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      logError('Erro ao obter dados do usuário', error);
      return null;
    }
  },
};
