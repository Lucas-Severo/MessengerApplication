const jwt = require('jsonwebtoken');
const getUserIdByToken = require('../helpers/TokenHelper');
const Usuario = require('../model/Usuario');
const SECRET = '1234'

module.exports = {
    async findAll(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            return res.json({usuarios});
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    },
    
    async insert(req, res) {
        try {
            const usuario = req.body;
            await isUniqueEmail(req.body.email)

            const novoUsuario = await Usuario.create(usuario);
            return res.json(novoUsuario);
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const usuario = req.body;
        
        try {
            const novoUsuario = await Usuario.update(usuario, {
                where: {
                    id
                }
            });
            return res.json({ novoUsuario });
        } catch (err) {
            return res.status(400).send({error: 'id not found'});
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            await Usuario.destroy({
                where: {
                    id
                }
            });
            return res.status(204).send();
        } catch(err) {
            return res.status(400).send({error: 'id not found'});
        }
    },

    async findByEmailAndSenha(req, res) {
        const {email, senha} = req.body

        try {
            const usuario = await Usuario.findOne({where: {email, senha}})

            if (usuario) {
                const token = jwt.sign({userId: usuario.id}, SECRET, {expiresIn: 3000})
                return res.status(200).json({
                    token
                })
            }
            return res.status(401).json({
                message: "Email ou senha inválidos"
            })
        } catch(err) {
            return res.status(200).json({
                message: err.message
            })
        }
    },

    async findByEmail(req, res) {
        try {
            const { email } = req.params;
            const usuario = await Usuario.findOne({ where: {email} })
            if (usuario) {
                return res.json(usuario);
            }
            return res.status(400).json({message: 'Usuário não encontrado'})
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    },

    async findByToken(req, res) {
        try {
            const token = req.headers['authorization']
            const userId = getUserIdByToken(token, SECRET)
            
            if (userId) {
                const usuario = await Usuario.findOne({where: {id: userId}})
                return res.json(usuario);
            }
            return res.status(400).json({message: 'Usuário não encontrado'})
        } catch (ex) {
            return res.status(500).json({message: ex.message})
        }
    }
}

function isUniqueEmail(value) {
    return Usuario.findOne({where:{email:value}})
      .then((name) => {
        if (name) {
          throw new Error('Email já em uso');
        }
    })
}