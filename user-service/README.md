
# User Service

## Overview
The User Service is responsible for user registration, authentication, and profile management and update  within our microservices architecture.

### Key Features
- User registration
- JWT-based authentication
- Profile management and Profile Update
- Event emission for user-related actions

## Technical Stack
- Node.js
- Express.js
- MongoDB
- Kafka for event streaming
- JWT for authentication


## Setup Instructions

### Local Development
1. Navigate to the user-service directory:
   ```
   cd user-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the user-service directory and add:
   ```
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/user-db
   KAFKA_BROKER=localhost:29092
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the service:
   ```
   npm start
   ```

### Docker Deployment
The service is automatically deployed when you run `docker-compose up` from the root directory. It will be available at `http://localhost:5000`.

## API Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate a user and receive a JWT
- `GET /api/users/find/:userId`: Get user profile by ID
- `PUT /api/users/update/:userId`: Update user profile by ID
- `GET /api/users/allusers`: Get all users 

## Event Communication
This service emits the following Kafka events:
- "user-registered": When a new user is registered
- "user-updated": When a user's profile is updated

