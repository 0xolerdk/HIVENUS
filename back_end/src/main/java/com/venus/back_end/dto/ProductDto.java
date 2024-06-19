package com.venus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDto {

    private int statusCode;
    private int fdcId;
    private String message;
    private String error;
    private String name;
    private String portion;
    private int quantity;
    private int gram;


}