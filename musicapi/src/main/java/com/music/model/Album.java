package com.music.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents a Album entity in the application.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "albums")
public class Album {

    @Id
    private String id;

    private String title;

    private String artist;

    private Integer year;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime removedAt;

    @Builder.Default
    @DBRef
    private List<Music> musics = new ArrayList<>();

}
