package com.music.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.music.dto.album.AlbumDTO;
import com.music.dto.music.MusicDTO;
import com.music.service.interfaces.AlbumService;
import com.music.service.interfaces.MusicService;

import lombok.RequiredArgsConstructor;

/**
 * REST controller for managing Album entities.
 * Handles HTTP requests and routes them to the appropriate service methods.
 */
@RestController // Marks this class as a RESTful controller.
@RequestMapping("/api/user/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final MusicService musicService;
    private final AlbumService albumService;

    @GetMapping()
    public Page<AlbumDTO> getAllAlbums(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) Integer year) {
        Pageable pageable = PageRequest.of((page - 1), size, Sort.by("ID").ascending());
        return albumService.getAllAlbums(pageable, title, artist, year, "musics");
    }

    @GetMapping("/{id}/musics")
    public List<MusicDTO> getAllAlbumMusics(
            @PathVariable("id") String albumId) {
        return musicService.getAllAlbumMusics(albumId);
    }

    @GetMapping("/{id}")
    public AlbumDTO getAlbum(
            @PathVariable("id") String albumId) {
        return albumService.getAlbumById(albumId, "musics");
    }

}
