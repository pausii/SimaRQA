require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DEVELOPMENT_USERNAME,
    password: process.env.DEVELOPMENT_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00' // Use GMT+7 timezone offset
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00' // Use GMT+7 timezone offset
  },
  production: {
    username: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00' // Use GMT+7 timezone offset
  }
};
