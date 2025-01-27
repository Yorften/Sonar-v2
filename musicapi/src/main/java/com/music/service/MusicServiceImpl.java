package com.music.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.music.dto.music.FileUploadData;
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
@Transactional(readOnly = true)
public class MusicServiceImpl implements MusicService {

    private final GridFsTemplate gridFsTemplate;
    private final GridFsOperations gridFsOperations;
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
    public List<MusicDTO> getAllAlbumMusics(String albumId) {
        List<Music> musics = musicRepository.findByAlbumId(albumId);
        return musicMapper.convertToDTOList(musics);
    }

    @Override
    @Transactional
    public MusicDTO addMusic(MusicDTO musicDTO, FileUploadData fileUploadData) {
        Music music = musicMapper.convertToEntity(musicDTO); // This first to check for the album before uploading the
                                                             // files

        InputStream fileStream = fileUploadData.getFileInputStream();
        String fileName = fileUploadData.getFileName();

        InputStream coverStream = fileUploadData.getCoverInputStream();
        String coverName = fileUploadData.getCoverName();

        ObjectId fileId = gridFsTemplate.store(fileStream, fileName);
        ObjectId coverId = coverStream != null ? gridFsTemplate.store(coverStream, coverName) : null;
        log.info("file id: " + fileId);
        music.setAudioFileId(fileId.toString());
        music.setCoverFileId(coverId.toString());

        return musicMapper.convertToDTO(musicRepository.save(music));
    }

    @Override
    @Transactional
    public MusicDTO updateMusic(String musicId, UpdateMusicDTO musicDTO, FileUploadData fileUploadData) {
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
        if (fileUploadData.getFileInputStream() != null) {
            InputStream fileStream = fileUploadData.getFileInputStream();
            String fileName = fileUploadData.getFileName();

            ObjectId fileId = gridFsTemplate.store(fileStream, fileName);

            gridFsTemplate.delete(new Query(Criteria.where("_id").is(musicDB.getAudioFileId())));

            musicDB.setAudioFileId(fileId.toString());
        }
        if (fileUploadData.getCoverInputStream() != null) {
            InputStream coverStream = fileUploadData.getCoverInputStream();
            String coverName = fileUploadData.getCoverName();

            ObjectId coverId = gridFsTemplate.store(coverStream, coverName);

            gridFsTemplate.delete(new Query(Criteria.where("_id").is(musicDB.getCoverFileId())));

            musicDB.setAudioFileId(coverId.toString());
        }

        return musicMapper.convertToDTO(musicRepository.save(musicDB));
    }

    @Override
    @Transactional
    public void deleteMusicById(String musicId) {
        Music music = musicRepository.findById(musicId)
                .orElseThrow(() -> new ResourceNotFoundException("Music not found"));

        if (music.getAudioFileId() != null) {
            gridFsTemplate.delete(new Query(Criteria.where("_id").is(music.getAudioFileId())));
        }
        if (music.getCoverFileId() != null) {
            gridFsTemplate.delete(new Query(Criteria.where("_id").is(music.getCoverFileId())));
        }

        musicRepository.delete(music);
    }

    @Override
    public InputStream getAudioStream(String audioFileId) throws IllegalStateException, IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(audioFileId)));

        if (file == null) {
            throw new ResourceNotFoundException("Audio file not found");
        }

        return gridFsOperations.getResource(file).getInputStream();
    }

    @Override
    public InputStream getCoverStream(String coverFieldId) throws IllegalStateException, IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(coverFieldId)));

        if (file == null) {
            throw new ResourceNotFoundException("Cover file not found");
        }

        return gridFsOperations.getResource(file).getInputStream();
    }

}
