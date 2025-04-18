package com.cloudstorageapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloudstorageapi.api.model.FolderIdRequest;
import com.cloudstorageapi.api.model.FolderRequestBody;
import  com.cloudstorageapi.api.service.FolderService;
 
  
@RestController
@CrossOrigin
public class FolderController {
	
	@Autowired
	private  FolderService FolderService;	
	
	@RequestMapping(value = "/createFolder", method = RequestMethod.POST)
	public ResponseEntity<?> createFolder(@RequestBody FolderRequestBody FolderReqBody) throws Exception {
		return ResponseEntity.ok(FolderService.createFolder(FolderReqBody));
	}
	
	@RequestMapping(value = "/updateFolder", method = RequestMethod.PUT)
	public ResponseEntity<?> updateFolder(@RequestBody FolderRequestBody FolderReqBody) throws Exception {
		return ResponseEntity.ok(FolderService.updateFolder(FolderReqBody));
	}		
	
	@RequestMapping(value = "/listAllFolders", method = RequestMethod.GET)
	public ResponseEntity<?> listAllFolders(@RequestParam(defaultValue = "0") final Integer pageNumber,
			@RequestParam(defaultValue = "10") final Integer size) throws Exception {
		return ResponseEntity.ok(FolderService.listallusersfromdb(pageNumber, size));
	}		
	
	@RequestMapping(value = "/deleteFolder", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteFolder(@RequestBody FolderIdRequest user) throws Exception {
		return ResponseEntity.ok(FolderService.deleteFolder(user));
	}		
	
	@RequestMapping(value = "/Folderscount", method = RequestMethod.GET)
	public ResponseEntity<?> countNumberOfFolders() throws Exception {
		return ResponseEntity.ok((FolderService.countNumberOfFolders()));
	}
	
}
