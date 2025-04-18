import api from '@/api/config';

export const storageService = {
  async getStorageUsage() {
    const response = await api.get('/api/storage/usage');
    return response.data;
  },

  async connectGoogleDrive(authCode: string) {
    const response = await api.post('/api/storage/google/connect', { authCode });
    return response.data;
  },

  async connectOneDrive(authCode: string) {
    const response = await api.post('/api/storage/onedrive/connect', { authCode });
    return response.data;
  },

  async getGoogleDriveFiles() {
    const response = await api.get('/api/storage/google/files');
    return response.data;
  },

  async checkGoogleDriveConnection() {
    try {
      const response = await api.get('/api/storage/google/status');
      return response.data.connected;
    } catch (error) {
      console.error('Error checking Google Drive connection:', error);
      return false;
    }
  }
};