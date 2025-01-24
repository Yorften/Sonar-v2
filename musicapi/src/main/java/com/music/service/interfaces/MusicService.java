package com.music.service.interfaces;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.music.dto.music.MusicDTO;
import com.music.dto.music.UpdateMusicDTO;

/**
 * Service interface for Music entity.
 * Defines methods for CRUD operations and additional business logic.
 */
public interface MusicService {

   MusicDTO getMusicById(String id);

   MusicDTO getMusicById(String id, String... with);

   Page<MusicDTO> getAllMusics(Pageable pageable, String search, String albumId);

   Page<MusicDTO> getAllMusics(Pageable pageable, String search, String albumId, String... with);

   Page<MusicDTO> getAllAlbumMusics(Pageable pageable, String id);

   MusicDTO addMusic(MusicDTO Music);

   public MusicDTO updateMusic(String MusicId, UpdateMusicDTO Music);

   public void deleteMusicById(String MusicId);
}
