const Email = require("./Email")
const Usuario = require("./Usuario")
const connection = require('../db/connection');

Email.belongsTo(connection.models.Usuario, {as: 'destinatario'})
Email.belongsTo(connection.models.Usuario, {as: 'remetente'})

Usuario.hasMany(connection.models.Email, {foreignKey: 'destinatario', as: 'recebidos'})
Usuario.hasMany(connection.models.Email, {foreignKey: 'remetente', as: 'enviados'})

Email.sync({force: true});

Usuario.sync({force: true});