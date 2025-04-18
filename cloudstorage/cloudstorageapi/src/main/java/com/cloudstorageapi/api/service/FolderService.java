package com.cloudstorageapi.api.service;

 
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.cloudstorageapi.api.entity.FolderEntity;
import com.cloudstorageapi.api.model.FolderIdRequest;
import com.cloudstorageapi.api.model.FolderRequestBody;
import com.cloudstorageapi.api.repositories.FolderRepository;

@Service
public class FolderService  {

	@Autowired
	private  FolderRepository FolderRepository;

	

	public FolderEntity createFolder(FolderRequestBody FolderRequestBodyObj) {

		FolderEntity newFolder = new FolderEntity();
		newFolder.setFolderName(FolderRequestBodyObj.getFolderName());
		newFolder.setFolderId(FolderRequestBodyObj.getParentFolderId());
		newFolder.setCreatedAt(FolderRequestBodyObj.getCreatedAt());
	 
		return FolderRepository.save(newFolder);		 
	}

	public FolderEntity updateFolder(FolderRequestBody FolderRequestBodyObj) {
		FolderEntity newFolder = new FolderEntity();
		newFolder.setFolderId(FolderRequestBodyObj.getFolderId() );
		newFolder.setFolderName(FolderRequestBodyObj.getFolderName());
		newFolder.setFolderId(FolderRequestBodyObj.getParentFolderId());
		newFolder.setCreatedAt(FolderRequestBodyObj.getCreatedAt());
		return FolderRepository.save(newFolder);		 
	}

	public Page<FolderEntity> listallusersfromdb(int pageNumber, int size) {
		Pageable pageable = PageRequest.of(pageNumber, size);
		return FolderRepository.listallusersfromdb(pageable);
	}
 
	public String deleteFolder(FolderIdRequest fld) {
		int FolderId= fld.getFolderId();
		FolderRepository.deleteById(FolderId);
		return "Folder Deleted";
	}

	public String countNumberOfFolders() {

		return FolderRepository.countNumberOfFolders();
	}

}
