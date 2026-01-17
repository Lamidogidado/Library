const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')

const Person = require('./models/person')
const User = require('./models/user')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI



const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async () => Person.find({}),
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: (root) => {
      return { street: root.street, city: root.city }
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addPerson: async (root, args) => {
      const person = new Person({ ...args })
      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error: error.message }
        })
      }
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) return null
      
      person.phone = args.phone
      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error: error.message }
        })
      }
      return person
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      // The context part is usually the next step in the tutorial!
    })
    console.log(`🚀 Server ready at ${url}`)
  } catch (error) {
    console.log('error:', error.message)
  }
}

start()