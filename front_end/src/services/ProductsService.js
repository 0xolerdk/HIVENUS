import axios from 'axios';

const ProductsService = {
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
  async addProductByDate(date, data, token) {
    const response = await axios.post(`${this.BASE_URL}/products/date?date=${date}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  },
  async deleteProductByDate(productId, date, token) {
    const response = await axios.delete(
      `${this.BASE_URL}/products/date?date=${date}&productId=${productId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  },



  // async addLog(data, token) {
  //   const response = await axios.post(`${this.BASE_URL}/dailylogs`, data, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     }
  //   });
  //   return response;
  // },

  // async getLogByDate(date, token) {
  //   const response = await axios.get(
  //     `${this.BASE_URL}/dailylogs/date?date=${date}`,
  //     {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     }
  //   );
  //   return response;
  // },


};

export default ProductsService;
