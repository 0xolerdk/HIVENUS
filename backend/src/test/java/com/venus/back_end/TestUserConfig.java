package com.venus.back_end;

import com.github.javafaker.Faker;
import com.venus.back_end.dto.UserDto;
import com.venus.back_end.entity.OurUser;
import com.venus.back_end.repository.UserRepository;
import com.venus.back_end.service.JWTUtils;
import com.venus.back_end.service.UsersManagementService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@TestConfiguration
public class TestUserConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UsersManagementService usersManagementService;

    private Faker faker = new Faker();
    private static String username;
    private static String password;
    private static String email;
    private static String jwtToken;

    @PostConstruct
    public void init() {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        username = faker.name().username();
        password = faker.internet().password();
        email = faker.internet().emailAddress();

        UserDto user = new UserDto();
        user.setName(username);
        user.setPassword(passwordEncoder.encode(password)); // Encode the password
        user.setEmail(email);
        user.setRole("-");

        UserDto response = usersManagementService.register(user);

        jwtToken = response.getToken();
    }

    @Bean
    public String testUsername() {
        return username;
    }

    @Bean
    public String testPassword() {
        return password;
    }

    @Bean
    public String testEmail() {
        return email;
    }

    @Bean
    public String jwtToken() {
        return jwtToken;
    }
}
