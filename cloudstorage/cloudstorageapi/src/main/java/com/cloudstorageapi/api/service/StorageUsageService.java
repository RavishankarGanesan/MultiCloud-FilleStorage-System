package com.cloudstorageapi.api.service;

 
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.cloudstorageapi.api.entity.StorageUsageEntity;
import com.cloudstorageapi.api.model.StorageUsageIdRequest;
import com.cloudstorageapi.api.model.StorageUsageRequestBody;
import com.cloudstorageapi.api.repositories.StorageUsageRepository;

@Service
public class StorageUsageService  {

	@Autowired
	private  StorageUsageRepository StorageUsageRepository;

	

	public StorageUsageEntity createStorageUsage(StorageUsageRequestBody StorageUsageRequestBodyObj) {

		StorageUsageEntity newStorageUsage = new StorageUsageEntity();
		newStorageUsage.setStorageUsageName(StorageUsageRequestBodyObj.getStorageUsageName());
		newStorageUsage.setStorageUsageId(StorageUsageRequestBodyObj.getParentStorageUsageId());
		newStorageUsage.setCreatedAt(StorageUsageRequestBodyObj.getCreatedAt());
	 
		return StorageUsageRepository.save(newStorageUsage);		 
	}

	public StorageUsageEntity updateStorageUsage(StorageUsageRequestBody StorageUsageRequestBodyObj) {
		StorageUsageEntity newStorageUsage = new StorageUsageEntity();
		newStorageUsage.setStorageUsageId(StorageUsageRequestBodyObj.getStorageUsageId() );
		newStorageUsage.setStorageUsageName(StorageUsageRequestBodyObj.getStorageUsageName());
		newStorageUsage.setStorageUsageId(StorageUsageRequestBodyObj.getParentStorageUsageId());
		newStorageUsage.setCreatedAt(StorageUsageRequestBodyObj.getCreatedAt());
		return StorageUsageRepository.save(newStorageUsage);		 
	}

	public Page<StorageUsageEntity> listallusersfromdb(int pageNumber, int size) {
		Pageable pageable = PageRequest.of(pageNumber, size);
		return StorageUsageRepository.listallusersfromdb(pageable);
	}
 
	public String deleteStorageUsage(StorageUsageIdRequest fld) {
		int StorageUsageId= fld.getStorageUsageId();
		StorageUsageRepository.deleteById(StorageUsageId);
		return "StorageUsage Deleted";
	}

	public String countNumberOfStorageUsages() {

		return StorageUsageRepository.countNumberOfStorageUsages();
	}

}
