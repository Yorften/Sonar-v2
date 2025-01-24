package com.music.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.music.exceptions.ResourceNotFoundException;
import com.music.model.User;

/**
 * Repository interface for User entity.
 * Provides CRUD operations and custom query methods through MongoRepository.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    @Transactional
    default void softDeleteUser(String userId) {

        User user = findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRemovedAt(LocalDateTime.now());
        save(user);

    }

    Optional<User> findByUsername(String userName);

    Optional<User> findByEmail(String email);

    Boolean existsByUsername(String username);

}
