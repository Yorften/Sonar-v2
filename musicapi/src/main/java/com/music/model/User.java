package com.music.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a Music entity in the application.
 */
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    @Indexed
    private String id; 

    @Indexed
    private String username;

    private String password;

    @Builder.Default
    private boolean isEnabled = true;

    @Indexed(unique = true)
    private String email;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime removedAt;

    @Builder.Default
    @DBRef
    private List<Role> roles = new ArrayList<>();
}
