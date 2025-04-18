package com.cloudstorageapi.api.entity;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "pragadees_folders")
public class StorageUsageEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "StorageUsage_id", nullable = false)
	private int StorageUsageId;
    
	@Column(name = "StorageUsage_name", nullable = false)
	private String StorageUsageName;
	@Column(name = "parent_StorageUsage_id", nullable = false)
	private int parentStorageUsageId;
	 
	@Column(name = "created_at", nullable = false)
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
