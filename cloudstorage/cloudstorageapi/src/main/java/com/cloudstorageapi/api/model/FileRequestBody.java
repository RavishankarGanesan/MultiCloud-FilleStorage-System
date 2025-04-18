package com.cloudstorageapi.api.model;

import java.util.Date;

public class FileRequestBody {
 
	private int FileId;

	 
	private String FileName;
	 
	private int parentFileId;
	  
	private Date createdAt;

	public int getFileId() {
		return FileId;
	}

	public void setFileId(int FileId) {
		this.FileId = FileId;
	}

	public String getFileName() {
		return FileName;
	}

	public void setFileName(String FileName) {
		this.FileName = FileName;
	}

	public int getParentFileId() {
		return parentFileId;
	}

	public void setParentFileId(int parentFileId) {
		this.parentFileId = parentFileId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
 
 

}
