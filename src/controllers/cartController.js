const Book = require('../models/BookModel');
const Sale = require('../models/SaleModel');
const SaleBooks = require('../models/SaleBooksModel');

const moment = require('moment');

const aBook = new Book();
const aSale = new Sale();
const aSaleBooks = new SaleBooks();

let total = 0;

// Renderiza a view cart
async function cartView(req, res) {
    res.render('cart', {
        title: 'Carrinho',
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0
    });
}

async function cartContinueView (req, res) {
    res.render('cartContinue', {
        title: 'Carrinho',
        cliente: req.session.clientInfo || {},
        enderecos: req.session.addresses || [],
        telefones: req.session.phones || [],
        cartoes: req.session.cards || [],
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0,
        precoFinalComFrete: req.session.precoFinalComFrete || 0
    });
}

// cartCheckoutView

async function cartCheckoutView(req, res) {
    res.render('cartCheckout', {
        title: 'Carrinho',
        cliente: req.session.clientInfo || {},
        enderecos: req.session.addresses || [],
        telefones: req.session.phones || [],
        cartoes: req.session.cards || [],
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0,
        precoFinalComFrete: req.session.precoFinalComFrete || 0
    });
}

// finishPurchase
async function finishPurchase(req, res) {
    let cart = req.session.cart;
    let cards = req.session.cards;
    let addresses = req.session.addresses;
    let totalQuantity = 0;
    let cardId = 0;
    let addressId = 0;

    // generate a code for the sale considering the number of sales in the database with the length of the array + 1 and a bunch of zeros in front
    let sales = await aSale.getAllSales();
    let code = '0'.repeat(10 - (sales.length + 1).toString().length) + (sales.length + 1).toString();

    cart.forEach(livro => {
        totalQuantity = totalQuantity + livro.quantity;
    });

    addresses.forEach(address => {
        if (address.preferred) {
            addressId = address.addressId;
        }
    });
    
    let sale = {
        status: 'processing',
        code: code,
        purchaseDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        paymentMethod: 'card',
        totalQuantity: totalQuantity,
        totalValue: req.session.precoFinalComFrete,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.session.clientId,
        addressId: addressId
    }
    
    await aSale.createSale(sale);

    let theSale = await aSale.getSaleByCode(code);

    cards.forEach(card => {
        if (card.preferred) {
            cardId = card.cardId;
        }
    });

    cart.forEach(async livro => {
        console.log(livro);
        let saleBooks = {
            quantity: livro.quantity,
            unitValue: livro.price,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            saleId: theSale[0].saleId,
            bookId: livro.bookId
        }

        await aSaleBooks.createSaleBooks(saleBooks);
    });

    // limpar o carrinho
    req.session.cart = [];
    req.session.total = 0;
    req.session.frete = 0;
    req.session.precoFinalComFrete = 0;

    res.render('finishPurchase', {
        title: 'Compra Realizada',
        code: code
    });
}

// set frete
async function frete(req, res) {
    let { frete } = req.body;

    req.session.frete = parseFloat(frete);

    precoFinalComFrete = parseFloat(req.session.total) + req.session.frete;
    req.session.precoFinalComFrete = parseFloat((precoFinalComFrete).toFixed(2));

    res.redirect(req.get('referer'));
}

// set plus function to add 1 to the quantity of a book in the cart
async function plus (req, res) {

    let id = req.params.id;
    let cart = req.session.cart || [];

    // encontra o livro no carrinho
    let livro = cart.find(book => book.bookId == id);

    if (livro) {
        if (livro.quantity <= 9) {
            livro.quantity++;
            livro.bookSubtotal = parseFloat((livro.quantity * livro.price).toFixed(2));
            req.session.total = parseFloat((req.session.total + livro.price).toFixed(2));
            if (req.session.frete) {
                req.session.precoFinalComFrete = parseFloat((req.session.total + req.session.frete).toFixed(2));
            }
        }
    }

    req.session.cart = cart;


    res.redirect(req.get('referer'));
}

// set minus function to subtract 1 from the quantity of a book in the cart
async function minus (req, res) {

    let id = req.params.id;
    let cart = req.session.cart || [];

    let livro = cart.find(item => item.bookId == id);

    if (livro) {
        if (livro.quantity > 1) {
            livro.quantity--;
            livro.bookSubtotal = parseFloat((livro.quantity * livro.price).toFixed(2));
            req.session.total = parseFloat((req.session.total - livro.price).toFixed(2));
            if (req.session.frete) {
                req.session.precoFinalComFrete = parseFloat((req.session.total + req.session.frete).toFixed(2));
            }
        } else {
            cart = cart.filter(item => item.bookId != id);
            req.session.total = parseFloat((req.session.total - livro.price).toFixed(2));
            if (req.session.frete) {
                req.session.precoFinalComFrete = parseFloat((req.session.total + req.session.frete).toFixed(2));
            }
        }
    }

    req.session.cart = cart;

    res.redirect(req.get('referer'));
}

// add book to cart function
async function addToCart (req, res) {
    let id = req.body.id;
    let livros = await aBook.getBookById(id);
    let cart = req.session.cart || [];
    let total = req.session.total || 0;

    livros.forEach(livro => {
        const livroNoCarrinho = cart.find(item => item.bookId === livro.bookId);

        if (livroNoCarrinho) {
            livroNoCarrinho.quantity++;
            // atualiza o subtotal do livro com duas casas decimais
            livroNoCarrinho.bookSubtotal = parseFloat((livroNoCarrinho.quantity * livro.price).toFixed(2));
        } else {
            cart.push({ ...livro, quantity: 1, bookSubtotal: parseFloat((livro.price).toFixed(2)) });
        }

        // soma o subtotal do livro ao total se o carrinho não estiver vazio
        if (cart.length > 0) {
            total += parseFloat((livro.price).toFixed(2));
        } else {
            total = parseFloat((livro.price).toFixed(2));
        }
    });

    req.session.total = parseFloat((total).toFixed(2));

    let precoFinalComFrete = parseFloat(req.session.total) + req.session.frete;
    req.session.precoFinalComFrete = parseFloat((precoFinalComFrete).toFixed(2));

    req.session.cart = cart;

    res.redirect(req.get('referer'));
}

// empty cart function
async function emptyCart (req, res) {
    req.session.cart = [];
    req.session.total = 0;
    req.session.frete = 0;
    req.session.precoFinalComFrete = 0;
    res.redirect('/cart');
}

// remove book from cart function
async function removeFromCart (req, res) {
    let id = req.params.id;
    let cart = req.session.cart || [];

    let livro = cart.find(item => item.bookId == id);

    if (livro) {
        cart = cart.filter(item => item.bookId != id);
        req.session.total = parseFloat((req.session.total - livro.bookSubtotal).toFixed(2));
        if (req.session.frete) {
            req.session.precoFinalComFrete = parseFloat((req.session.total + req.session.frete).toFixed(2));
        }
    }

    req.session.cart = cart;

    res.redirect(req.get('referer'));
}

// toggle preferred card
async function togglePreferredCard(req, res) {
    let cardId = req.params.id;
    let cards = req.session.cards || [];

    cards.forEach(card => {
        if (card.cardId == cardId) {
            card.preferred = true;
        } else {
            card.preferred = false;
        }
    });

    req.session.cards = cards;

    res.redirect(req.get('referer'));
}

module.exports = {
    cartView,
    cartContinueView,
    cartCheckoutView,
    finishPurchase,
    addToCart,
    emptyCart,
    removeFromCart,
    frete,
    plus,
    minus,
    togglePreferredCard
}