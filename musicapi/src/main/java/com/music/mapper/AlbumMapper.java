package com.music.mapper;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.music.dto.album.AlbumDTO;
import com.music.dto.music.MusicDTO;
import com.music.exceptions.InvalidDataException;
import com.music.model.Album;
import com.music.model.Music;
import com.music.repository.MusicRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AlbumMapper {
    private final List<String> VALID_INCLUDES = Arrays.asList("musics");

    private final MusicRepository musicRepository;

    public void verifyIncludes(String... with)
            throws InvalidDataException {
        List<String> includesList = Arrays.asList(with);

        for (String include : includesList) {
            if (!include.isEmpty() && !VALID_INCLUDES.contains(include)) {
                throw new InvalidDataException("Invalid include: " + include);
            }
        }
    }

    public Album convertToEntity(AlbumDTO albumDTO) {
        return Album.builder()
                .title(albumDTO.getTitle())
                .artist(albumDTO.getArtist())
                .year(albumDTO.getYear())
                .build();
    }

    public AlbumDTO convertToDTO(Album album) {
        return AlbumDTO.builder()
                .id(album.getId())
                .title(album.getTitle())
                .artist(album.getArtist())
                .year(album.getYear())
                .build();
    }

    public List<AlbumDTO> convertToDTOList(List<Album> albums) {
        return albums.stream()
                .map(album -> convertToDTO(album))
                .collect(Collectors.toList());
    }

    public AlbumDTO convertToDTO(Album album, String... with) {
        List<String> includesList = Arrays.asList(with);

        List<MusicDTO> musicDTOs = null;

        if (includesList.contains("musics")) {
            List<Music> musics = musicRepository.findByAlbumId(album.getId());
            musicDTOs = musics.stream().map(music -> MusicDTO.builder()
                    .id(music.getId())
                    .title(music.getTitle())
                    .duration(music.getDuration())
                    .build())
                    .collect(Collectors.toList());
        }

        return AlbumDTO.builder()
                .id(album.getId())
                .title(album.getTitle())
                .artist(album.getArtist())
                .year(album.getYear())
                .musics(musicDTOs)
                .build();
    }

    public List<AlbumDTO> convertToDTOList(List<Album> albums, String... with) {
        return albums.stream()
                .map(album -> convertToDTO(album, with))
                .collect(Collectors.toList());
    }
}
