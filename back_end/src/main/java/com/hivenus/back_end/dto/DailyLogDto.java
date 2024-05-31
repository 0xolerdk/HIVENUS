package com.hivenus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hivenus.back_end.entity.Activity;
import com.hivenus.back_end.entity.DailyLog;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.Product;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DailyLogDto {

    private int statusCode;
    private String error;
    private String message;
    private Long id;

    @Setter
    @Getter
    private LocalDate date;

    @Setter
    @Getter
    private List<Product> products;
    @Setter
    @Getter
    private List<Activity> activities;
//    private DailyLog dailyLog;
    private OurUser user;

}
