package com.venus.back_end;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration(classes = TestUserConfig.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserManagementControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    @Qualifier("jwtToken")
    private String jwtToken;

    @Autowired
    @Qualifier("testUsername")
    private String username;

    @Autowired
    private Faker faker;

    @Autowired
    @Qualifier("testPassword")
    private String password;

    @Autowired
    @Qualifier("testEmail")
    private String email;

    @BeforeEach
    public void setUp() {
        logger.info("Setting up test environment");
        logger.info("Test user - Username: {}, Password: {}, Email: {}", username, password, email);
    }

    @Test
    public void testUserLogin() throws Exception {
        logger.info("Testing user login");

        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("username", username);
        loginRequest.put("password", password);

        logger.info("Login request payload: {}", loginRequest);

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());

        logger.info("User login test passed");
    }

    @Test
    public void testRefreshToken() throws Exception {
        logger.info("Testing refresh token");

        Map<String, String> refreshTokenRequest = new HashMap<>();
        refreshTokenRequest.put("refreshToken", "some-refresh-token");

        logger.info("Refresh token request payload: {}", refreshTokenRequest);

        mockMvc.perform(post("/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(refreshTokenRequest)))
                .andExpect(status().isOk());

        logger.info("Refresh token test passed");
    }

    @Test
    public void testUserRegistration() throws Exception {
        logger.info("Testing user registration");

        Map<String, String> registerRequest = new HashMap<>();
        String newUsername = faker.name().username();
        String newPassword = faker.internet().password();
        String newEmail = faker.internet().emailAddress();

        registerRequest.put("username", newUsername);
        registerRequest.put("password", newPassword);
        registerRequest.put("email", newEmail);
        registerRequest.put("role", "USER");

        logger.info("Registration request payload: {}", registerRequest);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        logger.info("User registration test passed");
    }
}
