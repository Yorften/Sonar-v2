package com.music.dto.auth;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {

    @NotNull(message = "Username cannot be null")
    @Size(min = 4, max = 32, message = "Username must be between 6 and 32 characters")
    private String username;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, max = 32, message = "Password must be between 8 and 32 characters")
    private String password;

}
