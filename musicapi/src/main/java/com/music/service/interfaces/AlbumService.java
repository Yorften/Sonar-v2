package com.music.service.interfaces;

import java.util.List;

import com.music.dto.album.AlbumDTO;
import com.music.dto.album.UpdateAlbumDTO;

/**
 * Service interface for Album entity.
 * Defines methods for CRUD operations and additional business logic.
 */
public interface AlbumService {

   AlbumDTO getAlbumById(String id);

   AlbumDTO getAlbumById(String id, String... with);

   List<AlbumDTO> getAllAlbums(String title, String artist, Integer year);

   AlbumDTO addAlbum(AlbumDTO Album);

   AlbumDTO updateAlbum(String AlbumId, UpdateAlbumDTO Album);

   void deleteAlbumById(String AlbumId);
}
