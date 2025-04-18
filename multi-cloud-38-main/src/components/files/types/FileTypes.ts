
export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  source: 'google-drive' | 'onedrive';
  modifiedDate: string;
  thumbnail?: string;
  fileUrl?: string; // URL to the actual file for download
}

export interface FileActionProps {
  file: FileItem;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onRename: (id: string, name: string) => void;
}
