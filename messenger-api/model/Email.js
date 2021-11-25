const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Email = connection.define('Email', {
    assunto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: { 
        type: Sequelize.STRING
    },
    visualizado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Email.belongsTo(connection.models.Usuario, {as: 'destinatario'})
Email.belongsTo(connection.models.Usuario, {as: 'remetente'})

Email.sync();

module.exports = Email;