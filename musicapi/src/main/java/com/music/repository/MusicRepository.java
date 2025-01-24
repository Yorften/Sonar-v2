package com.music.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.music.model.Album;
import com.music.model.Music;

/**
 * Repository interface for Music entity.
 * Provides CRUD operations and custom query methods through MongoRepository.
 */
@Repository
public interface MusicRepository extends MongoRepository<Music, String> {

    Page<Music> findByAlbumId(String albumId, Pageable pageable);

    List<Music> findAllByAlbum(Album album);


}
