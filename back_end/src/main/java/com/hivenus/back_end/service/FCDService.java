package com.hivenus.back_end.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.*;

@Service
public class FCDService {
    private static final String API_KEY = "FPSzFJBUD8wUKeGA5qaFggDIlu7k4pcN9mP6qdx7";
    private static final String API_URL = "https://api.nal.usda.gov/fdc/v1/";

    private RestTemplate restTemplate = new RestTemplate();

    public String get_url(String command) {
        return (API_URL + command + "?api_key=" + API_KEY);
    }

    public List<Object> find(String name) {
        String base_url = get_url("foods/search");
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(base_url)
            .queryParam("query", name);

        ResponseEntity<List> response = restTemplate.getForEntity(builder.toUriString(), List.class);
        return response.getBody();
    }

    public Map<String, Object> get_report(String ndbno) {
        String base_url = get_url("food/"+ndbno);
        ResponseEntity<Map> response = restTemplate.getForEntity(base_url, Map.class);
        return response.getBody();
    }

    // ...

public List<Map<String, Object>> get_nutrients(String ndbno) {
    Map<String, Object> report = get_report(ndbno);
    return (List<Map<String, Object>>) report.get("foodNutrients");
}

public Map<String, Double> get_measures(String ndbno) {
    Map<String, Object> report = get_report(ndbno);
    List<Map<String, Object>> foodPortions = (List<Map<String, Object>>) report.get("foodPortions");

    Map<String, Double> measures = new HashMap<>();
    for (Map<String, Object> portion : foodPortions) {
        measures.put((String) portion.get("portionDescription"), (Double) portion.get("gramWeight"));
    }

    return measures;
}

public List<Map<String, Object>> calculate_nutrients(String ndbno, String portion_description) {
    Map<String, Object> report = get_report(ndbno);
    List<Map<String, Object>> foodNutrients = (List<Map<String, Object>>) report.get("foodNutrients");
    List<Map<String, Object>> foodPortions = (List<Map<String, Object>>) report.get("foodPortions");

    // Find the chosen portion and its gram weight
    Map<String, Object> chosen_portion = null;
    for (Map<String, Object> portion : foodPortions) {
        if (portion.get("portionDescription").equals(portion_description)) {
            chosen_portion = portion;
            break;
        }
    }

    if (chosen_portion == null) {
        return null; // Portion description not found
    }

    double chosen_gram_weight = (Double) chosen_portion.get("gramWeight");

    // Calculate nutrients for the chosen portion
    List<Map<String, Object>> nutrients_for_chosen_portion = new ArrayList<>();
    for (Map<String, Object> nutrient : foodNutrients) {
        Map<String, Object> nutrientData = (Map<String, Object>) nutrient.get("nutrient");
        String nutrient_name = (String) nutrientData.get("name");
        String nutrient_unit = (String) nutrientData.get("unitName");
        double nutrient_amount_per_100g = (Double) nutrient.get("amount");

        // Convert nutrient amount to per gram
        double nutrient_amount_per_gram = nutrient_amount_per_100g / 100;

        double nutrient_amount_for_chosen_portion = nutrient_amount_per_gram * chosen_gram_weight;
        Map<String, Object> nutrientForPortion = new HashMap<>();
        nutrientForPortion.put("intake", nutrient_amount_for_chosen_portion);
        nutrientForPortion.put("label", nutrient_name);
        nutrientForPortion.put("unit", nutrient_unit);

        nutrients_for_chosen_portion.add(nutrientForPortion);
    }

    return nutrients_for_chosen_portion;
}

}

