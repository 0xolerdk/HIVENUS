package com.venus.back_end;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venus.back_end.service.JWTUtils;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;

@AutoConfigureMockMvc
@SpringBootTest
class BackEndApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JWTUtils jwtUtils;

    private String jwtToken;

    @BeforeEach
    public void setUp() {
        UserDetails userDetails = new User("user", "password", new ArrayList<>()); // Adjust as needed
        jwtToken = jwtUtils.generateToken(userDetails); // Generate a token for testing
    }



}
