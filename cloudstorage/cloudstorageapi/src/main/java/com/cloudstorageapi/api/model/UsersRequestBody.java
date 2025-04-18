package com.cloudstorageapi.api.model;

import java.util.Date;

public class UsersRequestBody {
 
	private int UsersId;

	 
	private String UsersName;
	 
	private int parentUsersId;
	  
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
