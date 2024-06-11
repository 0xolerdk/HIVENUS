import axios from 'axios';

const DailyLogService = {
  BASE_URL: 'http://localhost:8080',


  async getProductsByDate(date, token) {
    const response = await axios.get(
      `${this.BASE_URL}/products/date?date=${date}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  },
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
  async getWaterDataByDate(date, token) {
    const response = await axios.get(
      `${this.BASE_URL}/waterintakes/date?date=${date}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  },

  async addLog(data, token) {
    const response = await axios.post(`${this.BASE_URL}/dailylogs`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
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
  },

  async deleteLog(productId, date, token) {
    const response = await axios.delete(
      `${this.BASE_URL}/dailylogs/date?date=${date}&productId=${productId}`,
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
