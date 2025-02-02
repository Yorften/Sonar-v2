package com.music.service.interfaces;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.music.dto.music.FileUploadData;
import com.music.dto.music.MusicDTO;
import com.music.dto.music.UpdateMusicDTO;

/**
 * Service interface for Music entity.
 * Defines methods for CRUD operations and additional business logic.
 */
public interface MusicService {

   MusicDTO getMusicById(String id);

   MusicDTO getMusicById(String id, String... with);

   List<MusicDTO> getAllMusics(String search, String albumId);

   List<MusicDTO> getAllMusics(String search, String albumId, String... with);

   List<MusicDTO> getAllAlbumMusics(String id);

   MusicDTO addMusic(MusicDTO Music, FileUploadData fileUploadData);

   MusicDTO updateMusic(String MusicId, UpdateMusicDTO Music, FileUploadData fileUploadData);

   void deleteMusicById(String MusicId);

   InputStream getAudioStream(String audioFileId) throws IllegalStateException, IOException;

   InputStream getCoverStream(String audioFileId) throws IllegalStateException, IOException;
}
