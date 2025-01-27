package com.music.controller;

import java.io.IOException;
import java.io.InputStream;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.music.dto.music.FileUploadData;
import com.music.dto.music.MusicDTO;
import com.music.dto.music.UpdateMusicDTO;
import com.music.service.interfaces.MusicService;

import lombok.RequiredArgsConstructor;

/**
 * REST controller for managing Music entities by the admin.
 * Handles HTTP requests and routes them to the appropriate service methods.
 */
@RestController // Marks this class as a RESTful controller.
@RequestMapping("/api/admin/musics")
@RequiredArgsConstructor
public class MusicAdminController {

    private final MusicService musicService;

    @PostMapping
    public MusicDTO saveMusic(
            @RequestPart @Valid MusicDTO music,
            @RequestPart(required = true) MultipartFile file,
            @RequestPart(required = false) MultipartFile cover) throws IOException {

        try (InputStream fileInputStream = cover != null ? file.getInputStream() : null;
                InputStream coverInputStream = cover != null ? cover.getInputStream() : null) {

            FileUploadData fileUploadData = FileUploadData.builder()
                    .fileInputStream(fileInputStream)
                    .fileName(file.getOriginalFilename())
                    .coverInputStream(coverInputStream)
                    .coverName(cover != null ? cover.getOriginalFilename() : null)
                    .build();

            return musicService.addMusic(music, fileUploadData);
        }
    }

    @PutMapping("/{id}")
    public MusicDTO updateMusicDTO(
            @RequestPart @Valid UpdateMusicDTO music,
            @RequestPart(required = false) MultipartFile file,
            @RequestPart(required = false) MultipartFile cover,
            @PathVariable("id") String musicId) throws IOException {

        try (InputStream fileInputStream = file != null ? file.getInputStream() : null;
                InputStream coverInputStream = cover != null ? cover.getInputStream() : null) {

            FileUploadData fileUploadData = FileUploadData.builder()
                    .fileInputStream(fileInputStream)
                    .fileName(file.getOriginalFilename())
                    .coverInputStream(coverInputStream)
                    .coverName(cover != null ? cover.getOriginalFilename() : null)
                    .build();

            return musicService.updateMusic(musicId, music, fileUploadData);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> updateMusicDTO(@PathVariable("id") String musicId) {
        musicService.deleteMusicById(musicId);

        return ResponseEntity.noContent().build();
    }
}
