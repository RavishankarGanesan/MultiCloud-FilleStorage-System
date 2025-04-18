import api from '@/api/config';

interface FileUploadResponse {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
}

export const fileService = {
  async uploadFile(file: File, folderId?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      formData.append('folderId', folderId);
    }

    const response = await api.post<FileUploadResponse>('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async getFiles(folderId?: string) {
    const params = folderId ? { folderId } : {};
    const response = await api.get('/api/files', { params });
    return response.data;
  },

  async deleteFile(fileId: string) {
    await api.delete(`/api/files/${fileId}`);
  }
};