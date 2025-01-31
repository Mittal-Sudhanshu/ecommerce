# GraphQL Gateway

## Overview

The GraphQL Gateway provides a unified API for client interactions, aggregating data from all microservices.

### Key Features

- Unified GraphQL API for users, products, and orders
- JWT authentication verification
- Data aggregation from multiple microservices

## Technical Stack

- Node.js
- Apollo Server
- GraphQL

## Setup Instructions

### Local Development

1. Navigate to the graphql-gateway directory:

   ```
   cd graphql-gateway
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the graphql-gateway directory and add:

   ```
   PORT=4000
   USER_SERVICE_URL=http://localhost:5000
   PRODUCT_SERVICE_URL=http://localhost:5002
   ORDER_SERVICE_URL=http://localhost:5001
   ```

4. Start the gateway:
   ```
   npm start
   ```

### Docker Deployment

The gateway is automatically deployed when you run `docker-compose up` from the root directory. It will be available at `http://localhost:4000/graphql`.

### Queries

- **`users`:** Retrieve a list of all users

  ```graphql
  query {
    users {
      _id
      name
      email
      userId
      createdAt
      updatedAt
    }
  }
  ```

- **`user(id: ID!)`:** Get details of a specific user by their ID

  ```graphql
  query ($id: ID!) {
    user(id: $id) {
      _id
      name
      email
      userId
      createdAt
      updatedAt
    }
  }
  ```

- **`products`:** Retrieve a list of all products

  ```graphql
  query {
    products {
      _id
      name
      price
      quantity
      productId
      createdAt
      updatedAt
    }
  }
  ```

- **`product(id: ID!)`:** Get details of a specific product by its ID

  ```graphql
  query ($id: ID!) {
    product(id: $id) {
      _id
      name
      price
      quantity
      productId
      createdAt
      updatedAt
    }
  }
  ```

- **`orders`:** Retrieve a list of all orders

  ```graphql
  query {
    orders {
      _id
      user_Id {
        _id
        name
        email
        userId
        address {
          street
          city
          state
          zip
        }
        createdAt
        updatedAt
      }
      product_Id
      quantity
      order_Id
      createdAt
      updatedAt
    }
  }
  ```

- **`order(id: ID!)`:** Get details of a specific order by its ID
  ```graphql
  query ($id: ID!) {
    order(id: $id) {
      _id
      user_Id {
        _id
        name
        email
        userId
        address {
          street
          city
          state
          zip
        }
        createdAt
        updatedAt
      }
      product_Id
      quantity
      order_Id
      createdAt
      updatedAt
    }
  }
  ```

### Mutations

- **`registerUser(input: RegisterInput!): User`**  
  Register a new user by providing their details:

  ```graphql
  mutation ($input: RegisterInput!) {
    registerUser(input: $input) {
      _id
      name
      email
      userId
      address {
        street
        city
        state
        zip
      }
      createdAt
      updatedAt
    }
  }
  ```

- **`loginUser(input: LoginInput!): LoginResponse`**  
  Login a user with their email and password:

  ```graphql
  mutation ($input: LoginInput!) {
    loginUser(input: $input) {
      user {
        name
        email
        userId
      }
      token
    }
  }
  ```

- **`createProduct(input: ProductInput!): Product`**  
  Create a new product by providing its details:

  ```graphql
  mutation ($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      price
      quantity
      productId
      createdAt
      updatedAt
    }
  }
  ```

- **`placeOrder(input: OrderInput!): Order`**  
  Place an order by specifying the product ID and quantity:
  ```graphql
  mutation ($input: OrderInput!) {
    placeOrder(input: $input) {
      _id
      user_Id {
        _id
        name
        email
        userId
        address {
          street
          city
          state
          zip
        }
        createdAt
        updatedAt
      }
      product_Id
      quantity
      order_Id
      createdAt
      updatedAt
    }
  }
  ```

### Types

- **User**  
  Represents a user in the system.

  ```graphql
  type User {
    _id: ID!
    name: String!
    email: String!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }
  ```

- **LoginUser**  
  Represents a logged-in user.

  ```graphql
  type LoginUser {
    name: String!
    email: String!
    userId: ID!
  }
  ```

- **LoginResponse**  
  Represents the response after a successful login.

  ```graphql
  type LoginResponse {
    user: LoginUser!
    token: String!
  }
  ```

- **Product**  
  Represents a product in the catalog.

  ```graphql
  type Product {
    _id: ID!
    name: String!
    price: Float!
    quantity: Int!
    productId: String!
    createdAt: String!
    updatedAt: String!
  }
  ```

- **Order**  
  Represents an order placed by a user.

  ```graphql
  type Order {
    _id: ID!
    user_Id: OrderUser!
    product_Id: ID!
    quantity: Int!
    order_Id: String!
    createdAt: String!
    updatedAt: String!
  }
  ```

- **OrderUser**  
  Represents the user associated with an order.

  ```graphql
  type OrderUser {
    _id: ID!
    name: String!
    email: String!
    userId: String!
    address: Address!
    createdAt: String!
    updatedAt: String!
  }
  ```

- **Address**  
  Represents the user's address.
  ```graphql
  type Address {
    street: String
    city: String
    state: String
    zip: Int
  }
  ```

### Inputs

- **RegisterInput**  
  Input for registering a new user.

  ```graphql
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    street: String
    city: String
    state: String
    zip: Int
  }
  ```

- **LoginInput**  
  Input for user login.

  ```graphql
  input LoginInput {
    email: String!
    password: String!
  }
  ```

- **ProductInput**  
  Input for creating a new product.

  ```graphql
  input ProductInput {
    name: String!
    price: Float!
    quantity: Int!
  }
  ```

- **OrderInput**  
  Input for placing an order.
  ```graphql
  input OrderInput {
    productId: ID!
    quantity: Int!
  }
  ```

## Authentication

The gateway verifies JWT tokens for protected queries and mutations. Include the JWT in the Authorization header of your requests.
