package com.music.controller.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.music.config.JWTGenerator;
import com.music.dto.auth.AuthResponse;
import com.music.dto.auth.LoginRequest;
import com.music.dto.user.UserDTO;
import com.music.service.interfaces.UserService;
import com.music.validation.UserValidationService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * REST controller for managing Album entities by the admin.
 * Handles HTTP requests and routes them to the appropriate service methods.
 */
@RestController // Marks this class as a RESTful controller.
@RequestMapping("/api/auth")
@AllArgsConstructor
@Slf4j
public class AuthController {

    private final UserValidationService userValidationService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator tokenGenerator;
    private final HttpServletRequest request;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest loginRequest) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword());

        WebAuthenticationDetails details = new WebAuthenticationDetails(request);              
        authenticationToken.setDetails(details);

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {

        if (userValidationService.isUsernameTaken(userDTO.getUsername())) {
            log.info("Username is already taken");
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        if (userValidationService.isEmailTaken(userDTO.getEmail())) {
            log.info("Email is already taken");
            return ResponseEntity.badRequest().body("Email is already taken");
        }

        if (!userValidationService.doPasswordsMatch(userDTO.getPassword(), userDTO.getRepeatPassword())) {
            log.info("Passwords do not match");
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        userService.addUser(userDTO);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("Logout successful", HttpStatus.OK);

    }

}
