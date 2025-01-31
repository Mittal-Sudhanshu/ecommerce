const userAPI = require("../dataSources/userAPI");

const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await userAPI.getUsers();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_, { id }) => {
      try {
        return await userAPI.getUser(id);
      } catch (error) {
        throw new Error(`Failed to fetch user with ID: ${id}`);
      }
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        return await userAPI.registerUser(input);
      } catch (error) {
        throw new Error("Failed to register user");
      }
    },
    loginUser: async (_, { input }) => {
      try {
        return await userAPI.loginUser(input);
      } catch (error) {
        throw new Error("Failed to login user");
      }
    },
  },
};

module.exports = userResolvers;
