
import React from 'react';
import { 
  FileIcon as LucideFileIcon, 
  FolderIcon, 
  Image, 
  FileText 
} from "lucide-react";
import { getFileIconType } from './utils/fileUtils';

interface FileIconProps {
  fileType: string;
  size?: number;
  className?: string;
}

export function FileIcon({ fileType, size = 4, className = '' }: FileIconProps) {
  const iconType = getFileIconType(fileType);
  
  switch (iconType) {
    case "image":
      return <Image className={className || `h-${size} w-${size} text-blue-500`} />;
    case "folder":
      return <FolderIcon className={className || `h-${size} w-${size} text-yellow-500`} />;
    case "document":
      return <FileText className={className || `h-${size} w-${size} text-green-500`} />;
    default:
      return <LucideFileIcon className={className || `h-${size} w-${size} text-gray-500`} />;
  }
}
