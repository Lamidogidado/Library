import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions'; // Use { PubSub }
import { GraphQLError } from 'graphql';

// IMPORT your models with the .js extension
import Book from './models/book.js';
import Author from './models/author.js';
import User from './models/user.js';

// Initialize PubSub correctly
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        query.author = author ? author._id : null
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }
      return Book.find(query).populate('author')
    },
    allAuthors: async () => {
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: (root) => root.books.length
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username, error }
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }
      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author, books: [] })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author, error }
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      
      try {
        await book.save()
        author.books = author.books.concat(book._id)
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title, error: error.message }
        })
      }

      const savedBook = await book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new GraphQLError('not authenticated')

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      return author.save()
    },

    deleteBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const book = await Book.findOne({ title: args.title })
      if (!book) return null

      await Author.findByIdAndUpdate(book.author, {
        $pull: { books: book._id }
      })

      return await Book.findOneAndDelete({ title: args.title })
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

export default resolvers;