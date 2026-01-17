const mongoose = require('mongoose')
// We don't need to pass 'uri' as a parameter anymore
const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI
  
  console.log('connecting to database...')

  if (!uri) {
    console.error('❌ MONGODB_URI is missing from process.env!')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('✅ connected to MongoDB')
  } catch (error) {
    console.log('❌ error connection to MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectToDatabase