import axios from "axios";

const ProductsService = {
  BASE_URL: "http://localhost:8080",

  async getWaterDataByDate(date, token) {
    const response = await axios.get(
      `${this.BASE_URL}/waterintakes/date?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
  async deleteWaterDataById(id, token) {
    const response = await axios.delete(
      `${this.BASE_URL}/waterintakes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },
  async createWaterDataByDate(data, token) {
    const response = await axios.post(`${this.BASE_URL}/waterintakes/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  },
};

export default ProductsService;