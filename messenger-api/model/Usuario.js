const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Usuario = connection.define('Usuario', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: { 
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuario.sync();

module.exports = Usuario;