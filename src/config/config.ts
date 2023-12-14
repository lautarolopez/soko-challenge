export const config = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mongodb',
  NODE_ENV: process.env.NODE_ENV || 'development',
}
