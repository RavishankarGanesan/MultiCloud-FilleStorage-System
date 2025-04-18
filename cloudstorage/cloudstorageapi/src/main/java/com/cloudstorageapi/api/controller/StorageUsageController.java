package com.cloudstorageapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloudstorageapi.api.model.StorageUsageIdRequest;
import com.cloudstorageapi.api.model.StorageUsageRequestBody;
import  com.cloudstorageapi.api.service.StorageUsageService;
 
  
@RestController
@CrossOrigin
@RequestMapping("/api/storage")
public class StorageUsageController {
	
	@Autowired
	private  StorageUsageService StorageUsageService;	
	
	@RequestMapping(value = "/createStorageUsage", method = RequestMethod.POST)
	public ResponseEntity<?> createStorageUsage(@RequestBody StorageUsageRequestBody StorageUsageReqBody) throws Exception {
		return ResponseEntity.ok(StorageUsageService.createStorageUsage(StorageUsageReqBody));
	}
	
	@RequestMapping(value = "/updateStorageUsage", method = RequestMethod.PUT)
	public ResponseEntity<?> updateStorageUsage(@RequestBody StorageUsageRequestBody StorageUsageReqBody) throws Exception {
		return ResponseEntity.ok(StorageUsageService.updateStorageUsage(StorageUsageReqBody));
	}		
	
	@RequestMapping(value = "/usage", method = RequestMethod.GET)
	public ResponseEntity<?> getStorageUsage() throws Exception {
		return ResponseEntity.ok(StorageUsageService.listallusersfromdb(0, Integer.MAX_VALUE));
	}		
	
	@RequestMapping(value = "/deleteStorageUsage", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteStorageUsage(@RequestBody StorageUsageIdRequest user) throws Exception {
		return ResponseEntity.ok(StorageUsageService.deleteStorageUsage(user));
	}		
	
	@RequestMapping(value = "/StorageUsagescount", method = RequestMethod.GET)
	public ResponseEntity<?> countNumberOfStorageUsages() throws Exception {
		return ResponseEntity.ok((StorageUsageService.countNumberOfStorageUsages()));
	}
	
}
