const Email = require('../model/Email');
const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');
const getUserIdByToken = require('../helpers/TokenHelper');
const SECRET = '1234'

const includeAttributes = [{
    model: Usuario,
    as: 'destinatario'
},
{
    model: Usuario,
    as: 'remetente'
}]

const excludeAttributes = ['destinatarioId', 'remetenteId']

module.exports = {
    async findAllEnviados(req, res) {
        const token = req.headers['authorization']
        const userId = getUserIdByToken(token, SECRET)

        const emails = await Email.findAll({
            include: includeAttributes,
            attributes: {
                exclude: excludeAttributes
            },
            where: {
                remetenteId: userId
            }
        });
        return res.json({emails});
    },

    async findAllRecebidos(req, res) {
        const token = req.headers['authorization']
        const userId = getUserIdByToken(token, SECRET)

        const emails = await Email.findAll({
            include: includeAttributes,
            attributes: {
                exclude: excludeAttributes
            },
            where: {
                destinatarioId: userId
            }
        });
        return res.json({emails});
    },
    
    async insert(req, res) {
        try {
            const email = req.body;
            const emailInserido = await Email.create(email);
            return res.json(emailInserido);
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const email = await Email.findOne({ 
                include: includeAttributes,
                attributes: {
                    exclude: excludeAttributes
                },
                where: {id} })
            if (email) {
                return res.json(email);
            }
            return res.status(400).json({message: 'Email não encontrado'})
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    },

    async visualizarEmail(req, res) {
        try {
            const { id } = req.params;
            const email = await Email.update({visualizado: true}, { where: {id} })
            if (email) {
                return res.json(email);
            }
            return res.status(400).json({message: 'Email não encontrado'})
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    }
}