const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): LoginResponse
    createProduct(input: ProductInput!): Product
    placeOrder(input: OrderInput!): Order
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    userId: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginUser {
    name: String!
    email: String!
    userId: ID!
  }

  type LoginResponse {
    user: LoginUser!
    token: String!
  }

  type Product {
    _id: ID!
    name: String!
    price: Float!
    quantity: Int!
    productId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    _id: ID!
    user_Id: OrderUser! # Changed to User type
    product_Id: ID!
    quantity: Int!
    order_Id: String!
    createdAt: String!
    updatedAt: String!
  }

  type OrderUser {
    _id: ID!
    name: String!
    email: String!
    userId: String!
    address: Address!
    createdAt: String!
    updatedAt: String!
  }

  type Address {
    street: String
    city: String
    state: String
    zip: Int
  }
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    role: String!
    street: String
    city: String
    state: String
    zip: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    price: Float!
    quantity: Int!
  }

  input OrderInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
