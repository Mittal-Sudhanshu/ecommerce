# Product Service

## Overview
The Product Service manages product information and inventory within our microservices architecture.

### Key Features
- Product creation, updates, and deletions
- Inventory management
- Event emission for product-related actions
- Inventory update on receiving order related events

## Technical Stack
- Node.js
- Express.js
- MongoDB
- Kafka for event streaming

## Setup Instructions

### Local Development
1. Navigate to the product-service directory:
   ```
   cd product-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the product-service directory and add:
   ```
   PORT=5002
   MONGO_URL=mongodb://localhost:27017/product-db
   KAFKA_BROKER=localhost:29092
   ```

4. Start the service:
   ```
   npm start
   ```

### Docker Deployment
The service is automatically deployed when you run `docker-compose up` from the root directory. It will be available at `http://localhost:5002`.

## API Endpoints
- `POST /api/products/create`: Create a new product
- `GET /api/products/getallproducts/all`: Get all products
- `GET /api/products/get/:productId`: Get a specific product
- `PUT /api/products/updateprice/:productId"`: Update a product price
- `PUT /api/products/updateinventory/:productId`: Update product inventory

## Event Communication
This service emits the following Kafka events:
- "product-created": When a new product is added
- "inventory-updated": When product inventory is updated

This service listens for:
- "order-placed": To update inventory when an order is placed
