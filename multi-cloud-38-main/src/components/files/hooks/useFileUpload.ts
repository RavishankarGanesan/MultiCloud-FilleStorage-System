
import { useState, useEffect } from "react";
import { UploadingFile } from "../FileItem";
import { generateFileId, getHumanReadableSize } from "../utils/fileUtils";

// Single location for upload completion callback
let onUploadComplete: (() => void) | undefined;

export const setUploadCompleteCallback = (callback: () => void) => {
  onUploadComplete = callback;
};

export function useFileUpload() {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [destination, setDestination] = useState<'google-drive' | 'onedrive'>('google-drive');
  const [isDragging, setIsDragging] = useState(false);
  
  // Load any in-progress uploads from localStorage on component mount
  useEffect(() => {
    const savedUploads = localStorage.getItem('cloudSync_uploads');
    if (savedUploads) {
      try {
        const parsedUploads = JSON.parse(savedUploads);
        setFiles(parsedUploads);
      } catch (error) {
        console.error('Failed to parse saved uploads', error);
      }
    }
  }, []);
  
  // Save uploads to localStorage whenever they change
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('cloudSync_uploads', JSON.stringify(files));
    }
  }, [files]);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    // Convert selected files to our UploadingFile format
    const newFiles: UploadingFile[] = Array.from(selectedFiles).map(file => {
      // Create a file URL for preview
      const fileUrl = URL.createObjectURL(file);
      
      return {
        id: generateFileId(),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'uploading',
        destination: destination,
        type: file.type,
        fileUrl // Store the URL for display
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Process uploads for each file
    newFiles.forEach(file => {
      simulateFileUpload(file.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update file status (with a small chance of error for realism)
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: Math.random() > 0.9 ? 'error' : 'completed' } 
              : f
          )
        );
        
        // After all uploads are complete, call the completion callback
        setTimeout(() => {
          const allCompleted = files.every(f => 
            f.status === 'completed' || f.status === 'error'
          );
          
          if (allCompleted && onUploadComplete) {
            onUploadComplete();
            
            // Save completed uploads to localStorage
            const completedFiles = files.filter(f => f.status === 'completed');
            saveCompletedFilesToStorage(completedFiles);
          }
        }, 1000);
      } else {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId ? { ...f, progress: Math.round(progress) } : f
          )
        );
      }
    }, 200);
  };
  
  const saveCompletedFilesToStorage = (completedFiles: UploadingFile[]) => {
    // Get existing files from storage
    const savedFiles = localStorage.getItem('cloudSync_files') || '[]';
    let existingFiles = [];
    
    try {
      existingFiles = JSON.parse(savedFiles);
    } catch (error) {
      console.error('Failed to parse saved files', error);
    }
    
    // Convert UploadingFile objects to FileItem objects
    const newFileItems = completedFiles.map(file => ({
      id: file.id,
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: getHumanReadableSize(file.size),
      source: file.destination,
      modifiedDate: new Date().toISOString(),
      fileUrl: file.fileUrl
    }));
    
    // Merge files and save back to localStorage
    const updatedFiles = [...existingFiles, ...newFileItems];
    localStorage.setItem('cloudSync_files', JSON.stringify(updatedFiles));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId);
      // Update localStorage
      localStorage.setItem('cloudSync_uploads', JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  const clearCompletedFiles = () => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.status !== 'completed');
      // Update localStorage
      localStorage.setItem('cloudSync_uploads', JSON.stringify(updatedFiles));
      return updatedFiles;
    });
  };

  return {
    files,
    destination,
    isDragging,
    setDestination,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    clearCompletedFiles
  };
}
