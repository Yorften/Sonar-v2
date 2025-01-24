package com.music.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.music.dto.music.MusicDTO;
import com.music.dto.music.UpdateMusicDTO;
import com.music.exceptions.ResourceNotFoundException;
import com.music.mapper.MusicMapper;
import com.music.model.Album;
import com.music.model.Music;
import com.music.repository.AlbumRepository;
import com.music.repository.MusicRepository;
import com.music.service.MusicServiceImpl;

public class MusicServiceImplTest {
    @Mock
    private MusicRepository musicRepository;

    @Mock
    private AlbumRepository albumRepository;

    @Mock
    private MusicMapper musicMapper;

    @InjectMocks
    private MusicServiceImpl musicService;

    private Music music;
    private MusicDTO musicDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        music = Music.builder()
                .id("23132424")
                .title("Test Music")
                .duration(190)
                .album(Album.builder().id("34444344").title("Test Album").build())
                .build();

        musicDTO = MusicDTO.builder()
                .id("23132424")
                .title("Test Music")
                .duration(190)
                .build();
    }

    @Test
    void testGetMusicById_WhenFound() {
        when(musicRepository.findById("23132424")).thenReturn(Optional.of(music));
        when(musicMapper.convertToDTO(music)).thenReturn(musicDTO);

        MusicDTO result = musicService.getMusicById("23132424");

        assertNotNull(result);
        assertEquals("Test Music", result.getTitle());
        verify(musicRepository, times(1)).findById("23132424");
    }

    @Test
    void testGetMusicById_WhenNotFound() {
        when(musicRepository.findById("23132424")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> musicService.getMusicById("23132424"));
        verify(musicRepository, times(1)).findById("23132424");
    }

    @Test
    void testGetAllAlbumMusics() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<Music> musicPage = new PageImpl<>(Collections.singletonList(music));
        when(musicRepository.findByAlbumId("23132424", pageable)).thenReturn(musicPage);
        when(musicMapper.convertToDTO(music)).thenReturn(musicDTO);

        Page<MusicDTO> result = musicService.getAllAlbumMusics(pageable, "23132424");

        assertEquals(1, result.getContent().size());
        assertEquals("Test Music", result.getContent().get(0).getTitle());
        verify(musicRepository, times(1)).findByAlbumId("23132424", pageable);
    }

    @Test
    void testAddMusic() {
        when(musicMapper.convertToEntity(musicDTO)).thenReturn(music);
        when(musicRepository.save(music)).thenReturn(music);
        when(musicMapper.convertToDTO(music)).thenReturn(musicDTO);

        MusicDTO result = musicService.addMusic(musicDTO);

        assertNotNull(result);
        assertEquals("Test Music", result.getTitle());
        verify(musicRepository, times(1)).save(music);
    }

    @Test
    void testUpdateMusic_WhenFound() {
        UpdateMusicDTO updateMusicDTO = UpdateMusicDTO.builder()
                .title("Updated Music")
                .duration(190)
                .build();

        when(musicRepository.findById("23132424")).thenReturn(Optional.of(music));
        when(musicRepository.save(music)).thenReturn(music);
        when(musicMapper.convertToDTO(music)).thenReturn(musicDTO);

        MusicDTO result = musicService.updateMusic("23132424", updateMusicDTO);

        assertNotNull(result);
        assertEquals("Test Music", result.getTitle());
        verify(musicRepository, times(1)).findById("23132424");
        verify(musicRepository, times(1)).save(music);
    }

    @Test
    void testUpdateMusic_WhenNotFound() {
        UpdateMusicDTO updateMusicDTO = UpdateMusicDTO.builder()
                .title("Updated Music")
                .build();

        when(musicRepository.findById("23132424")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> musicService.updateMusic("23132424", updateMusicDTO));
        verify(musicRepository, times(1)).findById("23132424");
    }

    @Test
    void testDeleteMusicById_WhenFound() {
        when(musicRepository.findById("23132424")).thenReturn(Optional.of(music));

        musicService.deleteMusicById("23132424");

        verify(musicRepository, times(1)).delete(music);
    }

    @Test
    void testDeleteMusicById_WhenNotFound() {
        when(musicRepository.findById("23132424")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> musicService.deleteMusicById("23132424"));
        verify(musicRepository, times(1)).findById("23132424");
    }

}
