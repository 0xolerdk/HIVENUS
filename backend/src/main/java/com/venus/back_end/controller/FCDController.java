package com.venus.back_end.controller;

import com.venus.back_end.dto.UserDto;
import com.venus.back_end.repository.ProductRepository;
import com.venus.back_end.service.FCDService;
import com.venus.back_end.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fcd")
public class FCDController {

    @Autowired
    private FCDService fcdService;
    @Autowired
    UsersManagementService usersManagementService;
    @Autowired
    ProductRepository productRepository;


    @GetMapping("/find")
    public List<Map<String, Object>> find(@RequestParam String name) {
        return fcdService.find(name);
    }

    @GetMapping("/nutrients/{ndbno}")
    public List<Map<String, Object>> getNutrients(@PathVariable String ndbno) {
        return fcdService.getNutrients(ndbno);
    }

    @GetMapping("/measures/{ndbno}")
    public Map<String, Double> getMeasures(@PathVariable String ndbno) {
        return fcdService.getMeasures(ndbno);
    }

    @PostMapping("/calculate-nutrients")
    public List<Map<String, Object>> calculateNutrients(@RequestBody Map<String, Object> body) {
        String ndbno = (String) body.get("ndbno");
        String portionDescription = (String) body.get("portion_description");
        double quantity = ((Number) body.get("quantity")).doubleValue();
        return fcdService.calculateNutrients(ndbno, portionDescription, quantity);
    }

    @PostMapping("/calculate-nutrients-gram")
    public List<Map<String, Object>> calculateNutrientsGram(@RequestBody Map<String, Object> body) {
        String ndbno = (String) body.get("ndbno");
        double grams = ((Number) body.get("grams")).doubleValue();
        return fcdService.calculateNutrientsGram(ndbno, grams);
    }

    @GetMapping("/calculate-daily-nutrients")
    public ResponseEntity<Map<String, Double>> calculateDailyNutrients(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        UserDto userDto = usersManagementService.getMyInfo(email);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(fcdService.calculateDailyNutrients(date, productRepository.findByDailyLogDateAndUserId(date, userDto.getOurUsers().getId())));
    }
}
