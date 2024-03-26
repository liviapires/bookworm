const Sequelize = require('sequelize');

// sequelize order (databaseName, user, password, options)
const componentSequelize = new Sequelize("bookworm", "bookworm", "bookworm123@", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
});

module.exports = componentSequelize;