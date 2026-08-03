const userModel = require('../models/userModel');

module.exports = {
    listarUsuarios: (req, res) => {
        const usuarios = userModel.getAll();
        res.json(usuarios);
    }
};