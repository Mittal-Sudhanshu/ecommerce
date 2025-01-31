const axios = require("axios");

class ProductAPI {
  async getProducts() {
    const response = await axios.get(
      `${process.env.PRODUCT_API}/api/products/getallproducts/all`
    );
    if (!response || !response.data) {
      throw new Error(response.data.error);
    }
    return response.data;
  }

  async getProduct(id) {
    const response = await axios.get(
      `${process.env.PRODUCT_API}/api/products/get/${id}`
    );
    if (!response || !response.data) {
      throw new Error(response.data.error);
    }
    return response.data;
  }

  async createProduct(input, token) {
    const response = await axios.post(
      `${process.env.PRODUCT_API}/api/products/create`,
      input,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response || !response.data) {
      throw new Error(response.data.error);
    }
    return response.data;
  }
}

module.exports = new ProductAPI();
