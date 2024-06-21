package com.venus.back_end;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.venus.back_end.entity.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration(classes = TestUserConfig.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    @Qualifier("jwtToken")
    private String jwtToken;


    private String date;

    @BeforeEach
    public void setUp() {
        date = "2023-06-20";
    }

    @Test
    public void testGetProductsByDate() throws Exception {
        mockMvc.perform(get("/products/date")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", date))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Banana"))
                .andExpect(jsonPath("$[0].gram").value(120));
    }

    @Test
    public void testAddProductByDate() throws Exception {
        Product product = new Product();
        product.setName("Banana");
        product.setGram(120);
        product.setId(12346L);

        mockMvc.perform(post("/products/date")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", date)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Banana"))
                .andExpect(jsonPath("$.gram").value(120));
    }


    @Test
    public void testDeleteProductByDate() throws Exception {
        String productId = "12345";

        mockMvc.perform(delete("/products/date")
                .header("Authorization", "Bearer " + jwtToken)
                .param("date", date)
                .param("productId", productId))
                .andExpect(status().isNoContent());
    }

}
