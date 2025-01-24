package com.music.dto.user;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.music.dto.role.RoleDTO;

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
public class UpdateUserDTO {

    @Builder.Default
    @NotNull(message = "Role shouldn't be null")
    private List<RoleDTO> roles = new ArrayList<>();

}
