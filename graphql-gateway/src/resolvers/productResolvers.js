const productAPI = require("../dataSources/productAPI");

const productResolvers = {
  Query: {
    products: async () => {
      try {
        return await productAPI.getProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    },
    product: async (_, { id }) => {
      try {
        return await productAPI.getProduct(id);
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw new Error("Failed to fetch product");
      }
    },
  },
  Mutation: {
    createProduct: async (_, { input }, { token }) => {
      try {
        return await productAPI.createProduct(input, token);
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
    },
  },
};

module.exports = productResolvers;
