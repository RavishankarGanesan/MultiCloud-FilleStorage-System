import { config } from '@/config/env.config';
import api from '@/api/config';
import { User } from '@/types/api.types';

export interface TokenInfo {
  token: string;
  refreshToken: string;
}

export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem(config.AUTH_TOKEN_KEY);
  },

  setToken(tokenInfo: TokenInfo): void {
    localStorage.setItem(config.AUTH_TOKEN_KEY, tokenInfo.token);
    localStorage.setItem('refresh_token', tokenInfo.refreshToken);
  },

  removeToken(): void {
    localStorage.removeItem(config.AUTH_TOKEN_KEY);
    localStorage.removeItem('refresh_token');
  },

  async validateToken(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await api.get<User>('/api/users/me');
      return response.data;
    } catch (error) {
      this.removeToken();
      return null;
    }
  },

  async refreshToken(): Promise<TokenInfo | null> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return null;

      const response = await api.post<TokenInfo>('/api/auth/refresh', { refreshToken });
      this.setToken(response.data);
      return response.data;
    } catch (error) {
      this.removeToken();
      return null;
    }
  }
};