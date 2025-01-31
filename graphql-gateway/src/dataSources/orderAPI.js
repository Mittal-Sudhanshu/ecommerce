const axios = require("axios");

class OrderAPI {
  async getOrders() {
    const response = await axios.get(
      `${process.env.ORDER_API}/api/orders/getall`
    );
    if (!response || !response.data) {
      throw new Error("No orders found  ");
    }
    return response.data;
  }

  async getOrder(id) {
    const response = await axios.get(
      `${process.env.ORDER_API}/api/orders/get/${id}`
    );
    if (!response || !response.data) {
      throw new Error("No order found");
    }
    return response.data;
  }

  async createOrder(input, token) {
    const response = await axios.post(
      `${process.env.ORDER_API}/api/orders/create`,
      input,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response || !response.data) {
      throw new Error("Failed to create order");
    }
    return response.data;
  }
}

module.exports = new OrderAPI();
