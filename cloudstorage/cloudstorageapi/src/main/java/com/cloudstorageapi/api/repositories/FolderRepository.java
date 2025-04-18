package com.cloudstorageapi.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cloudstorageapi.api.entity.FolderEntity;
 
 
@Repository
public interface  FolderRepository extends CrudRepository<FolderEntity,Integer> {

	@Query(value = "select * from  hemavathy_Folders ", nativeQuery = true)
	Page<FolderEntity> listallusersfromdb(Pageable pageable);

	@Query(value = "SELECT count(*) from hemavathy_Folders", nativeQuery = true)
	String countNumberOfFolders();



}
