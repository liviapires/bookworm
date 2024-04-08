const Client = require('../models/UserModel');
const Phone = require('../models/PhoneModel');
const Address = require('../models/AddressModel');
const Card = require('../models/CardModel');
const Sale = require('../models/SaleModel');
const SaleCards = require('../models/SaleCardsModel');
const SaleBooks = require('../models/SaleBooksModel');

const aClient = new Client();
const aPhone = new Phone();
const anAddress = new Address();
const aCard = new Card();
const aSale = new Sale();
const theSaleCards = new SaleCards();
const theSaleBooks = new SaleBooks();

// Renderiza a view myAccount
async function myAccountView (req, res) {

    const clientId = req.session.clientId;

    const cliente = req.session.clientInfo;
    const clientPhones = req.session.phones;
    const clientAddresses = req.session.addresses;
    const clientCards = req.session.cards;

    const clientSales = await aSale.getSaleByUserId(clientId);
    const livros = [];

    clientSales.forEach(sale => {
        const saleBooks = theSaleBooks.getSaleBooksBySaleId(sale.saleId);
        console.log("SALEBOOKS", saleBooks);
        // resolve the promise
        saleBooks.then((result, index) => {
            livros.push(result[0]);
        });
    });

    // console.log(clientSales);
    // console.log(livros);

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


    res.render('myAccount', {
        title: 'Minha Conta',
        cliente: cliente,
        phones: clientPhones,
        addresses: clientAddresses,
        cards: clientCards,
        pedidos: clientSales,
        livros: livros
    });
}

module.exports = {
    myAccountView
}