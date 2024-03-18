let pedidos = [
    {
        id: '1',
        livros: ['O Hobbit', 'O Senhor dos Anéis', 'O Silmarillion'],
        livrosImagens: ['https://www.lojadobolseiro.com.br/uploads/images/2020/02/76-livro-o-hobbit-capa-smaug-j-r-r-tolkien-1582738560.jpg', 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg', 'https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF894,1000_QL80_.jpg'],
        situacao: 'Em andamento',
        dataPedido: '15/10/2020',
        total: 'R$ 150,00'
    },
    {
        id: '2',
        livros: ['O Silmarillion'],
        livrosImagens: ['https://m.media-amazon.com/images/I/71mWHFvaZ5L._AC_UF894,1000_QL80_.jpg'],
        situacao: 'Entregue',
        dataPedido: '10/10/2020',
        total: 'R$ 50,00'
    },
    {
        id: '3',
        livros: ['O Hobbit', 'O Senhor dos Anéis'],
        livrosImagens: ['https://www.lojadobolseiro.com.br/uploads/images/2020/02/76-livro-o-hobbit-capa-smaug-j-r-r-tolkien-1582738560.jpg', 'https://m.media-amazon.com/images/I/51yxqpcD9iL._SX327_BO1,204,203,200_.jpg'],
        situacao: 'Em Troca',
        dataPedido: '05/10/2020',
        total: 'R$ 100,00'
    }
]

const Client = require('../models/ClientModel');

const aClient = new Client();

// Renderiza a view myAccount
async function myAccountView (req, res) {

    const cliente = await aClient.getClientById(4);

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

    res.render('myAccount', {
        title: 'Minha Conta',
        cliente: cliente,
        pedidos: pedidos
    });
}

// Renderiza a view addresses
const addressesView = (req, res) => {
    res.render('addresses', {
        title: 'Endereços'
    });
}

const cardsView = (req, res) => {
    res.render('cards', {
        title: 'Cartões'
    });
}

module.exports = {
    myAccountView,
    addressesView,
    cardsView
}