import axios from 'axios';
import DailyLogService from "./DailyLogService"

class FCD {
    static API_KEY = "FPSzFJBUD8wUKeGA5qaFggDIlu7k4pcN9mP6qdx7";
    static API_URL = "https://api.nal.usda.gov/fdc/v1/";

    static get_url(command) {
        return `${this.API_URL}${command}?api_key=${this.API_KEY}`;
    }

    static async find(name) {
        const url = `${this.get_url("foods/search")}&query=${name}`;
        const response = await axios.get(url);
        return response.data.foods;
    }

    static async get_report(ndbno) {
        const url = this.get_url(`food/${ndbno}`);
        const response = await axios.get(url);
        return response.data;
    }

    static async get_nutrients(ndbno) {
        const report = await this.get_report(ndbno);
        return report.foodNutrients;
    }

    static async get_measures(ndbno) {
        const report = await this.get_report(ndbno);
        return report.foodPortions.reduce((acc, curr) => {
            acc[curr.portionDescription] = curr.gramWeight;
            return acc;
        }, {});
    }

    static async calculate_nutrients(ndbno, portion_description, quantity) {
        const report = await this.get_report(ndbno);
        const food_nutrients = report.foodNutrients;
        const food_portions = report.foodPortions;

        const chosen_portion = food_portions.find(portion => portion.portionDescription === portion_description);
        if (!chosen_portion) {
            return "Portion description not found";
        }

        const chosen_gram_weight = chosen_portion.gramWeight;

        const nutrients_for_chosen_portion = food_nutrients.map(nutrient => {
            const nutrient_name = nutrient.nutrient.name;
            const nutrient_unit = nutrient.nutrient.unitName;
            const nutrient_amount_per_100g = nutrient.amount || 0;

            const nutrient_amount_per_gram = nutrient_amount_per_100g / 100;
            const nutrient_amount_for_chosen_portion = nutrient_amount_per_gram * chosen_gram_weight * quantity;

            return {
                intake: nutrient_amount_for_chosen_portion.toFixed(2),
                label: nutrient_name,
                unit: nutrient_unit
            };
        });

        return nutrients_for_chosen_portion;
    }

    static async calculate_nutrients_gram(ndbno, grams) {
        const report = await this.get_report(ndbno);
        const food_nutrients = report.foodNutrients;

        const nutrients_for_given_grams = food_nutrients.map(nutrient => {
            const nutrient_name = nutrient.nutrient.name;
            const nutrient_unit = nutrient.nutrient.unitName;
            const nutrient_amount_per_100g = nutrient.amount || 0;

            const nutrient_amount_per_gram = nutrient_amount_per_100g / 100;
            const nutrient_amount_for_given_grams = nutrient_amount_per_gram * grams;

            return {
                intake: nutrient_amount_for_given_grams.toFixed(2),
                label: nutrient_name,
                unit: nutrient_unit
            };
        });

        return nutrients_for_given_grams;
    }

    static async calculateDailyNutrients(date, token) {
        const response = await DailyLogService.getLogByDate(date, token);
        if (response.status !== 200) {
            throw new Error(`Error fetching log: ${response.statusText}`);
        }

        const logs = response.data;
        const nutrientPromises = logs.map(async (log) => {
            const productPromises = log.products.map(async (product) => {
                if (product.gram > 0) {
                    return await this.calculate_nutrients_gram(product.fdcId, product.gram);
                } else if (product.portion) {
                    return await this.calculate_nutrients(product.fdcId, product.portion, product.quantity);
                } else {
                    const servingSize = product.gram || product.servingSize;
                    return await this.calculate_nutrients_gram(product.fdcId, servingSize * product.quantity);
                }
            });

            const productNutrients = await Promise.all(productPromises);
            return productNutrients.flat();
        });

        const allNutrients = await Promise.all(nutrientPromises);

        const totalNutrients = allNutrients.flat().reduce((acc, nutrient) => {
            if (!acc[nutrient.label]) {
                acc[nutrient.label] = 0;
            }
            acc[nutrient.label] += parseFloat(nutrient.intake) || 0;
            return acc;
        }, {});

        console.log(totalNutrients)

        return totalNutrients;
    }
}

export default FCD;
