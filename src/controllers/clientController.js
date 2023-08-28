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

// get one client by id
const getClientById = async (req, res) => {
    const client = new Client();

    try {
        const [clients] = await client.getById(req.params.id);
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create a new client
const create = async (req, res) => {
    const client = new Client();

    try {
        const { name, age } = req.body;

        const [clients] = await client.getAll();

        const client = await clients.findOne({
            where: {
                name: name
            }
        });

        res.status(200).json(client);
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
    getAllClients,
    getClientById
}