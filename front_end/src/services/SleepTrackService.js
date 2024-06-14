import axios from "axios";

const SleepTrackService = {
    BASE_URL: 'http://localhost:8080',


  async getSleepDataByDate(date, token) {
    const response = await axios.get(
      `${this.BASE_URL}/sleeptracks/date?date=${date}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  },
  async addSleepDataByDate(data, token) {
    const response = await axios.post(`${this.BASE_URL}/sleeptracks/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  },

};
export default SleepTrackService;