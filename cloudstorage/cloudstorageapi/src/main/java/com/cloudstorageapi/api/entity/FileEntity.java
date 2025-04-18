package com.cloudstorageapi.api.entity;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "pragadees_folders")
public class FileEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "File_id", nullable = false)
	private int FileId;
    
	@Column(name = "File_name", nullable = false)
	private String FileName;
	@Column(name = "parent_File_id", nullable = false)
	private int parentFileId;
	 
	@Column(name = "created_at", nullable = false)
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
