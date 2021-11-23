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
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuario.associate = (models) => {
    Usuario.hasMany(models.Email, {foreignKey: 'destinatario'})
    Usuario.hasMany(models.Email, {foreignKey: 'remetente'})
}

Usuario.sync();

module.exports = Usuario;