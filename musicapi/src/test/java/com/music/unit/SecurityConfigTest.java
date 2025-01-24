package com.music.unit;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.music.config.SecurityConfig;
import com.music.controller.auth.AuthController;
import com.music.dto.auth.LoginRequest;
import com.music.service.CustomUserDetailsServiceImpl;
import com.music.service.interfaces.UserService;
import com.music.util.DataSeeder;
import com.music.validation.UserValidationService;

@WebMvcTest(AuthController.class)
@Import(SecurityConfig.class)
public class SecurityConfigTest {

	@Autowired
	private WebApplicationContext webApplicationContext;

	private ObjectMapper objectMapper;

	private MockMvc mockMvc;

	@BeforeEach
	public void setup() {
		objectMapper = new ObjectMapper();
		mockMvc = MockMvcBuilders
				.webAppContextSetup(webApplicationContext)
				.apply(springSecurity())
				.build();
	}

	@MockBean
	private AuthenticationManager authenticationManager;

	@MockBean
	private UserDetailsService customUserDetailsService;

	@MockBean
	private UserValidationService userValidationService;

	@MockBean
	private UserService userService;

	@MockBean
	private DataSeeder dataSeeder;

	@MockBean
	private CustomUserDetailsServiceImpl customUserDetailsServiceImpl;

	@Test
	void whenLoginWithValidCredentials_thenReturnOk() throws Exception {
		LoginRequest loginRequest = new LoginRequest("testuser", "password123");

		mockMvc.perform(post("/api/auth/login")
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(loginRequest)))
				.andExpect(status().isOk())
				.andExpect(content().string("Login successful"));

	}

	@Test
	void whenRegisterWithValidDetails_thenReturnOk() throws Exception {
		when(userValidationService.doPasswordsMatch(anyString(), anyString()))
				.thenReturn(true);

		mockMvc.perform(post("/api/auth/register")
				.contentType("application/json")
				.content(
						"{\"username\": \"cvcv2\",\"password\": \"password\",\"repeatPassword\": \"password\",\"email\": \"newuser@example.com\",\"roles\": [{\"name\": \"ROLE_ADMIN\"}]}"))
				.andExpect(status().isOk())
				.andExpect(content().string("User registered successfully"));

	}

	@Test
	void whenLogout_thenReturnOk() throws Exception {
		mockMvc.perform(post("/api/auth/logout")
				.with(SecurityMockMvcRequestPostProcessors.user("manager").roles("ADMIN")))
				.andExpect(status().isOk())
				.andExpect(content().string("Logout successful"));

	}
}
