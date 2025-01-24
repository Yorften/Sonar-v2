package com.music.dto.role;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class RoleDTO {

    private String id;

    @NotNull(message = "Role name cannot be null")
    @Size(min = 3, max = 100, message = "Role name must be between 3 and 100 characters")
    private String name;

}
