package com.music.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<MusicDTO> getAllMusics(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String albumId) {
        Pageable pageable = PageRequest.of((page - 1), size, Sort.by("ID").ascending());
        return musicService.getAllMusics(pageable, title, albumId, "album");
    }

    @GetMapping("/album/{id}")
    public Page<MusicDTO> getAllAlbumMusics(
            @PathVariable("id") String albumId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of((page - 1), size, Sort.by("ID").ascending());
        return musicService.getAllAlbumMusics(pageable, albumId);
    }
}
