const Client = require('../models/ClientModel');
const Address = require('../models/AddressModel');
const Phone = require('../models/PhoneModel');
const Card = require('../models/CardModel');
const { get } = require('../routes/clientRoutes');

const bcrypt = require('bcrypt');
const moment = require('moment');

const aClient = new Client();
const anAddress = new Address();
const aPhone = new Phone();
const aCard = new Card();

// get address by id
async function getAddressById (req, res) {
    try {
        let [address] = await anAddress.getAddressById(req.params.id);
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// get phone by id
async function getPhoneById (req, res) {
    try {
        let [phone] = await aPhone.getPhoneById(req.params.id);
        res.status(200).json(phone);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// create a new client
async function createClient (req, res) {
    
    // pega o email
    const email = req.body.email;

    // gera um código aleatório
    const code = Math.floor(Math.random() * 1000000);

    // pega o cpf
    const cpf = req.body.cpf;

    // codifica a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // faz o parse da data de nascimento
    const birthDate = moment(req.body.birthDate).format('YYYY-MM-DD HH:mm:ss');

    const ranking = 1;
    const active = 1;

    // date in mysql format
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

    const updatedAt = createdAt;

    let phone = {
        ddd: req.body.ddd,
        phoneNumber: req.body.phoneNumber,
        type: req.body.type,
        createdAt: createdAt,
        updatedAt: updatedAt,
    }

    let address = {
        street: req.body.street,
        addressNumber: req.body.addressNumber,
        complement: req.body.complement,
        neighborhood: req.body.neighborhood,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        cep: req.body.cep,
        observation: req.body.observation,
        createdAt: createdAt,
        updatedAt: updatedAt
    }

    let creditCard = {
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
        expirationDate: req.body.expiration,
        cardFlag: req.body.cardFlag,
        cvv: req.body.cvv,
        createdAt: createdAt,
        updatedAt: updatedAt
    }

    await aPhone.createPhone(phone);
    await anAddress.createAddress(address);
    await aCard.createCard(creditCard);

    // get phone id from phone table
    const phoneId = await aPhone.getPhoneId(phone);

    // get address id from address table
    const addressId = await anAddress.getAddressId(address);

    // get card id from card table
    const cardId = await aCard.getCardId(creditCard);

    let client = {
        code: code,
        name: req.body.name,
        birthDate: birthDate,
        gender: req.body.gender,
        cpf: cpf,
        email: email,
        password: hashedPassword,
        ranking: ranking,
        active: active,
        createdAt: createdAt,
        updatedAt: updatedAt,
        addressesIds: addressId[0].addressId,
        phonesIds: phoneId[0].phoneId,
        cardsIds: cardId[0].cardId
    }

    try {
        const newClient = await aClient.createClient(client);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

    res.redirect('/home');

}

// update a client

async function updateClient (req, res) {

    console.log(req.body);

    // get client by id
    let client = await aClient.getClientById(req.body.id);

    console.log(client);

    // get post data
    let birthDate = moment(req.body.birthDate).format('YYYY-MM-DD HH:mm:ss');

    let clientData = {
        id: client[0].id,
        name: req.body.name,
        birthDate: birthDate,
        gender: req.body.gender,
        cpf: req.body.cpf,
        email: req.body.email,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    // update client
    await aClient.updateClient(clientData);

    // redirect to the client page
    res.redirect(`/client/${req.body.id}`);
}
    
// delete a client and its dependencies
async function deleteClient (req, res) {
    try {

        // get client by id
        let [client] = await aClient.getClientById(req.params.id);

        // get address by id
        let [address] = await anAddress.getAddressById(client.addressesIds);

        // get phone by id
        let [phone] = await aPhone.getPhoneById(client.phonesIds);

        // get card by id
        let [card] = await aCard.getCardById(client.cardsIds);

        // delete client
        await aClient.deleteClient(req.params.id);

        // delete address
        await anAddress.deleteAddress(address.addressId);

        // delete phone
        await aPhone.deletePhone(phone.phoneId);

        // delete card
        await aCard.deleteCard(card.cardId);
        
        res.status(200).json({
            message: 'Cliente deletado com sucesso!'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

    res.redirect('/clients');
}

// Renderiza a view signin
const signinView = (req, res) => {
    res.render('signin', {
        title: 'Sign In'
    });
}

// Renderiza a view clients
async function clientsView (req, res) {

    const clients = await aClient.getAllClients();

    res.render('clients', {
        title: 'Clientes',
        clients: clients
    });
}

// Renderiza a view client
async function clientView (req, res) {
    
    const cliente = await aClient.getClientById(req.params.id);

    // get different image depending on the cardFlag

    if (cliente[0].cardFlag == 'Visa') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508730/visa-classic.svg';
    } else if (cliente[0].cardFlag == 'Mastercard') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508703/mastercard.svg';
    } else if (cliente[0].cardFlag == 'American Express') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508403/amex.svg';
    } else if (cliente[0].cardFlag == 'Elo') {
        cliente[0].cardFlag = 'https://www.svgrepo.com/show/508421/elo.svg';
    }

    // censor the credit card number

    let cardNumber = cliente[0].cardNumber;
    let censoredCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "*");
    cliente[0].cardNumber = censoredCardNumber;

    res.render('client', {
        title: cliente[0].name,
        cliente: cliente
    });
}

// Renderiza a view editClient

async function editClientView (req, res) {
    const cliente = await aClient.getClientById(req.params.id);

    res.render('editClient', {
        title: 'Editar Cliente',
        cliente: cliente
    });
}

module.exports = {
    signinView,
    clientsView,
    clientView,
    editClientView,
    createClient,
    deleteClient,
    updateClient,
    getAddressById,
    getPhoneById
}