import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Import local files
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import User from './models/user.js';

// 1. Database Connection Logic
const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to MongoDB...')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.log('❌ Error connecting to MongoDB:', error.message))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // 2. Setup WebSocket Server for Subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql', // Matched to the middleware path
  })
  
  const serverCleanup = useServer({ schema }, wsServer)

  // 3. Setup Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  // --- NEW: ROOT REDIRECT ---
  // This prevents the "Cannot GET /" error on EC2.
  app.get('/', (req, res) => {
    res.redirect('/graphql')
  })

  // 4. Apply Middlewares
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          try {
            const token = auth.substring(7)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
          } catch (error) {
            console.error('JWT Verification Error:', error.message)
            return { currentUser: null }
          }
        }
        return { currentUser: null }
      },
    }),
  )

  // 5. EC2/Production Listen Logic
  const PORT = process.env.PORT || 4000
  
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
    console.log(`🏠 Root redirected to Sandbox: http://localhost:${PORT}/`)
   
console.log(`📡 On EC2, use your Public IP: http://${process.env.PUBLIC_IP}:${process.env.PORT}/`)
  })
}

start()