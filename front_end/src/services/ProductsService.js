import axios from 'axios';
import AuthService from "./AuthService";
import FCDService from "./FCDLogic";

const ProductsService = {
  BASE_URL: 'http://localhost:8080',

  async getProductsByDate(date) {
    const response = await axios.get(
        `${this.BASE_URL}/products/date?date=${date}`,
        {
          headers: {
            'Authorization': `Bearer ${AuthService.getToken()}`
          }
        }
    );
    return response;
  },

  async addProductByDate(date, data) {
    const response = await axios.post(`${this.BASE_URL}/products/date?date=${date}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`
      }
    });

    if (response.status === 200) {
      await FCDService.invalidateCache(date); // Invalidate cache
    }

    return response;
  },

  async deleteProductByDate(productId, date) {
    const response = await axios.delete(
        `${this.BASE_URL}/products/date?date=${date}&productId=${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${AuthService.getToken()}`
          }
        }
    );

    if (response.status === 200) {
      await FCDService.invalidateCache(date); // Invalidate cache
    }

    return response;
  },
};

export default ProductsService;
