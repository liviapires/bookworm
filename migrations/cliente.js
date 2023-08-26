const Sequelize = require('sequelize');

const db = require('../config/db');

const Cliente = db.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
});

module.exports = Cliente;