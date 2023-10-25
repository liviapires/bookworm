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
    res.render('cartContinue', {
        title: 'Carrinho',
        livros: livros,
        precoFinal: precoFinal,
        cartoes: cartoes,
        frete: frete,
        precoFinalComFrete: precoFinalComFrete,
    });
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
    addToCart,
    cartContinueView
}