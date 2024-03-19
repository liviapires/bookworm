const Client = require('../models/ClientModel');
const Address = require('../models/AddressModel');
const Phone = require('../models/PhoneModel');
const Card = require('../models/CardModel');

const bcrypt = require('bcrypt');
const moment = require('moment');

const aClient = new Client();
const anAddress = new Address();
const aPhone = new Phone();
const aCard = new Card();

// create a new client
async function createClient (req, res) {

    // gera um código aleatório
    const code = Math.floor(Math.random() * 1000000);

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

    let client = {
        code: code,
        name: req.body.name,
        birthDate: birthDate,
        gender: req.body.gender,
        cpf: req.body.cpf,
        email: req.body.email,
        password: hashedPassword,
        ranking: ranking,
        active: active,
        createdAt: createdAt,
        updatedAt: updatedAt
    }
    
    await aClient.createClient(client);

    // get the id of the new client
    let clientId = await aClient.getClientId(client);

    clientId = clientId[0].clientId;

    let phone = {
        ddd: req.body.ddd,
        phoneNumber: req.body.phoneNumber,
        type: req.body.type,
        createdAt: createdAt,
        updatedAt: updatedAt,
        clientId: clientId
    }

    let address = {
        street: req.body.street,
        addressNumber: req.body.addressNumber,
        complement: req.body.complement,
        neighborhood: req.body.neighborhood,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode,
        observation: req.body.observation,
        createdAt: createdAt,
        updatedAt: updatedAt,
        clientId: clientId
    }

    let creditCard = {
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
        expirationDate: req.body.expiration,
        cardFlag: req.body.cardFlag,
        cvv: req.body.cvv,
        createdAt: createdAt,
        updatedAt: updatedAt,
        clientId: clientId
    }

    // create phone
    await aPhone.createPhone(phone);

    // create address
    await anAddress.createAddress(address);

    // create credit card
    await aCard.createCard(creditCard);

    // redirect to the home page
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
        id: client[0].clientId,
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

        // delete client's addresses
        await anAddress.deleteAddressByClientId(req.params.id);

        // delete client's phones
        await aPhone.deletePhoneByClientId(req.params.id);

        // delete client's cards
        await aCard.deleteCardByClientId(req.params.id);

        // delete client
        await aClient.deleteClient(req.params.id);
    
        // redirect to the clients page
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

async function editAddressView (req, res) {
    const address = await anAddress.getAddressByClientId(req.params.id);

    res.render('editAddress', {
        title: 'Editar Endereço',
        address: address
    });
}

async function editPhoneView (req, res) {
    const phone = await aPhone.getPhoneByClientId(req.params.id);

    res.render('editPhone', {
        title: 'Editar Telefone',
        phone: phone
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
    editAddressView,
    editPhoneView
}