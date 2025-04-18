package com.cloudstorageapi.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cloudstorageapi.api.entity.FileEntity;
 
 
@Repository
public interface  FileRepository extends CrudRepository<FileEntity,Integer> {

	@Query(value = "select * from  hemavathy_Files ", nativeQuery = true)
	Page<FileEntity> listallusersfromdb(Pageable pageable);

	@Query(value = "SELECT count(*) from hemavathy_Files", nativeQuery = true)
	String countNumberOfFiles();



}
