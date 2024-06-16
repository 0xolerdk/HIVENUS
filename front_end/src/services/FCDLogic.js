import axios from "axios";

class FCDService {
  static API_URL = process.env.REACT_APP_BACKEND_API_URL;
  static cache = {};

  static async find(name) {
    const url = `${this.API_URL}/find?name=${name}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async get_nutrients(ndbno) {
    const url = `${this.API_URL}/nutrients/${String(ndbno)}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async get_measures(ndbno) {
    const url = `${this.API_URL}/measures/${String(ndbno)}`;
    const response = await axios.get(url);
    return response.data;
  }

  static async calculate_nutrients(ndbno, portion_description, quantity) {
    const url = `${this.API_URL}/calculate-nutrients`;
    const response = await axios.post(url, {
      ndbno: String(ndbno),
      portion_description,
      quantity
    });
    return response.data;
  }

  static async calculate_nutrients_gram(ndbno, grams) {
    const url = `${this.API_URL}/calculate-nutrients-gram`;
    const response = await axios.post(url, {
      ndbno: String(ndbno),
      grams
    });
    return response.data;
  }

  static async fetchNutrientsForProducts(products, selectedProduct) {
    const nutrientPromises = products.map(async (product) => {
      let nutrientsArr;
      if (product.gram > 0) {
        nutrientsArr = await this.calculate_nutrients_gram(
            String(product.fdcId),
            product.gram * product.quantity
        );
      } else if (product.portion) {
        nutrientsArr = await this.calculate_nutrients(
            String(product.fdcId),
            product.portion,
            product.quantity
        );
      } else {
        const servingSize = product.gram || selectedProduct.servingSize;
        nutrientsArr = await this.calculate_nutrients_gram(
            String(product.fdcId),
            servingSize
        );
      }
      return nutrientsArr;
    });

    const allNutrients = await Promise.all(nutrientPromises);
    const totalNutrients = allNutrients.flat().reduce((acc, curr) => {
      if (acc[curr.nutrient.name]) {
        acc[curr.nutrient.name] += curr.intake;
      } else {
        acc[curr.nutrient.name] = curr.intake;
      }
      return acc;
    }, {});
    return totalNutrients;
  }

  static async calculateDailyNutrients(date) {
    // Check cache
    if (this.cache[date]) {
      return this.cache[date];
    }

    const response = await axios.get(`${this.API_URL}/calculate-daily-nutrients`, {
      params: { date },
    });

    // Store in cache
    this.cache[date] = response.data;
    return response.data;
  }
}

export default FCDService;
