package com.music.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.music.model.Album;

/**
 * Repository interface for Album entity.
 * Provides CRUD operations and custom query methods through MongoRepository.
 */
@Repository
public interface AlbumRepository extends MongoRepository<Album, String> {

    Optional<Album> findByTitle(String title);

    Page<Album> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
