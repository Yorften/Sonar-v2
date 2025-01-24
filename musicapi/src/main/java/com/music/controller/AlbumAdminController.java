package com.music.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.music.dto.album.AlbumDTO;
import com.music.dto.album.UpdateAlbumDTO;
import com.music.service.interfaces.AlbumService;

import lombok.RequiredArgsConstructor;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * REST controller for managing Album entities by the admin.
 * Handles HTTP requests and routes them to the appropriate service methods.
 */
@RestController // Marks this class as a RESTful controller.
@RequestMapping("/api/admin/albums")
@RequiredArgsConstructor
public class AlbumAdminController {

    private final AlbumService albumService;

    @PostMapping
    public AlbumDTO saveAlbum(
            @RequestBody @Valid AlbumDTO albumDTO) {
        return albumService.addAlbum(albumDTO);
    }

    @PutMapping("/{id}")
    public AlbumDTO updateAlbumDTO(
            @RequestBody @Valid UpdateAlbumDTO updateAlbumDTO,
            @PathVariable("id") String albumId) {
        return albumService.updateAlbum(albumId, updateAlbumDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> updateAlbumDTO(@PathVariable("id") String albumId) {
        albumService.deleteAlbumById(albumId);

        return ResponseEntity.noContent().build();
    }

}
