package com.cloudstorageapi.api.entity;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "pragadees_folders")
public class FolderEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Folder_id", nullable = false)
	private int FolderId;
    
	@Column(name = "Folder_name", nullable = false)
	private String FolderName;
	@Column(name = "parent_Folder_id", nullable = false)
	private int parentFolderId;
	 
	@Column(name = "created_at", nullable = false)
	private Date createdAt;

	public int getFolderId() {
		return FolderId;
	}

	public void setFolderId(int FolderId) {
		this.FolderId = FolderId;
	}

	public String getFolderName() {
		return FolderName;
	}

	public void setFolderName(String FolderName) {
		this.FolderName = FolderName;
	}

	public int getParentFolderId() {
		return parentFolderId;
	}

	public void setParentFolderId(int parentFolderId) {
		this.parentFolderId = parentFolderId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
 
 

}
