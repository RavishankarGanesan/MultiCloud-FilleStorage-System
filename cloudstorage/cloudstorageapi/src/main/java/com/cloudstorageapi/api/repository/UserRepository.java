package com.cloudstorageapi.api.repository;

import com.cloudstorageapi.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailIgnoreCase(String email); // Case-insensitive email lookup
    Optional<User> findByVerificationToken(String token);
    boolean existsByEmail(String email);
}