package com.cloudstorageapi.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cloudstorageapi.api.model.UsersIdRequest;
import com.cloudstorageapi.api.model.UsersRequestBody;
import  com.cloudstorageapi.api.service.UsersService;
 
  
@RestController
@CrossOrigin
public class UsersController {
	
	@Autowired
	private  UsersService UsersService;	
	
	@RequestMapping(value = "/createUsers", method = RequestMethod.POST)
	public ResponseEntity<?> createUsers(@RequestBody UsersRequestBody UsersReqBody) throws Exception {
		return ResponseEntity.ok(UsersService.createUsers(UsersReqBody));
	}
	
	@RequestMapping(value = "/updateUsers", method = RequestMethod.PUT)
	public ResponseEntity<?> updateUsers(@RequestBody UsersRequestBody UsersReqBody) throws Exception {
		return ResponseEntity.ok(UsersService.updateUsers(UsersReqBody));
	}		
	
	@RequestMapping(value = "/listAllUserss", method = RequestMethod.GET)
	public ResponseEntity<?> listAllUserss(@RequestParam(defaultValue = "0") final Integer pageNumber,
			@RequestParam(defaultValue = "10") final Integer size) throws Exception {
		return ResponseEntity.ok(UsersService.listallusersfromdb(pageNumber, size));
	}		
	
	@RequestMapping(value = "/deleteUsers", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUsers(@RequestBody UsersIdRequest user) throws Exception {
		return ResponseEntity.ok(UsersService.deleteUsers(user));
	}		
	
	@RequestMapping(value = "/Usersscount", method = RequestMethod.GET)
	public ResponseEntity<?> countNumberOfUserss() throws Exception {
		return ResponseEntity.ok((UsersService.countNumberOfUserss()));
	}
	
}
