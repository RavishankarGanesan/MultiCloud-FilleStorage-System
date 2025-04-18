export interface User {
  id: string;
  username: string;
  email: string;
}

export interface File {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
}

export interface StorageUsage {
  used: number;
  total: number;
  percentage: number;
}