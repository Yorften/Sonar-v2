package com.music.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role getRoleById(String id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }

    @Override
    public List<Role> getAllRolesByName(List<RoleDTO> roles) {
        List<Role> roleEntities = new ArrayList<>();
        try {
            Iterable<String> roleNames = roles
                    .stream()
                    .map(RoleDTO::getName)
                    .collect(Collectors.toList());

            roleRepository.findAllByNameIn(roleNames).forEach(roleEntities::add);
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
