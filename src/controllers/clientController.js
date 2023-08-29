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

// create address
const createAddress = async (req, res) => {
    const address = new Address();

    address.street = req.body.street;
    address.number = req.body.number;
    address.complement = req.body.complement;
    address.neighborhood = req.body.neighborhood;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;

    try {
        const results = await address.create(address);

        res.status(201).json({
            message: "Endereço criado com sucesso!",
            address: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create phone
const createPhone = async (req, res) => {
    const phone = new Phone();

    phone.ddd = req.body.ddd;
    phone.number = req.body.number;
    phone.type = req.body.type;

    try {
        const results = await phone.create(phone);

        res.status(201).json({
            message: "Telefone criado com sucesso!",
            phone: results
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create a new client
const createClient = async (req, res) => {
    const client = new Client();

    let exists = true;

    let code = 0;
    
    do {
        // generate a new code
        code = Math.floor(Math.random() * 1000000);

        // verify if code exists
        const [results] = await client.getByCode(code);

        // if results null or empty, code not exists
        if (results == null || results == '') {
            exists = false;
        }

    } while (exists == true);

    client.code = code;
    client.name = req.body.name;
    client.birthDate = req.body.birthDate;
    client.gender = req.body.gender;
    client.cpf = req.body.cpf;
    client.email = req.body.email;

    // hash password
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(req.body.password, salt);

    // set ranking as the lowest
    client.ranking = 1;

    // set status as active
    client.status = 'Ativo';
    client.deleted = 0;

    // get current date and time
    const date = new Date();
    client.createdAt = date;

    // call createAddress function
    const address = await createAddress(req, res);

    // set address id
    client.addressesIds = address.id;

    // call createPhone function
    const phone = await createPhone(req, res);

    // set phone id
    client.phonesIds = phone.id;

    // set variables in model to create a new client
    try {
        const results = await client.create(client);

        res.status(201).json({
            message: "Cliente criado com sucesso!",
            client: results
        });
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
    getClientById,
    createClient,
    createAddress,
    createPhone
}