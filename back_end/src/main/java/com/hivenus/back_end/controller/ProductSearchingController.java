package com.hivenus.back_end.controller;

import com.hivenus.back_end.service.FCDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class ProductSearchingController {
    @Autowired
    private FCDService fcdService;

    @PostMapping("")

    @GetMapping("")
}
