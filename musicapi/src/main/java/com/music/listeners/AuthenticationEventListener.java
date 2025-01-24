package com.music.listeners;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AuthenticationEventListener implements ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent event) {

        if (event instanceof AuthenticationSuccessEvent) {
            AuthenticationSuccessEvent successEvent = (AuthenticationSuccessEvent) event;
            String username = successEvent.getAuthentication().getName();
            WebAuthenticationDetails details = (WebAuthenticationDetails) successEvent.getAuthentication().getDetails();
            String ipAddress = details != null ? details.getRemoteAddress() : null;
            logEventMessage(username, ipAddress);

        } else if (event instanceof AbstractAuthenticationFailureEvent) {
            AbstractAuthenticationFailureEvent failureEvent = (AbstractAuthenticationFailureEvent) event;
            String username = (String) failureEvent.getAuthentication().getPrincipal();
            WebAuthenticationDetails details = (WebAuthenticationDetails) failureEvent.getAuthentication().getDetails();
            String ipAddress = details != null ? details.getRemoteAddress() : null;
            logEventMessage(username, ipAddress);
        }

    }

    public void logEventMessage(String username, String ipAddress) {
        String logMessage = String.format("Failed login attempt: User=%s, IP=%s, Time=%s \n",
                username, ipAddress, LocalDateTime.now());
        try {
            Files.write(Paths.get("./logs/login-attempts.log"),
                    logMessage.getBytes(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);
        } catch (IOException e) {
            log.error("Failed to log failed login attempt: " + e.getMessage());
        }
    }
}
