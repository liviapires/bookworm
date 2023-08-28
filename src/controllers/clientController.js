const Client = require('../models/ClientModel');

// get all clients
const getAllClients = async (req, res) => {
    const client = new Client();

    try {
        const [clients] = await client.getAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create a new client
const createClient = async (req, res) => {
    const client = new Client();

    try {
        const [clients] = await client.getAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Renderiza a view signin
const signinView = (req, res) => {
    res.render('signin', {
        title: 'Sign In'
    });
}

module.exports = {
    signinView,
    getAllClients
}