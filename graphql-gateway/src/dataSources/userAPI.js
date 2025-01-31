const axios = require("axios");

class UserAPI {
  async getUsers() {
    const response = await axios.get(
      `${process.env.USER_API}/api/users/allusers`
    );
    if (!response || !response.data) {
      throw new Error("Failed to fetch users");
    }
    return response.data;
  }

  async getUser(userId) {
    const response = await axios.get(
      `${process.env.USER_API}/api/users/find/${userId}`
    );
    if (!response || !response.data) {
      throw new Error(`Failed to fetch user with ID: ${userId}`);
    }
    return response.data;
  }

  async registerUser(input) {
    const response = await axios.post(
      `${process.env.USER_API}/api/users/register`,
      input
    );
    if (!response || !response.data) {
      throw new Error("Failed to register user");
    }
    return response.data;
  }

  async loginUser(input) {
    const response = await axios.post(
      `${process.env.USER_API}/api/users/login`,
      input
    );
    if (!response || !response.data) {
      throw new Error("Failed to login user");
    }
    return response.data;
  }
}

module.exports = new UserAPI();
