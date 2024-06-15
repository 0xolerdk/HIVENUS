import axios from "axios";
import AuthService from "./AuthService";

const ProductsService = {
  BASE_URL: "http://localhost:8080",

  async getWaterDataByDate(date) {
    const response = await axios.get(
      `${this.BASE_URL}/waterintakes/date?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      }
    );
    return response;
  },
  async deleteWaterDataById(id) {
    const response = await axios.delete(
      `${this.BASE_URL}/waterintakes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`,
        },
      }
    );
    return response;
  },
  async createWaterDataByDate(data) {
    const response = await axios.post(`${this.BASE_URL}/waterintakes/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`
      }
    });
    return response;
  },
};

export default ProductsService;