package com.music.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.music.dto.music.MusicDTO;
import com.music.dto.music.UpdateMusicDTO;
import com.music.exceptions.ResourceNotFoundException;
import com.music.mapper.MusicMapper;
import com.music.model.Album;
import com.music.model.Music;
import com.music.repository.AlbumRepository;
import com.music.repository.MusicRepository;
import com.music.service.interfaces.MusicService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service implementation for Music entity.
 * Defines methods for CRUD operations and additional business logic.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService {

    private final MusicRepository musicRepository;
    private final AlbumRepository albumRepository;
    private final MusicMapper musicMapper;
    private final MongoTemplate mongoTemplate;

    @Override
    public MusicDTO getMusicById(String id) {
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Music not found"));
        return musicMapper.convertToDTO(music);
    }

    @Override
    public MusicDTO getMusicById(String id, String... with) {
        musicMapper.verifyIncludes(with);
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Music not found"));
        return musicMapper.convertToDTO(music, with);
    }

    @Override
    public Page<MusicDTO> getAllMusics(Pageable pageable, String title, String albumId) {
        Query query = new Query();

        if (title != null && !title.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(title, "i"));
        }
        if (albumId != null) {
            query.addCriteria(Criteria.where("album.id").is(albumId));
        }

        query.with(pageable);

        List<Music> musics = mongoTemplate.find(query, Music.class);
        long count = mongoTemplate.count(query.skip(pageable.getOffset()).limit(pageable.getPageSize()), Music.class);

        List<MusicDTO> musicDTOs = musics.stream()
                .map(album -> musicMapper.convertToDTO(album))
                .collect(Collectors.toList());

        return new PageImpl<>(musicDTOs, pageable, count);
    }

    @Override
    public Page<MusicDTO> getAllMusics(Pageable pageable, String title, String albumId, String... with) {

        musicMapper.verifyIncludes(with);

        Query query = new Query();

        if (title != null && !title.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(title, "i"));
        }
        if (albumId != null) {
            query.addCriteria(Criteria.where("album.id").is(albumId));
        }

        query.with(pageable);

        List<Music> musics = mongoTemplate.find(query, Music.class);
        long count = mongoTemplate.count(query.skip(pageable.getOffset()).limit(pageable.getPageSize()), Music.class);

        List<MusicDTO> musicDTOs = musics.stream()
                .map(album -> musicMapper.convertToDTO(album, with))
                .collect(Collectors.toList());

        return new PageImpl<>(musicDTOs, pageable, count);
    }

    @Override
    public Page<MusicDTO> getAllAlbumMusics(Pageable pageable, String albumId) {
        Page<Music> musicPage = musicRepository.findByAlbumId(albumId, pageable);
        return musicPage.map(music -> musicMapper.convertToDTO(music));
    }

    @Override
    public MusicDTO addMusic(MusicDTO musicDTO) {
        Music music = musicMapper.convertToEntity(musicDTO);
        return musicMapper.convertToDTO(musicRepository.save(music));
    }

    @Override
    public MusicDTO updateMusic(String musicId, UpdateMusicDTO musicDTO) {
        Music musicDB = musicRepository.findById(musicId)
                .orElseThrow(() -> new ResourceNotFoundException("Music not found"));

        if (musicDTO.getTitle() != null && !musicDTO.getTitle().isEmpty()) {
            musicDB.setTitle(musicDTO.getTitle());
        }
        if (musicDTO.getDuration() != null) {
            musicDB.setDuration(musicDTO.getDuration());
        }
        if (musicDTO.getAlbum() != null) {
            Album album = albumRepository.findById(musicDTO.getAlbum().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("album not found"));
            musicDB.setAlbum(album);
        }

        return musicMapper.convertToDTO(musicRepository.save(musicDB));
    }

    @Override
    public void deleteMusicById(String musicId) {
        Music music = musicRepository.findById(musicId)
                .orElseThrow(() -> new ResourceNotFoundException("Music not found"));
        musicRepository.delete(music);
    }

}
