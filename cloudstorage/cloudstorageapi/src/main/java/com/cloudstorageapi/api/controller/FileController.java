package com.cloudstorageapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudstorageapi.api.model.FileInfo;
import com.cloudstorageapi.api.service.FileService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/files")
public class FileController {
	
    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileInfo> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId,
            @RequestParam("provider") String provider) throws Exception {
        FileInfo fileInfo = fileService.uploadFile(file, userId, provider);
        return ResponseEntity.ok(fileInfo);
    }

    @GetMapping
    public ResponseEntity<List<FileInfo>> listFiles(
            @RequestParam("userId") String userId,
            @RequestParam("provider") String provider) throws Exception {
        List<FileInfo> files = fileService.listFiles(userId, provider);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String id,
            @RequestParam("userId") String userId,
            @RequestParam("provider") String provider) throws Exception {
        Resource resource = fileService.downloadFile(id, userId, provider);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(
            @PathVariable String id,
            @RequestParam("userId") String userId,
            @RequestParam("provider") String provider) throws Exception {
        fileService.deleteFile(id, userId, provider);
        return ResponseEntity.ok().build();
    }

}
