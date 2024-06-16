import axios from "axios";
import AuthService from "./AuthService";

const WaterIntakeService = {
  BASE_URL: "http://localhost:8080",
  cache: {},

  async getWaterDataByDate(date) {
    // Check cache
    if (this.cache[date]) {
      return this.cache[date];
    }

    const response = await axios.get(
        `${this.BASE_URL}/waterintakes/date?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        }
    );

    // Store in cache
    this.cache[date] = response;
    return response;
  },

  async deleteWaterDataById(id, date) {
    const response = await axios.delete(
        `${this.BASE_URL}/waterintakes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        }
    );

    // Invalidate cache
    if (date) {
      delete this.cache[date];
    }
    return response;
  },

  async createWaterDataByDate(data) {
    const date = data.date; // Assuming the data contains the date
    const response = await axios.post(`${this.BASE_URL}/waterintakes/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`
      }
    });

    // Invalidate cache
    delete this.cache[date];
    return response;
  },
};

export default WaterIntakeService;
