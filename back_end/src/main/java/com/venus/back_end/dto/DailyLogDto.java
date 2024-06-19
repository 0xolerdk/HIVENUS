package com.venus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.venus.back_end.entity.OurUser;
import com.venus.back_end.entity.Product;
import com.venus.back_end.entity.SleepTrack;
import com.venus.back_end.entity.WaterIntake;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DailyLogDto {

    private int statusCode;
    private String error;
    private String message;
    private Long id;
    private LocalDate date;
    private List<Product> products;
    private SleepTrack sleepTrack;
    private List<WaterIntake> waterIntakes;
    private OurUser user;

}
