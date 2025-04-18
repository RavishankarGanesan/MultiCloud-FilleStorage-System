package com.cloudstorageapi.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cloudstorageapi.api.entity.UsersEntity;
 
 
@Repository
public interface  UsersRepository extends CrudRepository<UsersEntity,Integer> {

	@Query(value = "select * from  hemavathy_Userss ", nativeQuery = true)
	Page<UsersEntity> listallusersfromdb(Pageable pageable);

	@Query(value = "SELECT count(*) from hemavathy_Userss", nativeQuery = true)
	String countNumberOfUserss();
}