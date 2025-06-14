import React, {createContext, useContext, useEffect, useState} from 'react';
import {authService} from '../services/auth';
import {AuthContextData, User} from '../types/auth.context.interface';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await authService.getUserData();
      setUser(userData);
    } catch (error) {
      console.log('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const success = await authService.login(email, password);
      if (success) {
        const userData = await authService.getUserData();
        setUser(userData);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
