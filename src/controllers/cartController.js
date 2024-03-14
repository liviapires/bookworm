const clientInfo = [
    {
        name: 'João',
        email: 'xx@a.com',
        cpf: '111.111.111-0',
        genre: 'M',
        birthDate: '01/01/1990',
        ddd: '11',
        phone: '1111-1111',
        phoneType: 'C',
    }
]

const cartoes = [
    {
        image: 'https://www.svgrepo.com/show/528100/card.svg',
        cardNumber: '1111 1111 1111 1111',
        cardName: 'João',
        cardExpiration: '01/2020',
        cardCvv: '111'
    }
]

const endereco = [
    {
        cep: '11111-111',
        street: 'Rua 1',
        number: '111',
        complement: 'Casa',
        neighborhood: 'Bairro 1',
        city: 'Cidade 1',
        state: 'SP'
    }
]


const Book = require('../models/BookModel');

const aBook = new Book();

let total = 0;

// Renderiza a view cart
async function cartView(req, res) {
    let cart = req.session.cart || [];

    let total = req.session.total || 0;

    res.render('cart', {
        title: 'Carrinho',
        cart: cart,
        total: total
    });
}

const cartContinueView = (req, res) => {

    let livros = req.session.cart || [];

    let total = req.session.total || 0;

    let cartoes = req.session.cartoes || [];

    let frete = req.session.frete || 0;

    let precoFinal = total;

    let precoFinalComFrete = total + frete;

    res.render('cartContinue', {
        title: 'Carrinho',
        livros: livros,
        precoFinal: precoFinal,
        cartoes: cartoes,
        frete: frete,
        precoFinalComFrete: precoFinalComFrete,
    });
}

// cartCheckoutView

async function cartCheckoutView(req, res) {

    let livros = req.session.cart || [];

    let total = req.session.total || 0;

    let frete = 7.4;

    let precoFinal = total;

    let precoFinalComFrete = total + frete;

    res.render('cartCheckout', {
        title: 'Carrinho',
        clientInfo: clientInfo,
        endereco: endereco,
        livros: livros,
        total: total,
        cartoes: cartoes,
        frete: frete,
        precoFinal: precoFinal,
        precoFinalComFrete: precoFinalComFrete
    });
}

// finishPurchase
async function finishPurchase(req, res) {

    res.render('finishPurchase', {
        title: 'Compra Realizada'
    });
}

// add book to cart function
async function addToCart (req, res) {
    // zerar o total
    total = 0;

    let id = req.body.id;

    let livros = await aBook.getBookById(id);

    let cart = req.session.cart || [];

    livros.forEach(livro => {
        const livroNoCarrinho = cart.find(item => item.bookId === livro.bookId);

        if (livroNoCarrinho) {
            livroNoCarrinho.quantity++;
            livroNoCarrinho.bookSubtotal = livroNoCarrinho.quantity * livroNoCarrinho.price;
        } else {
            cart.push({ ...livro, quantity: 1, bookSubtotal: livro.price });
        }

        total += Number(livro.price);
    });

    req.session.total = total;

    req.session.cart = cart;

    res.redirect('/cart');
}

module.exports = {
    cartView,
    cartContinueView,
    cartCheckoutView,
    finishPurchase,
    addToCart
}