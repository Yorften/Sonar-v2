package com.music.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.music.dto.album.AlbumDTO;
import com.music.dto.album.UpdateAlbumDTO;

/**
 * Service interface for Album entity.
 * Defines methods for CRUD operations and additional business logic.
 */
public interface AlbumService {

   AlbumDTO getAlbumById(String id);

   AlbumDTO getAlbumById(String id, String... with);

   Page<AlbumDTO> getAllAlbums(Pageable pageable, String title, String artist, Integer year);

   Page<AlbumDTO> getAllAlbums(Pageable pageable, String title, String artist, Integer year, String... with);

   AlbumDTO addAlbum(AlbumDTO Album);

   AlbumDTO updateAlbum(String AlbumId, UpdateAlbumDTO Album);

   void deleteAlbumById(String AlbumId);
}
