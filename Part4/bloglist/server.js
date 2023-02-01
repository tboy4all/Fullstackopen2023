const config = require('./utils/config')
const logger = require('./utils/logger')

const app = require('./app')

app.listen(config.port, () => {
  // console.log(`App running on port ${config.port}...`)
  logger.info(`App running on port ${config.port}...`)
})
