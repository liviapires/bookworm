const Book = require('../models/BookModel');
const Client = require('../models/UserModel');
const Address = require('../models/AddressModel');
const Phone = require('../models/PhoneModel');
const Card = require('../models/CardModel');

const aBook = new Book();
const aClient = new Client();
const anAddress = new Address();
const aPhone = new Phone();
const aCard = new Card();

let total = 0;

// Renderiza a view cart
async function cartView(req, res) {

    let frete = req.session.frete || 0;

    let cart = req.session.cart || [];

    let total = req.session.total || 0;

    res.render('cart', {
        title: 'Carrinho',
        cart: cart,
        total: total,
        frete: frete
    });
}


async function cartContinueView (req, res) {
    let cliente = req.session.clientInfo || {};
    let enderecos = req.session.addresses || [];
    let telefones = req.session.phones || [];
    let cartoes = req.session.cards || [];

    let livros = req.session.cart || [];

    let total = parseFloat(req.session.total) || 0;
    let frete = parseFloat(req.session.frete) || 0;
    let precoFinalComFrete = total + frete;

    res.render('cartContinue', {
        title: 'Carrinho',
        cliente: cliente,
        enderecos: enderecos,
        telefones: telefones,
        cartoes: cartoes,
        livros: livros,
        total: total,
        frete: frete,
        precoFinalComFrete: precoFinalComFrete
    });

}

// cartCheckoutView

async function cartCheckoutView(req, res) {

    let clientInfo = req.session.clientInfo || {};
    let endereco = req.session.addresses || [];
    let telefone = req.session.phones || [];
    let cartoes = req.session.cards || [];

    let livros = req.session.cart || [];

    let total = req.session.total || 0;

    let frete = req.session.frete || 0;

    let precoFinalComFrete = total + frete;

    res.render('cartCheckout', {
        title: 'Carrinho',
        clientInfo: clientInfo,
        endereco: endereco,
        telefone: telefone,
        cartoes: cartoes,
        livros: livros,
        total: total,
        frete: frete,
        precoFinalComFrete: precoFinalComFrete
    });
}

// finishPurchase
async function finishPurchase(req, res) {

    res.render('finishPurchase', {
        title: 'Compra Realizada'
    });

}

// set frete
async function frete(req, res) {
    let { frete } = req.body;
    req.session.frete = parseFloat(frete);
    res.redirect(req.get('referer'));
}

// add book to cart function
async function addToCart (req, res) {
    let id = req.body.id;

    let livros = await aBook.getBookById(id);

    let cart = req.session.cart || [];

    livros.forEach(livro => {
        const livroNoCarrinho = cart.find(item => item.bookId === livro.bookId);

        if (livroNoCarrinho) {
            livroNoCarrinho.quantity++;
            // atualiza o subtotal do livro com duas casas decimais
            livroNoCarrinho.bookSubtotal = (livroNoCarrinho.quantity * livro.price).toFixed(2);
        } else {
            cart.push({ ...livro, quantity: 1, bookSubtotal: (livro.price).toFixed(2) });
        }

        // soma o subtotal do livro ao total se o carrinho não estiver vazio
        if (cart.length > 0) {
            total += livro.price;
        } else {
            total = livro.price;
        }
    });

    req.session.total = (total).toFixed(2);

    req.session.cart = cart;

    res.redirect(req.get('referer'));
}

// empty cart function
async function emptyCart (req, res) {
    req.session.cart = [];
    total = 0;
    req.session.total = total;
    req.session.frete = 0;
    res.redirect('/cart');
}

// remove book from cart function
async function removeFromCart (req, res) {
    let id = req.params.id;

    let cart = req.session.cart || [];

    let livro = cart.find(item => item.bookId === id);

    if (livro) {
        total -= livro.bookSubtotal;
        req.session.total = total;
        cart = cart.filter(item => item.bookId !== id);
    }

    req.session.cart = cart;

    res.redirect('/cart');
}

module.exports = {
    cartView,
    cartContinueView,
    cartCheckoutView,
    finishPurchase,
    addToCart,
    emptyCart,
    removeFromCart,
    frete
}