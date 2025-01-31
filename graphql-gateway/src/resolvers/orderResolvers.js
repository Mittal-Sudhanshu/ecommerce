const orderAPI = require("../dataSources/orderAPI");

const orderResolvers = {
  Query: {
    orders: async () => {
      try {
        return await orderAPI.getOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Failed to fetch orders.");
      }
    },
    order: async (_, { id }) => {
      try {
        return await orderAPI.getOrder(id);
      } catch (error) {
        console.error(`Error fetching order with id ${id}:`, error);
        throw new Error("Failed to fetch order.");
      }
    },
  },
  Mutation: {
    placeOrder: async (_, { input }, { token }) => {
      try {
        if (!token) {
          throw new Error("Unauthorized: Token not provided");
        }
        return await orderAPI.createOrder(input, token);
      } catch (error) {
        console.error("Error placing order:", error);
        throw new Error("Failed to place order. Please try again later.");
      }
    },
  },
};

module.exports = orderResolvers;
