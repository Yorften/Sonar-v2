package com.music.service.interfaces;

import java.util.List;

import com.music.dto.role.RoleDTO;
import com.music.model.Role;

/**
 * Service interface for Role entity.
 * Defines methods for CRUD operations and additional business logic.
 */
public interface RoleService {

   Role getRoleById(String id);

   List<Role> getAllRolesByName(List<RoleDTO> roles);

   Role getRoleByName(String name);

}
