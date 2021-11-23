const Email = require('../model/Email');

module.exports = {
    async findAll(req, res) {
        const emails = await Email.findAll();
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
    }
}