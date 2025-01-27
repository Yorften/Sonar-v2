package com.music.dto.music;

import com.music.dto.album.AlbumDTO;

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
public class UpdateMusicDTO {

    private String title;

    private Integer duration;

    private AlbumDTO album;

}
