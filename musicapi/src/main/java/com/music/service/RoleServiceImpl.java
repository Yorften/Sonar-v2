package com.music.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.music.dto.role.RoleDTO;
import com.music.model.Role;
import com.music.repository.RoleRepository;
import com.music.service.interfaces.RoleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service implementation for User entity.
 * Defines methods for CRUD operations and additional business logic.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role getRoleById(String id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }

    @Override
    public List<Role> getAllRolesByName(List<RoleDTO> roles) {
        roles.forEach(role -> log.info("Role : " + role.toString()));
        List<Role> roleEntities = new ArrayList<>();
        try {
            Iterable<String> roleNames = roles
                    .stream()
                    .map(RoleDTO::getName)
                    .collect(Collectors.toList());

            roleRepository.findAllByNameIn(roleNames).forEach(roleEntities::add);
            roleEntities.forEach(role -> log.info("Role : " + role.toString()));
        } catch (Exception e) {
            log.error("Error fetching roles", e);
        }

        return roleEntities;
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }

}
