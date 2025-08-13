import { User, AuthState } from '@/types';
import { mockCredentials, findUserByEmail } from './mockUsers';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Simula login com API
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simula latência de rede

    const { email, password } = credentials;

    // Verifica credenciais
    const validCredential = mockCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (!validCredential) {
      return {
        success: false,
        message: 'Email ou senha incorretos'
      };
    }

    // Busca dados do usuário
    const user = findUserByEmail(email);
    
    if (!user || !user.isActive) {
      return {
        success: false,
        message: 'Usuário não encontrado ou inativo'
      };
    }

    // Salva token no localStorage (simulado)
    const token = btoa(`${user.id}:${Date.now()}`);
    localStorage.setItem('roteirum_token', token);
    localStorage.setItem('roteirum_user', JSON.stringify(user));

    return {
      success: true,
      user,
      message: 'Login realizado com sucesso'
    };
  },

  // Verifica se usuário está logado
  async checkAuth(): Promise<AuthResponse> {
    await delay(300);

    const token = localStorage.getItem('roteirum_token');
    const userStr = localStorage.getItem('roteirum_user');

    if (!token || !userStr) {
      return {
        success: false,
        message: 'Usuário não autenticado'
      };
    }

    try {
      const user = JSON.parse(userStr) as User;
      
      // Verifica se token não expirou (24h)
      const tokenData = atob(token);
      const [userId, timestamp] = tokenData.split(':');
      const tokenAge = Date.now() - parseInt(timestamp);
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas

      if (tokenAge > maxAge || userId !== user.id) {
        localStorage.removeItem('roteirum_token');
        localStorage.removeItem('roteirum_user');
        return {
          success: false,
          message: 'Sessão expirada'
        };
      }

      return {
        success: true,
        user,
        message: 'Usuário autenticado'
      };
    } catch (error) {
      localStorage.removeItem('roteirum_token');
      localStorage.removeItem('roteirum_user');
      return {
        success: false,
        message: 'Erro ao verificar autenticação'
      };
    }
  },

  // Logout
  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('roteirum_token');
    localStorage.removeItem('roteirum_user');
  },

  // Obtém usuário atual do localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('roteirum_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }
};