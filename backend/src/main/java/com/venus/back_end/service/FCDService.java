package com.venus.back_end.service;

import com.venus.back_end.entity.Product;
import com.venus.back_end.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FCDService {

    @Value("${fcd.api.key}")
    private String apiKey;

    @Value("${fcd.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private ProductRepository productRepository;

    private String getUrl(String command) {
        return UriComponentsBuilder.fromHttpUrl(apiUrl + command)
                .queryParam("api_key", apiKey)
                .toUriString();
    }

    public List<Map<String, Object>> find(String name) {
        String url = getUrl("foods/search") + "&query=" + name;
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return (List<Map<String, Object>>) response.get("foods");
    }

    public Map<String, Object> getReport(String ndbno) {
        String url = getUrl("food/" + ndbno);
        return restTemplate.getForObject(url, Map.class);
    }

    public List<Map<String, Object>> getNutrients(String ndbno) {
        Map<String, Object> report = getReport(ndbno);
        return (List<Map<String, Object>>) report.get("foodNutrients");
    }

    public Map<String, Double> getMeasures(String ndbno) {
        Map<String, Object> report = getReport(ndbno);
        List<Map<String, Object>> portions = (List<Map<String, Object>>) report.get("foodPortions");
        Map<String, Double> measures = new HashMap<>();
        for (Map<String, Object> portion : portions) {
            String portionDescription = (String) portion.get("portionDescription");
            if (portionDescription != null) {
                measures.put(portionDescription, ((Number) portion.get("gramWeight")).doubleValue());
            }
        }
        return measures;
    }

    public List<Map<String, Object>> calculateNutrients(String ndbno, String portionDescription, double quantity) {
        Map<String, Object> report = getReport(ndbno);
        List<Map<String, Object>> nutrients = (List<Map<String, Object>>) report.get("foodNutrients");
        List<Map<String, Object>> portions = (List<Map<String, Object>>) report.get("foodPortions");

        Map<String, Object> chosenPortion = portions.stream()
                .filter(portion -> portionDescription.equals(portion.get("portionDescription")))
                .findFirst()
                .orElse(null);

        if (chosenPortion == null) {
            throw new IllegalArgumentException("Portion description not found");
        }

        double chosenGramWeight = ((Number) chosenPortion.get("gramWeight")).doubleValue();

        for (Map<String, Object> nutrient : nutrients) {
            double amountPer100g = ((Number) nutrient.get("amount")).doubleValue();
            double amountPerGram = amountPer100g / 100;
            double amountForChosenPortion = amountPerGram * chosenGramWeight * quantity;
            nutrient.put("intake", amountForChosenPortion);
        }

        return nutrients;
    }

    public List<Map<String, Object>> calculateNutrientsGram(String ndbno, double grams) {
        Map<String, Object> report = getReport(ndbno);
        List<Map<String, Object>> nutrients = (List<Map<String, Object>>) report.get("foodNutrients");

        for (Map<String, Object> nutrient : nutrients) {
            double amountPer100g = ((Number) nutrient.get("amount")).doubleValue();
            double amountPerGram = amountPer100g / 100;
            double amountForGivenGrams = amountPerGram * grams;
            nutrient.put("intake", amountForGivenGrams);
        }

        return nutrients;
    }

    public Map<String, Double> calculateDailyNutrients(LocalDate date, List<Product> products) {
        Map<String, Double> totalNutrients = new HashMap<>();
        if (products == null || products.isEmpty()) {
            return totalNutrients;
        }


        for (Product product : products) {
            String ndbno = product.getFdcId();
            double quantity = product.getQuantity();
            double gram = product.getGram();
            String portionDescription = product.getPortion();

            List<Map<String, Object>> nutrients;
            if (gram > 0) {
                nutrients = calculateNutrientsGram(ndbno, gram * quantity);
            } else if (portionDescription != null) {
                nutrients = calculateNutrients(ndbno, portionDescription, quantity);
            } else {
                throw new IllegalArgumentException("Invalid product data");
            }

            for (Map<String, Object> nutrient : nutrients) {
                Map<String, Object> nutrientDetails = (Map<String, Object>) nutrient.get("nutrient");
                String label = (String) nutrientDetails.get("name");
                if (label != null) {
                    double intake = ((Number) nutrient.get("intake")).doubleValue();
                    totalNutrients.put(label, totalNutrients.getOrDefault(label, 0.0) + intake);
                }
            }
        }
        return totalNutrients;
    }
}
