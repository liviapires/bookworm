const Sequelize = require('sequelize');

// sequelize order (databaseName, user, password, options)

const componentSequelize = new Sequelize("teste", "teste", "teste123@", {
    dialect: "mysql",
    host: "localhost",
    port: 3307
});

module.exports = componentSequelize;