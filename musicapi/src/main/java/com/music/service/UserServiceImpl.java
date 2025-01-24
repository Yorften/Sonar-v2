package com.music.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.music.dto.user.UpdateUserDTO;
import com.music.dto.user.UserDTO;
import com.music.exceptions.ResourceNotFoundException;
import com.music.mapper.UserMapper;
import com.music.model.Role;
import com.music.model.User;
import com.music.repository.UserRepository;
import com.music.service.interfaces.RoleService;
import com.music.service.interfaces.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service implementation for User entity.
 * Defines methods for CRUD operations and additional business logic.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    public UserDTO getUserById(String id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return userMapper.convertToDTO(user);
    }

    @Override
    public UserDTO getUserById(String id, String... with) {
        userMapper.verifyIncludes(with);
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return userMapper.convertToDTO(user, with);
    }

    @Override
    public UserDTO getByUserName(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new ResourceNotFoundException("user not found"));
        return userMapper.convertToDTO(user);
    }

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable, String... with) {
        userMapper.verifyIncludes(with);
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(user -> userMapper.convertToDTO(user, with));
    }

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(user -> userMapper.convertToDTO(user));
    }

    @Override
    public UserDTO addUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user = userMapper.convertToEntity(userDTO);
        return userMapper.convertToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(String userId, UpdateUserDTO userDTO, String... with) {
        userMapper.verifyIncludes(with);
        User userDB = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("user not found"));

        if (!userDTO.getRoles().isEmpty()) {
            List<Role> roles = roleService.getAllRolesByName(userDTO.getRoles());
            userDB.setRoles(roles);
        }

        return userMapper.convertToDTO(userRepository.save(userDB), with);
    }

    @Override
    public void deleteUserById(String userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.delete(user);
    }

}
