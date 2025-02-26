package com.music.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.music.dto.music.MusicDTO;
import com.music.service.interfaces.MusicService;

import lombok.RequiredArgsConstructor;

/**
 * REST controller for managing Music entities.
 * Handles HTTP requests and routes them to the appropriate service methods.
 */
@RestController // Marks this class as a RESTful controller.
@RequestMapping("/api/user/musics")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @GetMapping()
    public List<MusicDTO> getAllMusics(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String albumId) {
        return musicService.getAllMusics(title, albumId, "album");
    }

    @GetMapping("/album/{id}")
    public List<MusicDTO> getAllAlbumMusics(
            @PathVariable("id") String albumId) {
        return musicService.getAllAlbumMusics(albumId);
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<InputStreamResource> streamMusic(@PathVariable String id) throws IllegalStateException, IOException {
        
        MusicDTO musicDTO = musicService.getMusicById(id);
        InputStream audioStream = musicService.getAudioStream(musicDTO.getAudioFileId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(audioStream));
    }

    @GetMapping("/{id}/cover")
    public ResponseEntity<InputStreamResource> streamCover(@PathVariable String id) throws IllegalStateException, IOException {
        
        MusicDTO musicDTO = musicService.getMusicById(id);
        InputStream audioStream = musicService.getCoverStream(musicDTO.getCoverFileId());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(audioStream));
    }
}
