const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const dotenv=require('dotenv');
dotenv.config();


async function startServer() {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || ''; 
      return { token: token.replace('Bearer ', '') };
    },
  });
  
  await server.start(); // Wait for the server to start
  
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer().catch(err => {
  console.error('Error starting the server:', err);
});
