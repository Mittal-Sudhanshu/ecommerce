# Order Service

## Overview

The Order Service manages order creation and processing within our microservices architecture.

### Key Features

- Order creation and retrieval
- Event emission for order-related actions
- State management based on events from other services

## Technical Stack

- Node.js
- Express.js
- MongoDB
- Kafka for event streaming

## Setup Instructions

### Local Development

1. Navigate to the order-service directory:

   ```
   cd order-service
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the order-service directory and add:

   ```
   PORT=5001
   MONGO_URL=mongodb://localhost:27017/order-db
   KAFKA_BROKER=localhost:29092
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the service:
   ```
   npm start
   ```

### Docker Deployment

The service is automatically deployed when you run `docker-compose up` from the root directory. It will be available at `http://localhost:5001`.

## API Endpoints

- `POST /api/orders/create`: Place a new order
- `GET /api/orders/getall`: Get all orders
- `GET /api/orders/get/:orderId`: Get a specific order

## Event Communication

This service emits the following Kafka events:

- "order-placed": When an order is successfully placed

This service listens for:

- "user-registered": To maintain consistency with user data
- "user-updated": To maintain consistency with user data
- "product-created": To maintain consistency with available products
- "inventory-updated": To maintain consistency with product inventory
