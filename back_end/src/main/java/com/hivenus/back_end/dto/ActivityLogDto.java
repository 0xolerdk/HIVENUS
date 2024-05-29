package com.hivenus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hivenus.back_end.entity.Activity;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.Product;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ActivityLogDto {

    private int statusCode;
    private String error;
    private String message;
    private Date date;
    private List<Product> products;
    private List<Activity> activities;


}
