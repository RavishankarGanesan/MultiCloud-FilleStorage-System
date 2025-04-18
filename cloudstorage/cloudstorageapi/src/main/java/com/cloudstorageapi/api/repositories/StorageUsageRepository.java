package com.cloudstorageapi.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.cloudstorageapi.api.entity.StorageUsageEntity;
 
 
@Repository
public interface  StorageUsageRepository extends CrudRepository<StorageUsageEntity,Integer> {

	@Query(value = "select * from  hemavathy_StorageUsages ", nativeQuery = true)
	Page<StorageUsageEntity> listallusersfromdb(Pageable pageable);

	@Query(value = "SELECT count(*) from hemavathy_StorageUsages", nativeQuery = true)
	String countNumberOfStorageUsages();



}
