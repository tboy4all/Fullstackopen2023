const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 5000

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

const DB_TEST = process.env.TEST_MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

const MONGODB_URI = process.env.NODE_ENV === 'test' ? DB_TEST : DB

module.exports = {
  MONGODB_URI,
  port,
}
