package com.cloudstorageapi.api.entity;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "pragadees_folders")
public class UsersEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Users_id", nullable = false)
	private int UsersId;
    
	@Column(name = "Users_name", nullable = false)
	private String UsersName;
	@Column(name = "parent_Users_id", nullable = false)
	private int parentUsersId;
	 
	@Column(name = "created_at", nullable = false)
	private Date createdAt;

	public int getUsersId() {
		return UsersId;
	}

	public void setUsersId(int UsersId) {
		this.UsersId = UsersId;
	}

	public String getUsersName() {
		return UsersName;
	}

	public void setUsersName(String UsersName) {
		this.UsersName = UsersName;
	}

	public int getParentUsersId() {
		return parentUsersId;
	}

	public void setParentUsersId(int parentUsersId) {
		this.parentUsersId = parentUsersId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
 
 

}
