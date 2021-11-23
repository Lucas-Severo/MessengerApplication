const Sequelize = require('sequelize');
const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'dbdistribuido.sqlite'
});

module.exports = connection;