const Client = require('../models/UserModel');
const Address = require('../models/AddressModel');
const Phone = require('../models/PhoneModel');
const Card = require('../models/CardModel');
const Sale = require('../models/SaleModel');
const saleBooks = require('../models/SaleBooksModel');
const Category = require('../models/CategoryModel');

const { updateCardValue } = require('./cartController');

const bcrypt = require('bcrypt');
const moment = require('moment');

const aClient = new Client();
const anAddress = new Address();
const aPhone = new Phone();
const aCard = new Card();
const aSale = new Sale();
const aSaleBooks = new saleBooks();
const aCategory = new Category();

// CLIENT CONTROLLERS

// create a new client
async function createClient (req, res) {

    // gera um código aleatório
    const code = Math.floor(Math.random() * 1000000);

    // codifica a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // faz o parse da data de nascimento
    const birthDate = moment(req.body.birthDate).format('YYYY-MM-DD HH:mm:ss');
    
    const admin = 0;
    const ranking = 1;
    const active = 1;
    const role = 'client';
    
    // date in mysql format
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    const updatedAt = createdAt;
    
    let client = {
        code: code,
        name: req.body.name,
        admin: admin,
        gender: req.body.gender,
        birthDate: birthDate,
        cpf: req.body.cpf,
        email: req.body.email,
        password: hashedPassword,
        ranking: ranking,
        role: role,
        active: active,
        createdAt: createdAt,
        updatedAt: updatedAt
    }
    
    await aClient.createUser(client);
    
    // get the id of the new client
    let clientId = await aClient.getClientId(client);
    
    clientId = clientId[0].userId;
    
    let phone = {
        ddd: req.body.ddd,
        phoneNumber: req.body.phoneNumber,
        phoneType: req.body.type,
        createdAt: createdAt,
        updatedAt: updatedAt,
        userId: clientId
    }
    
    const country = 'Brasil';

    let address = {
        residenceType: req.body.residenceType,
        street: req.body.street,
        number: req.body.addressNumber,
        neighborhood: req.body.neighborhood,
        zipCode: req.body.zipCode,
        city: req.body.city,
        state: req.body.state,
        country: country,
        complement: req.body.complement,
        notes: req.body.observation,
        preferred: 1,
        createdAt: createdAt,
        updatedAt: updatedAt,
        userId: clientId
    }

    // verifica se o cliente já tem um cartão preferido
    let preferred = 0;
    
    let cards = await aCard.getCardByUserId(clientId);

    if (cards.length == 0) {
        preferred = 1;
    } else {
        cards.forEach(card => {
            if (card.preferred == 1) {
                preferred = 0;
            } else {
                preferred = 1;
            }
        });
    }
    
    let creditCard = {
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
        cardFlag: req.body.cardFlag,
        securityCode: req.body.securityCode,
        expirationDate: req.body.expiration,
        preferred: preferred,
        createdAt: createdAt,
        updatedAt: updatedAt,
        userId: clientId
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
    // get post data
    let birthDate = moment(req.body.birthDate).format('YYYY-MM-DD HH:mm:ss');

    let clientData = {
        id: req.body.id,
        name: req.body.name,
        birthDate: birthDate,
        gender: req.body.gender,
        cpf: req.body.cpf,
        email: req.body.email,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    // update client
    await aClient.updateUser(clientData);

    // redirect to the client page
    res.redirect(`/client/${req.body.id}`);
}
    
// delete a client and its dependencies
async function deleteClient (req, res) {
    // delete client's sales books
    const sales = await aSale.getSaleByUserId(req.params.id);

    sales.forEach(async sale => {
        await aSaleBooks.deleteSaleBooksBySaleId(sale.saleId);
    });

    // delete client's sales
    await aSale.deleteSaleByUserId(req.params.id);

    // delete client's addresses
    await anAddress.deleteAddressByUserId(req.params.id);

    // delete client's phones
    await aPhone.deletePhoneByUserId(req.params.id);

    // delete client's cards
    await aCard.deleteCardByUserId(req.params.id);

    // delete client
    await aClient.deleteUser(req.params.id);

    // redirect to the clients page
    res.redirect('/clients');
}


// ADDRESS CONTROLLERS

// add a new address
async function createAddress (req, res) {

    // get post data
    let addressData = {
        residenceType: req.body.residenceType,
        street: req.body.street,
        number: req.body.addressNumber,
        neighborhood: req.body.neighborhood,
        zipCode: req.body.zipCode,
        city: req.body.city,
        state: req.body.state,
        country: 'Brasil',
        complement: req.body.complement,
        notes: req.body.observation,
        preferred: 0,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.body.userId
    }

    // create address
    await anAddress.createAddress(addressData);

    let addressId = await anAddress.getAddressIdByZipCodeAndNumber(addressData.zipCode, addressData.number);

    // put addressId in the addressData object
    addressData.addressId = addressId[0].addressId;

    // att the session addresses with the new address
    req.session.addresses.push(addressData);

    res.redirect(req.get('referer'));
}

// update a client's address
async function updateAddress (req, res) {

    // get post data
    let addressData = {
        addressId: req.body.id,
        residenceType: req.body.residenceType,
        street: req.body.street,
        number: req.body.addressNumber,
        neighborhood: req.body.neighborhood,
        zipCode: req.body.zipCode,
        city: req.body.city,
        state: req.body.state,
        country: 'Brasil',
        complement: req.body.complement,
        notes: req.body.observation,
        preferred: 0,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    // update address
    await anAddress.updateAddress(addressData);

    // redirect to the client page
    res.redirect(`/client/${req.body.id}`);
}

// delete a client's address
async function deleteAddress (req, res) {
    
    const cliente = await aClient.getClientByAddressId(req.params.id);

    // delete address
    await anAddress.deleteAddress(req.params.id);
    
    // redirect to the client page
    res.redirect(`/client/${cliente[0].userId}`);
}


// PHONE CONTROLLERS

// create a new phone
async function createPhone (req, res) {

    // get post data
    let phoneData = {
        ddd: req.body.ddd,
        phoneNumber: req.body.phone,
        phoneType: req.body.phoneType,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.body.userId
    }

    // create phone
    await aPhone.createPhone(phoneData);

    // redirect to the client page
    res.redirect(`/client/${req.body.userId}`);
}

// update a client's phone
async function updatePhone (req, res) {

    // get post data
    let phoneData = {
        phoneId: req.body.phoneId,
        ddd: req.body.ddd,
        phoneNumber: req.body.phone,
        phoneType: req.body.phoneType,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    // update phone
    await aPhone.updatePhone(phoneData);

    // redirect to the client page
    res.redirect(`/client/${req.body.userId}`);
}

// delete a client's phone
async function deletePhone (req, res) {
    const cliente = await aClient.getClientByPhoneId(req.params.id);

    // delete phone
    await aPhone.deletePhone(req.params.id);
    
    // redirect to the client page
    res.redirect(`/client/${cliente[0].userId}`);
}


// CARD CONTROLLERS

// create a new card
async function createCard (req, res) {

    // get post data
    let cardData = {
        cardNumber: req.body.cardNumber,
        cardName: req.body.cardName,
        cardFlag: req.body.cardFlag,
        securityCode: req.body.securityCode,
        expirationDate: req.body.expiration,
        preferred: 0,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.body.userId
    }

    // create card
    await aCard.createCard(cardData);

    let cardId = await aCard.getCardIdByCardNumber(cardData.cardNumber);

    // put cardId in the cardData object
    cardData.cardId = cardId[0].cardId;

    // att the session cards with the new card
    req.session.cards.push(cardData);
    
    if (req.session.useCards) {
        let cards = req.session.cards;
        let totalValue;

        if (req.session.useCoupon == 1) {
            totalValue = req.session.precoComCupom;
        } else {
            totalValue = req.session.precoFinalComFrete;
        }

        let quantidadeCartoes = cards.length;

        updateCardValue(totalValue, quantidadeCartoes, cards);
    }

    res.redirect(req.get('referer'));
}

// delete a client's card
async function deleteCard (req, res) {
    const cliente = await aClient.getClientByCardId(req.params.id);

    // delete card
    await aCard.deleteCard(req.params.id);
    
    // redirect to the client page
    res.redirect(`/client/${cliente[0].userId}`);
}

// VIEWS CONTROLLERS

// Renderiza a view signin
const signinView = (req, res) => {

    let categories = aCategory.getAllCategories();

    res.render('signin', {
        title: 'Sign In',
        categories: categories
    });
}

// Renderiza a view clients
async function clientsView (req, res) {

    const clients = await aClient.getAllClients();

    let categories = await aCategory.getAllCategories();

    res.render('clients', {
        title: 'Clientes',
        categories: categories,
        clients: clients
    });
}

// Renderiza a view client
async function clientView (req, res) {
    
    const cliente = await aClient.getClientById(req.params.id);
    const clientPhones = await aPhone.getPhoneByUserId(req.params.id);
    const clientAddresses = await anAddress.getAddressByUserId(req.params.id);
    const clientCards = await aCard.getCardByUserId(req.params.id);

    // get different image depending on the cardFlag

    clientCards.forEach(card => {
        if (card.cardFlag == 'Visa') {
            card.cardFlag = 'https://www.svgrepo.com/show/508730/visa-classic.svg';
        } else if (card.cardFlag == 'Mastercard') {
            card.cardFlag = 'https://www.svgrepo.com/show/508703/mastercard.svg';
        } else if (card.cardFlag == 'American Express') {
            card.cardFlag = 'https://www.svgrepo.com/show/508403/amex.svg';
        } else if (card.cardFlag == 'Elo') {
            card.cardFlag = 'https://www.svgrepo.com/show/508421/elo.svg';
        }
    });

    // censor the credit card number
    clientCards.forEach(card => {
        let cardNumber = card.cardNumber;
        let censoredCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "*");
        card.cardNumber = censoredCardNumber;
    });

    let categories = await aCategory.getAllCategories();

    res.render('client', {
        title: cliente[0].name,
        categories: categories,
        cliente: cliente,
        phones: clientPhones,
        addresses: clientAddresses,
        cards: clientCards
    });
}

// Renderiza a view editClient

async function editClientView (req, res) {
    const cliente = await aClient.getUserById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('editClient', {
        title: 'Editar Cliente',
        categories: categories,
        cliente: cliente
    });
}

async function editAddressView (req, res) {
    const address = await anAddress.getAddressByUserId(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('editAddress', {
        title: 'Editar Endereço',
        categories: categories,
        address: address
    });
}

async function editPhoneView (req, res) {
    const phone = await aPhone.getPhoneById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('editPhone', {
        title: 'Editar Telefone',
        categories: categories,
        phone: phone
    });
}

async function addPhoneView (req, res) {

    const cliente = await aClient.getUserById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('addPhone', {
        title: 'Adicionar Telefone',
        categories: categories,
        cliente: cliente
    });
}

async function addAddressView (req, res) {

    const cliente = await aClient.getUserById(req.params.id);

    let categories = await aCategory.getAllCategories();

    res.render('addAddress', {
        title: 'Adicionar Endereço',
        categories: categories,
        cliente: cliente
    });
}

async function addCardView (req, res) {

    const cliente = await aClient.getUserById(req.params.id);
    
    let categories = await aCategory.getAllCategories();

    res.render('addCard', {
        title: 'Adicionar Cartão',
        categories: categories,
        cliente: cliente
    });
}

module.exports = {
    createClient,
    createAddress,
    createPhone,
    createCard,
    updateClient,
    updateAddress,
    updatePhone,
    deleteClient,
    deleteAddress,
    deletePhone,
    deleteCard,
    signinView,
    clientsView,
    clientView,
    editClientView,
    editAddressView,
    editPhoneView,
    addPhoneView,
    addAddressView,
    addCardView
}