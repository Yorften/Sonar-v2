package com.music.dto.music;

import java.io.InputStream;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadData {

    private InputStream fileInputStream;
    private String fileName;

    private InputStream coverInputStream; 
    private String coverName;
}
