package com.hivenus.back_end.service;

import com.hivenus.back_end.config.JWTAuthFilter;
import com.hivenus.back_end.dto.UserDto;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.repository.DailyLogRepository;
import com.hivenus.back_end.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersManagementService {

    @Autowired
    private UserRepository usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private DailyLogRepository dailyLogRepository;

    public UserDto register(UserDto registrationRequest) {
        UserDto resp = new UserDto();

        try {
            // Check if a user with the same email already exists
            Optional<OurUser> existingUser = usersRepo.findByEmail(registrationRequest.getEmail());
            if (existingUser.isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("A user with this email already exists");
            } else {
                OurUser ourUser = new OurUser();

                DailyLog dailyLog = new DailyLog();
                ourUser.setEmail(registrationRequest.getEmail());
                ourUser.setRole(registrationRequest.getRole());
                ourUser.setName(registrationRequest.getName());
                ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

                resp.setOurUsers(ourUser);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);

                OurUser savedUser = usersRepo.save(ourUser);
                var user = usersRepo.findByEmail(savedUser.getEmail()).orElseThrow();
                var jwt = jwtUtils.generateToken(user);
                resp.setToken(jwt);
                resp.setExpirationTime("24Hrs");
                dailyLog.setUser(savedUser);
                dailyLogRepository.save(dailyLog);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public UserDto login(UserDto loginRequest) {
        UserDto response = new UserDto();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public UserDto refreshToken(UserDto refreshTokenReqiest) {
        UserDto response = new UserDto();
        try {
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            OurUser users = usersRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public UserDto getAllUsers() {
        UserDto userDto = new UserDto();

        try {
            List<OurUser> result = usersRepo.findAll();
            if (!result.isEmpty()) {
                userDto.setOurUsersList(result);
                userDto.setStatusCode(200);
                userDto.setMessage("Successful");
            } else {
                userDto.setStatusCode(404);
                userDto.setMessage("No users found");
            }
            return userDto;
        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred: " + e.getMessage());
            return userDto;
        }
    }

    public UserDto getUsersById(Long id) {
        UserDto userDto = new UserDto();
        try {
            OurUser usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            userDto.setOurUsers(usersById);
            userDto.setStatusCode(200);
            userDto.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred: " + e.getMessage());
        }
        return userDto;
    }

    public UserDto deleteUser(Long userId) {
        UserDto userDto = new UserDto();
        try {
            Optional<OurUser> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(userId);
                userDto.setStatusCode(200);
                userDto.setMessage("User deleted successfully");
            } else {
                userDto.setStatusCode(404);
                userDto.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return userDto;
    }

    public UserDto updateUser(Long userId, OurUser updatedUser) {
        UserDto userDto = new UserDto();
        try {
            Optional<OurUser> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                OurUser existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                OurUser savedUser = usersRepo.save(existingUser);
                userDto.setOurUsers(savedUser);
                userDto.setStatusCode(200);
                userDto.setMessage("User updated successfully");
            } else {
                userDto.setStatusCode(404);
                userDto.setMessage("User not found for update");
            }
        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return userDto;
    }

    public UserDto getMyInfo(String email) {
        UserDto userDto = new UserDto();
        try {
            Optional<OurUser> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                userDto.setOurUsers(userOptional.get());
                userDto.setStatusCode(200);
                userDto.setMessage("successful");
            } else {
                userDto.setStatusCode(404);
                userDto.setMessage("User not found for update");
            }

        } catch (Exception e) {
            userDto.setStatusCode(500);
            userDto.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return userDto;
    }
}
