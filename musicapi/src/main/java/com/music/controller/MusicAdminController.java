package com.music.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            @RequestBody @Valid MusicDTO musicDTO) {
        return musicService.addMusic(musicDTO);
    }

    @PutMapping("/{id}")
    public MusicDTO updateMusicDTO(
            @RequestBody @Valid UpdateMusicDTO updateMusicDTO,
            @PathVariable("id") String musicId) {
        return musicService.updateMusic(musicId, updateMusicDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> updateMusicDTO(@PathVariable("id") String musicId) {
        musicService.deleteMusicById(musicId);

        return ResponseEntity.noContent().build();
    }
}
