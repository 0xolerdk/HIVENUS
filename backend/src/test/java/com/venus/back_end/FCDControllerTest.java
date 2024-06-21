package com.venus.back_end;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venus.back_end.service.JWTUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.ArrayList;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestUserConfig.class)
public class FCDControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private String testUsername;

    @Autowired
    private String testPassword;

    @Autowired
    private String testEmail;

    private String jwtToken;

    @BeforeEach
    public void setUp() {
        UserDetails userDetails = new User(testEmail, testPassword, new ArrayList<>()); // Using test email and password from TestUserConfig
        jwtToken = jwtUtils.generateToken(userDetails); // Generate a token for testing
    }

    @Test
    public void testCalculateDailyNutrients() throws Exception {
        mockMvc.perform(get("/fcd/calculate-daily-nutrients")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", LocalDate.now().toString()))
                .andExpect(status().isOk());
    }

    @Test
    public void testFindProduct() throws Exception {
        mockMvc.perform(get("/fcd/find")
                .header("Authorization", "Bearer " + jwtToken)
                .param("name", "apple"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(50));
    }

    @Test
    public void testGetProductMeasures() throws Exception {
        String ndbno = "454004";

        mockMvc.perform(get("/fcd/measures/{ndbno}", ndbno)
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    public void testGetProductNutrients() throws Exception {
        String ndbno = "454004";

        mockMvc.perform(get("/fcd/nutrients/{ndbno}", ndbno)
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
