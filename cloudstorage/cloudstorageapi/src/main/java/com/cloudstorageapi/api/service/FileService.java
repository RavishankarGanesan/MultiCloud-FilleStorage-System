package com.cloudstorageapi.api.service;

import com.cloudstorageapi.api.entity.FileEntity;
import com.cloudstorageapi.api.model.FileInfo;
import com.cloudstorageapi.api.repositories.FileRepository;
import com.cloudstorageapi.api.service.impl.GoogleDriveService;
import com.cloudstorageapi.api.service.impl.OneDriveService;
import com.cloudstorageapi.api.exception.FileNotFoundException;
import com.cloudstorageapi.api.exception.StorageException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private OneDriveService oneDriveService;

    public FileInfo uploadFile(MultipartFile file, String userId, String provider) throws StorageException {
        if (file.isEmpty()) {
            throw new StorageException("Failed to store empty file");
        }
        try {
            CloudStorageService storageService = getStorageService(provider);
            String cloudFileId = storageService.uploadFile(file, userId);
            
            FileEntity fileEntity = new FileEntity();
            fileEntity.setFileName(file.getOriginalFilename());
            fileEntity.setParentFileId(0); // Set default parent ID as 0
            fileEntity.setCreatedAt(Date.from(Instant.now()));
            
            fileEntity = fileRepository.save(fileEntity);
            return convertToFileInfo(fileEntity);
        } catch (Exception e) {
            throw new StorageException("Failed to store file", e);
        }
    }

    public List<FileInfo> listFiles(String userId, String provider) throws StorageException {
        try {
            return StreamSupport.stream(fileRepository.findAll().spliterator(), false)
                    .map(this::convertToFileInfo)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new StorageException("Failed to list files", e);
        }
    }

    public Resource downloadFile(String fileId, String userId, String provider) throws FileNotFoundException, StorageException {
        try {
            int id = Integer.parseInt(fileId);
            Optional<FileEntity> fileEntityOpt = fileRepository.findById(id);
            if (fileEntityOpt.isEmpty()) {
                throw new FileNotFoundException("File not found with id: " + fileId);
            }
            
            CloudStorageService storageService = getStorageService(provider);
            FileEntity fileEntity = fileEntityOpt.get();
            return storageService.downloadFile(fileId, userId);
        } catch (NumberFormatException e) {
            throw new StorageException("Invalid file ID format", e);
        } catch (Exception e) {
            throw new StorageException("Failed to download file", e);
        }
    }

    public void deleteFile(String fileId, String userId, String provider) throws FileNotFoundException, StorageException {
        try {
            int id = Integer.parseInt(fileId);
            Optional<FileEntity> fileEntityOpt = fileRepository.findById(id);
            if (fileEntityOpt.isEmpty()) {
                throw new FileNotFoundException("File not found with id: " + fileId);
            }
            
            CloudStorageService storageService = getStorageService(provider);
            FileEntity fileEntity = fileEntityOpt.get();
            storageService.deleteFile(fileId, userId);
            fileRepository.delete(fileEntity);
        } catch (NumberFormatException e) {
            throw new StorageException("Invalid file ID format", e);
        } catch (Exception e) {
            throw new StorageException("Failed to delete file", e);
        }
    }

    private CloudStorageService getStorageService(String provider) {
        String providerLower = provider.toLowerCase();
        if ("google".equals(providerLower)) {
            return googleDriveService;
        } else if ("onedrive".equals(providerLower)) {
            return oneDriveService;
        } else {
            throw new IllegalArgumentException("Unsupported storage provider: " + provider);
        }
    }

    private FileInfo convertToFileInfo(FileEntity entity) {
        FileInfo info = new FileInfo();
        info.setId(String.valueOf(entity.getFileId()));
        info.setName(entity.getFileName());
        info.setCreatedAt(entity.getCreatedAt().toInstant());
        return info;
    }
}
