package com.cloudstorageapi.api.service;

 
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.cloudstorageapi.api.entity.UsersEntity;
import com.cloudstorageapi.api.model.UsersIdRequest;
import com.cloudstorageapi.api.model.UsersRequestBody;
import com.cloudstorageapi.api.repositories.UsersRepository;

@Service
public class UsersService  {

	@Autowired
	private  UsersRepository UsersRepository;

	

	public UsersEntity createUsers(UsersRequestBody UsersRequestBodyObj) {

		UsersEntity newUsers = new UsersEntity();
		newUsers.setUsersName(UsersRequestBodyObj.getUsersName());
		newUsers.setUsersId(UsersRequestBodyObj.getParentUsersId());
		newUsers.setCreatedAt(UsersRequestBodyObj.getCreatedAt());
	 
		return UsersRepository.save(newUsers);		 
	}

	public UsersEntity updateUsers(UsersRequestBody UsersRequestBodyObj) {
		UsersEntity newUsers = new UsersEntity();
		newUsers.setUsersId(UsersRequestBodyObj.getUsersId() );
		newUsers.setUsersName(UsersRequestBodyObj.getUsersName());
		newUsers.setUsersId(UsersRequestBodyObj.getParentUsersId());
		newUsers.setCreatedAt(UsersRequestBodyObj.getCreatedAt());
		return UsersRepository.save(newUsers);		 
	}

	public Page<UsersEntity> listallusersfromdb(int pageNumber, int size) {
		Pageable pageable = PageRequest.of(pageNumber, size);
		return UsersRepository.listallusersfromdb(pageable);
	}
 
	public String deleteUsers(UsersIdRequest fld) {
		int UsersId= fld.getUsersId();
		UsersRepository.deleteById(UsersId);
		return "Users Deleted";
	}

	public String countNumberOfUserss() {

		return UsersRepository.countNumberOfUserss();
	}

}
