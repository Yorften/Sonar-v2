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
import org.springframework.transaction.annotation.Transactional;

import com.music.dto.album.AlbumDTO;
import com.music.dto.album.UpdateAlbumDTO;
import com.music.exceptions.DuplicateResourceException;
import com.music.exceptions.ResourceNotFoundException;
import com.music.mapper.AlbumMapper;
import com.music.model.Album;
import com.music.model.Music;
import com.music.repository.AlbumRepository;
import com.music.repository.MusicRepository;
import com.music.service.interfaces.AlbumService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service implementation for Album entity.
 * Defines methods for CRUD operations and additional business logic.
 */
@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final MusicRepository musicRepository;
    private final AlbumMapper albumMapper;
    private final MongoTemplate mongoTemplate;

    @Override
    public AlbumDTO getAlbumById(String id) {
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("album not found"));
        return albumMapper.convertToDTO(album);
    }

    @Override
    public AlbumDTO getAlbumById(String id, String... with) {
        albumMapper.verifyIncludes(with);
        Album album = albumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("album not found"));

        List<Music> musics = musicRepository.findAllByAlbum(album);

        album.setMusics(musics);

        return albumMapper.convertToDTO(album, with);
    }

    @Override
    public Page<AlbumDTO> getAllAlbums(Pageable pageable, String title, String artist, Integer year) {

        Query query = new Query();

        if (title != null && !title.isEmpty()) {
            log.info("title : " + title);
            query.addCriteria(Criteria.where("title").regex(title, "i"));
        }
        if (artist != null && !artist.isEmpty()) {
            log.info("artist : " + artist);
            query.addCriteria(Criteria.where("artist").regex(artist, "i"));
        }
        if (year != null && year >= 1500) {
            log.info("year : " + year);
            query.addCriteria(Criteria.where("year").is(year));
        }

        query.with(pageable);

        List<Album> albums = mongoTemplate.find(query, Album.class);
        long count = mongoTemplate.count(query.skip(pageable.getOffset()).limit(pageable.getPageSize()), Album.class);

        List<AlbumDTO> albumDTOs = albums.stream()
                .map(album -> albumMapper.convertToDTO(album))
                .collect(Collectors.toList());

        return new PageImpl<>(albumDTOs, pageable, count);
    }

    @Override
    public Page<AlbumDTO> getAllAlbums(Pageable pageable, String title, String artist, Integer year,
            String... with) {
        albumMapper.verifyIncludes(with);
        Query query = new Query();

        if (title != null && !title.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(title, "i"));
        }
        if (artist != null && !artist.isEmpty()) {
            query.addCriteria(Criteria.where("artist").regex(artist, "i"));
        }
        if (year != null && year >= 1500) {
            query.addCriteria(Criteria.where("year").is(year));
        }

        query.with(pageable);

        List<Album> albums = mongoTemplate.find(query, Album.class);
        long count = mongoTemplate.count(query.skip(pageable.getOffset()).limit(pageable.getPageSize()), Album.class);

        List<AlbumDTO> albumDTOs = albums.stream()
                .map(album -> albumMapper.convertToDTO(album, with))
                .collect(Collectors.toList());

        return new PageImpl<>(albumDTOs, pageable, count);
    }

    @Override
    @Transactional
    public AlbumDTO addAlbum(AlbumDTO albumDTO) {
        if (albumRepository.findByTitle(albumDTO.getTitle()).isPresent())
            throw new DuplicateResourceException("Album with this name already exists");
        Album album = albumMapper.convertToEntity(albumDTO);
        return albumMapper.convertToDTO(albumRepository.save(album));
    }

    @Override
    @Transactional
    public AlbumDTO updateAlbum(String albumId, UpdateAlbumDTO albumDTO) {
        Album albumDB = albumRepository.findById(albumId)
                .orElseThrow(() -> new ResourceNotFoundException("album not found"));

        if (albumDTO.getTitle() != null && !albumDTO.getTitle().isEmpty()) {
            albumDB.setTitle(albumDTO.getTitle());
        }
        if (albumDTO.getArtist() != null && !albumDTO.getTitle().isEmpty()) {
            albumDB.setArtist(albumDTO.getArtist());
        }
        if (albumDTO.getYear() != null) {
            albumDB.setYear(albumDTO.getYear());
        }

        return albumMapper.convertToDTO(albumRepository.save(albumDB));
    }

    @Override
    @Transactional
    public void deleteAlbumById(String albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() -> new ResourceNotFoundException("Album not found"));
        albumRepository.delete(album);
    }

}
