package com.hivenus.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hivenus.back_end.entity.OurUser;
import com.hivenus.back_end.entity.Product;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

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
    private OurUser user;

}
