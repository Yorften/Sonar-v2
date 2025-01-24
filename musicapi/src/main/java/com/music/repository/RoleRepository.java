package com.music.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.music.model.Role;

/**
 * Repository interface for Role entity.
 * Provides CRUD operations and custom query methods through MongoRepository.
 */
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(String name);
    Iterable<Role> findAllByNameIn(Iterable<String> names);

}
