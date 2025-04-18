package com.cloudstorageapi.api.model;

import java.util.Date;

public class StorageUsageRequestBody {
 
	private int StorageUsageId;

	 
	private String StorageUsageName;
	 
	private int parentStorageUsageId;
	  
	private Date createdAt;

	public int getStorageUsageId() {
		return StorageUsageId;
	}

	public void setStorageUsageId(int StorageUsageId) {
		this.StorageUsageId = StorageUsageId;
	}

	public String getStorageUsageName() {
		return StorageUsageName;
	}

	public void setStorageUsageName(String StorageUsageName) {
		this.StorageUsageName = StorageUsageName;
	}

	public int getParentStorageUsageId() {
		return parentStorageUsageId;
	}

	public void setParentStorageUsageId(int parentStorageUsageId) {
		this.parentStorageUsageId = parentStorageUsageId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
 
 

}
