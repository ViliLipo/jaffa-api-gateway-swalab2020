const Sequelize = require('sequelize');

const database = new Sequelize({
  dialect: 'sqlite', storage: './user_management.db',
});

module.exports = database;
