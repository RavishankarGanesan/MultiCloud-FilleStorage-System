package com.cloudstorageapi.api.service;

import com.cloudstorageapi.api.model.CloudStorageToken;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface CloudStorageService {
    /**
     * Connect to the cloud storage provider using the authorization code
     * @param authCode The authorization code received from the OAuth2 flow
     * @param userId The ID of the user connecting their account
     * @return The storage token containing access and refresh tokens
     */
    CloudStorageToken connect(String authCode, String userId) throws Exception;

    /**
     * Refresh the access token using the refresh token
     * @param token The current storage token
     * @return The updated storage token
     */
    CloudStorageToken refreshToken(CloudStorageToken token) throws Exception;

    /**
     * Validate if the current token is valid and refresh if needed
     * @param token The current storage token
     * @return The validated and potentially refreshed token
     */
    CloudStorageToken validateToken(CloudStorageToken token) throws Exception;

    /**
     * Disconnect the cloud storage provider
     * @param token The storage token to revoke
     */
    void disconnect(CloudStorageToken token) throws Exception;

    /**
     * Upload a file to the cloud storage
     * @param file The file to upload
     * @param userId The ID of the user uploading the file
     * @return The cloud storage file ID
     */
    String uploadFile(MultipartFile file, String userId) throws Exception;

    /**
     * Download a file from the cloud storage
     * @param fileId The ID of the file to download
     * @param userId The ID of the user downloading the file
     * @return The file resource
     */
    Resource downloadFile(String fileId, String userId) throws Exception;

    /**
     * Delete a file from the cloud storage
     * @param fileId The ID of the file to delete
     * @param userId The ID of the user deleting the file
     */
    void deleteFile(String fileId, String userId) throws Exception;
}