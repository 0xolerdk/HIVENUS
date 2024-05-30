package com.hivenus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String role;
    private String email;
    private String password;
    private OurUser ourUsers;
    private List<OurUser> ourUsersList;
    private List<DailyLog> dailyLogs;

}