package com.hivenus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hivenus.back_end.entity.OurUser;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDto {

    private int statusCode;
    private String error;
    private String name;
    private double protein;
    private double totalLipid;
    private double carbohydrate;
    private double energy;
    private double sugars;
    private double dietaryFiber;
    private double calcium;
    private double iron;
    private double sodium;
    private double vitaminA;
    private double vitaminC;
    private double cholesterol;

}