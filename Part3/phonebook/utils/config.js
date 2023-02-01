const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 4000

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

module.exports = {
  DB,
  port,
}
