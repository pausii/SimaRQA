require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conenction has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    }) 