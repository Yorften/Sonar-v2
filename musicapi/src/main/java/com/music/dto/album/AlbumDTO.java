package com.music.dto.album;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.music.dto.music.MusicDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlbumDTO {

    private String id;

    @NotNull(message = "Album name cannot be null")
    @Size(min = 3, max = 100, message = "Album name must be between 3 and 100 characters")
    private String title;

    @NotNull(message = "Album description cannot be null")
    @Size(min = 3, max = 100, message = "Album description must be between 3 and 100 characters")
    private String artist;

    @NotNull(message = "Album release date cannot be null")
    @Min(value = 1500, message = "Album release year shouldn't be below 1500")
    private Integer year;

    private List<MusicDTO> musics;
}
