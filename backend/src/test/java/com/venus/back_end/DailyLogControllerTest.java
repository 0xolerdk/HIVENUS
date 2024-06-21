package com.venus.back_end;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venus.back_end.entity.DailyLog;
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
import java.util.Arrays;

@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration(classes = TestUserConfig.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DailyLogControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(DailyLogControllerTest.class);

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
        logger.info("Test user - Username: {}, Password: {}, Email: {}", username, password, email);
    }

    @Test
    public void testAddDailyLog() throws Exception {
        logger.info("Testing adding a daily log");

        DailyLog dailyLog = new DailyLog();
        dailyLog.setDate(LocalDate.now());

        logger.info("Daily log payload: {}", dailyLog);

        mockMvc.perform(post("/dailylogs")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dailyLog)))
                .andExpect(status().isOk());

        logger.info("Add daily log test passed");
    }

    @Test
    public void testGetDailyLogsByDate() throws Exception {
        logger.info("Testing retrieval of daily logs by date");

        String date = LocalDate.now().toString();

        mockMvc.perform(get("/dailylogs/date")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", date))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));

        logger.info("Get daily logs by date test passed");
    }

}
