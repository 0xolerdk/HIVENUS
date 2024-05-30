import axios from 'axios';

const DailyLogService = {
  BASE_URL: 'http://localhost:8080',

  async addLog(data, token) {
    const response = await axios.post(`${this.BASE_URL}/dailylogs`, data,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }});
    return response;
  },

  async getLogByDate(date, token) {
    const response = await axios.get(
      `${this.BASE_URL}/dailylogs/date?date=${date}`, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  }
};

export default DailyLogService;
