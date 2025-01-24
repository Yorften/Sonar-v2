package com.music.service;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.music.model.User;
import com.music.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Service implementation for User entity.
 * Defines methods for CRUD operations and additional business logic.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

		return new org.springframework.security.core.userdetails.User(
				user.getUsername(),
				user.getPassword(),
				user.isEnabled(),
				true, // accountNonExpired
				true, // credentialsNonExpired
				user.isEnabled(), // accountNonLocked
				getAuthorities(user));

	}

	private Collection<? extends GrantedAuthority> getAuthorities(User user) {
		return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName()))
				.collect(Collectors.toList());
	}

}
