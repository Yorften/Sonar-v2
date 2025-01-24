package com.music.dto.music;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
public class MusicDTO {

    private String id;

    @NotNull(message = "Designation cannot be null")
    @Size(min = 3, max = 100, message = "Designation must be between 3 and 100 characters")
    private String title;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer duration;

    private AlbumDTO album;

}
