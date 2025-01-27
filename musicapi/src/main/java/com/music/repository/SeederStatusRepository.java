package com.music.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.music.model.SeederStatus;

/**
 * Repository interface for Album entity.
 * Provides CRUD operations and custom query methods through MongoRepository.
 */
@Repository
public interface SeederStatusRepository extends MongoRepository<SeederStatus, String> {

    Optional<SeederStatus> findByName(String name);

}
