package com.music.dto.album;

import javax.validation.constraints.Size;

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
public class UpdateAlbumDTO {

    @Size(min = 3, max = 100, message = "Album name must be between 3 and 100 characters")
    private String title;

    @Size(min = 3, max = 100, message = "Album description must be between 3 and 100 characters")
    private String artist;

    private Integer year;
    
}
