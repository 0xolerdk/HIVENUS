package com.venus.back_end;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import com.venus.back_end.entity.SleepTrack;
import com.venus.back_end.repository.SleepTrackRepository;
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

import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration(classes = TestUserConfig.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SleepTrackControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(SleepTrackControllerTest.class);

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
    @Qualifier("testPassword")
    private String password;

    @Autowired
    @Qualifier("testEmail")
    private String email;

    @BeforeEach
    public void setUp() {
        logger.info("Setting up test environment");
        logger.debug("Test user - Username: {}, Password: {}, Email: {}", username, password, email);
    }

    @Test
    public void testCreateSleepTrack() throws Exception {
        logger.info("Testing sleep track creation");

        SleepTrack sleepTrack = new SleepTrack();
        sleepTrack.setStartTime(0);
        sleepTrack.setEndTime(480);
        sleepTrack.setDate(LocalDate.parse("2023-06-20"));

        logger.debug("Sleep track creation payload: {}", sleepTrack);

        mockMvc.perform(post("/sleeptracks/create")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(sleepTrack)))
                .andExpect(status().isOk());

        logger.info("Sleep track creation test passed");
    }

    @Test
    public void testGetSleepTracksByDate() throws Exception {
        logger.info("Testing retrieval of sleep tracks by date");

        String date = "2023-06-20";

        mockMvc.perform(get("/sleeptracks/date")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", date))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2)); // Adjust the expected value as needed

        logger.info("Sleep track retrieval by date test passed");
    }
}
