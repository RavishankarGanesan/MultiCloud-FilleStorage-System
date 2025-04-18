import api from '@/api/config';

import { tokenService, TokenInfo } from './token.service';
import { User } from '@/types/api.types';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse extends TokenInfo {
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post<AuthResponse>('/api/users/login', credentials);
      tokenService.setToken(response.data);
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  async logout() {
    try {
      await api.post('/api/users/logout');
    } finally {
      tokenService.removeToken();
    }
  },

  async validateSession(): Promise<User | null> {
    return tokenService.validateToken();
  }
};