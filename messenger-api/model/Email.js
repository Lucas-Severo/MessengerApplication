const Sequelize = require('sequelize');
const connection = require('../db/connection');
const Usuario = require('./Usuario')

const Email = connection.define('Email', {
    assunto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: { 
        type: Sequelize.STRING
    },
    destinatario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    remetente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
})

Email.sync();

module.exports = Email;