package com.cloudstorageapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloudstorageapi.api.model.CloudStorageToken;
import com.cloudstorageapi.api.service.impl.GoogleDriveService;
import com.cloudstorageapi.api.service.impl.OneDriveService;

@RestController
@CrossOrigin
@RequestMapping("/api/storage")
public class CloudStorageController {

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private OneDriveService oneDriveService;

    @RequestMapping(value = "/google/connect", method = RequestMethod.POST)
    public ResponseEntity<?> connectGoogleDrive(
            @RequestBody String authCode,
            @RequestParam String userId) throws Exception {
        CloudStorageToken token = googleDriveService.connect(authCode, userId);
        return ResponseEntity.ok(token);
    }

    @RequestMapping(value = "/onedrive/connect", method = RequestMethod.POST)
    public ResponseEntity<?> connectOneDrive(
            @RequestBody String authCode,
            @RequestParam String userId) throws Exception {
        CloudStorageToken token = oneDriveService.connect(authCode, userId);
        return ResponseEntity.ok(token);
    }
}