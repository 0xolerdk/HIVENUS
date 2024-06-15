import axios from "axios";
import AuthService from "./AuthService";

const SleepTrackService = {
    BASE_URL: 'http://localhost:8080',


  async getSleepDataByDate(date) {
    const response = await axios.get(
      `${this.BASE_URL}/sleeptracks/date?date=${date}`,
      {
        headers: {
          'Authorization': `Bearer ${AuthService.getToken()}`
        }
      }
    );
    return response;
  },
  async addSleepDataByDate(data) {
    const response = await axios.post(`${this.BASE_URL}/sleeptracks/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`
      }
    });
    return response;
  },

};
export default SleepTrackService;