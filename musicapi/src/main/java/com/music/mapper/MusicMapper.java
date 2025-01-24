package com.music.mapper;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.music.dto.album.AlbumDTO;
import com.music.dto.music.MusicDTO;
import com.music.exceptions.InvalidDataException;
import com.music.exceptions.ResourceNotFoundException;
import com.music.model.Album;
import com.music.model.Music;
import com.music.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MusicMapper {
    private final List<String> VALID_INCLUDES = Arrays.asList("album");

    private final AlbumRepository albumRepository;

    public void verifyIncludes(String... with)
            throws InvalidDataException {
        List<String> includesList = Arrays.asList(with);

        for (String include : includesList) {
            if (!include.isEmpty() && !VALID_INCLUDES.contains(include)) {
                throw new InvalidDataException("Invalid include: " + include);
            }
        }
    }

    public Music convertToEntity(MusicDTO musicDTO) {
        Album album = albumRepository.findById(musicDTO.getAlbum().getId())
                .orElseThrow(() -> new ResourceNotFoundException("album not found"));

        return Music.builder().title(musicDTO.getTitle())
                .duration(musicDTO.getDuration())
                .album(album)
                .build();
    }

    public MusicDTO convertToDTO(Music music) {
        return MusicDTO.builder()
                .title(music.getTitle())
                .duration(music.getDuration())
                .build();
    }

    public List<MusicDTO> convertToDTOList(List<Music> musics) {
        return musics.stream()
                .map(music -> convertToDTO(music))
                .collect(Collectors.toList());
    }

    public MusicDTO convertToDTO(Music music, String... with) {
        List<String> includesList = Arrays.asList(with);

        AlbumDTO albumDTO = null;

        if (includesList.contains("album")) {
            Album album = music.getAlbum();
            if (album != null) {
                albumDTO = AlbumDTO.builder()
                        .title(album.getTitle())
                        .artist(album.getArtist())
                        .year(album.getYear())
                        .build();
            }
        }

        return MusicDTO.builder()
                .title(music.getTitle())
                .duration(music.getDuration())
                .album(albumDTO)
                .build();
    }

    public List<MusicDTO> convertToDTOList(List<Music> musics, String... with) {
        verifyIncludes(with);
        return musics.stream()
                .map(music -> convertToDTO(music, with))
                .collect(Collectors.toList());
    }
}
