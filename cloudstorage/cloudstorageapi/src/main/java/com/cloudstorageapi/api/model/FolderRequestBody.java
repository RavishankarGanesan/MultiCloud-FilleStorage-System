package com.cloudstorageapi.api.model;

import java.util.Date;

public class FolderRequestBody {
 
	private int FolderId;

	 
	private String FolderName;
	 
	private int parentFolderId;
	  
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
