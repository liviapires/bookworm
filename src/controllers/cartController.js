const Book = require('../models/BookModel');
const Sale = require('../models/SaleModel');
const SaleBooks = require('../models/SaleBooksModel');
const SaleAddresses = require('../models/SaleAddressesModel');
const SalePayment = require('../models/SalePaymentModel');

const moment = require('moment');

const aBook = new Book();
const aSale = new Sale();
const aSaleBooks = new SaleBooks();
const aSaleAddresses = new SaleAddresses();
const aSalePayment = new SalePayment();

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
        precoFinalComFrete: req.session.precoFinalComFrete || 0,
        useCards: req.session.useCards || 0,
        useCardsInfo: req.session.useCardsInfo || ''
    });
}

// cartCheckoutView

async function cartCheckoutView(req, res) {

    let useCards = req.session.useCards || 0;
    let cards = req.session.cards || [];

    if (useCards != 1) {
        cards.forEach(card => {
            if (card.preferred) {
                card.cardTotal = req.session.precoFinalComFrete.toFixed(2);
            }
        });
        // remove os cartões que não são preferidos
        cards = cards.filter(card => card.preferred == true);
    }

    console.log(cards);

    res.render('cartCheckout', {
        title: 'Carrinho',
        cliente: req.session.clientInfo || {},
        enderecos: req.session.addresses || [],
        telefones: req.session.phones || [],
        cartoes: cards || [],
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0,
        precoFinalComFrete: req.session.precoFinalComFrete || 0,
        useCards: useCards || 0,
        useCardsInfo: req.session.useCardsInfo || ''
    });
}

// finishPurchase
async function finishPurchase(req, res) {
    let cart = req.session.cart;
    let cards = req.session.cards;
    let cupons = req.session.cupons;
    let addresses = req.session.addresses;
    let totalQuantity = 0;
    let saleAddressInfo;
    let salePaymentInfo;

    // generate a code for the sale considering the number of sales in the database with the length of the array + 1 and a bunch of zeros in front
    let sales = await aSale.getAllSales();
    let code = '0'.repeat(10 - (sales.length + 1).toString().length) + (sales.length + 1).toString();

    cart.forEach(livro => {
        totalQuantity = totalQuantity + livro.quantity;
    });

    addresses.forEach(address => {
        if (address.preferred) {
            saleAddressInfo = address;
        }
    });

    if (saleAddressInfo.preferred == true) {
        saleAddressInfo.preferred = 1;
    }
    
    // save the address on the saleAddresses table
    let saleAddress = {
        residenceType: saleAddressInfo.residenceType,
        street: saleAddressInfo.street,
        number: saleAddressInfo.number,
        neighborhood: saleAddressInfo.neighborhood,
        zipCode: saleAddressInfo.zipCode,
        city: saleAddressInfo.city,
        state: saleAddressInfo.state,
        country: saleAddressInfo.country,
        complement: saleAddressInfo.complement,
        notes: saleAddressInfo.notes,
        preferred: saleAddressInfo.preferred,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    // await aSaleAddresses.createSaleAddress(saleAddress);
    
    // get saleAddressId from the saleAddress
    // let theSaleAddress = await aSaleAddresses.getSaleAddressIdByZipCode(saleAddress.zipCode);

    let sale = {
        status: 'Em Processamento',
        code: code,
        purchaseDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        paymentMethod: 'card',
        totalQuantity: totalQuantity,
        totalValue: req.session.precoFinalComFrete,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.session.clientId,
        // saleAddressId: theSaleAddress[0].saleAddressId
    }
    
    // await aSale.createSale(sale);

    // let theSale = await aSale.getSaleByCode(code);

    console.log(cards);

    // cards.forEach(card => {
    //     if (card.preferred) {
    //         salePaymentInfo = card;
    //     }
    // });

    // if (salePaymentInfo.preferred == true) {
    //     salePaymentInfo.preferred = 1;
    // }

    // let salePayment = {
    //     paymentMethod: salePaymentInfo.paymentMethod,
    //     paymentValue: salePaymentInfo.cardTotal,
    //     createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     saleId: theSale[0].saleId
    // }

    // await aSalePayment.createSalePayment(salePayment);

    // cart.forEach(async livro => {
    //     let saleBooks = {
    //         quantity: livro.quantity,
    //         unitValue: livro.price,
    //         createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    //         updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    //         saleId: theSale[0].saleId,
    //         bookId: livro.bookId
    //     }

    //     await aSaleBooks.createSaleBooks(saleBooks);
    // });

    // // limpar o carrinho
    // req.session.cart = [];
    // req.session.total = 0;
    // req.session.frete = 0;
    // req.session.precoFinalComFrete = 0;

    // res.render('finishPurchase', {
    //     title: 'Compra Realizada',
    //     code: code
    // });
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

// toggle preferred address
async function togglePreferredAddress(req, res) {
    let addressId = req.params.id;
    let addresses = req.session.addresses || [];

    addresses.forEach(address => {
        if (address.addressId == addressId) {
            address.preferred = true;
        } else {
            address.preferred = false;
        }
    });

    req.session.addresses = addresses;

    res.redirect(req.get('referer'));
}

// use cards
async function useCards(req, res) {

    // recebe o valor total da compra
    let precoFinalComFrete = req.session.precoFinalComFrete;

    // se o valor total da compra for menor que 20, não é possível usar mais de um cartão
    if (precoFinalComFrete < 20) {
        req.session.useCards = 0;
        req.session.useCardsInfo = '❌ Você não pode usar mais de um cartão para pagar essa compra. O valor total da compra deve ser maior ou igual a R$ 20,00 para usar mais de um cartão.';
        res.redirect(req.get('referer'));
    } else {
        req.session.useCards = 1;
        req.session.useCardsInfo = '✅ Você pode usar mais de um cartão para pagar essa compra.';

        // usa a função updateCardValue para atualizar o valor total de cada cartão

        let cartoes = req.session.cards;
        let quantidadeCartoes = cartoes.length;

        updateCardValue(precoFinalComFrete, quantidadeCartoes, cartoes);

        res.redirect(req.get('referer'));
    }
}

async function removeCard (req, res) {
    let cardId = req.params.id;
    let cards = req.session.cards || [];

    cards = cards.filter(card => card.cardId != cardId);

    // usa a função updateCardValue para atualizar o valor total de cada cartão

    let quantidadeCartoes = cards.length;
    let precoRestante = req.session.precoFinalComFrete;

    updateCardValue(precoRestante, quantidadeCartoes, cards);

    req.session.cards = cards;

    res.redirect(req.get('referer'));
}

async function confirmCardValue (req, res) {

    let cardId = req.body.cardId;

    // parseFloat req.body.cardValue considerando , como separador decimal
    let cardValue = parseFloat(req.body.cardValue.replace(',', '.'));

    let cartoes = req.session.cards;

    // verifica se o valor do cartão é maior ou igual a 10
    if (cardValue < 10) {
        req.session.useCardsInfo = '❌ O valor do cartão deve ser maior ou igual a R$ 10,00.';
        res.redirect(req.get('referer'));
    } else if (cardValue > req.session.precoFinalComFrete) {
        req.session.useCardsInfo = '❌ O valor do cartão não pode ser maior que o valor total da compra.';
        res.redirect(req.get('referer'));
    } else if (cardValue == req.session.precoFinalComFrete) {
        cartoes.forEach(card => {
            if (card.cardId == cardId) {
                card.cardTotal = cardValue.toFixed(2);
            }
        });

        // atualiza o valor total dos cartões restantes para a divisão do valor total que resta da compra pelo número de cartões restantes
        let cartoesRestantes = cartoes.filter(card => card.cardId != cardId);
        let quantidadeCartoesRestantes = cartoesRestantes.length;
        let precoRestante = req.session.precoFinalComFrete - cardValue;

        updateCardValue(precoRestante, quantidadeCartoesRestantes, cartoesRestantes);

        req.session.useCardsInfo = '✅ Valor do cartão atualizado com sucesso.';

        res.redirect(req.get('referer'));
    } else {
        cartoes.forEach(card => {
            if (card.cardId == cardId) {
                card.cardTotal = cardValue.toFixed(2);
            }
        });

        // atualiza o valor total dos cartões restantes para a divisão do valor total que resta da compra pelo número de cartões restantes
        let cartoesRestantes = cartoes.filter(card => card.cardId != cardId);
        let quantidadeCartoesRestantes = cartoesRestantes.length;
        let precoRestante = req.session.precoFinalComFrete - cardValue;

        updateCardValue(precoRestante, quantidadeCartoesRestantes, cartoesRestantes);

        if (precoRestante < 10) {

            let cards = req.session.cards;
            let quantidadeCartoes = cards.length;

            updateCardValue(req.session.precoFinalComFrete, quantidadeCartoes, cards);

            req.session.useCardsInfo = '❌ O valor dos cartões restantes deve ser maior ou igual a R$ 10,00.';
            res.redirect(req.get('referer'));
        } else {
            req.session.useCardsInfo = '✅ Valor do cartão atualizado com sucesso.';
            res.redirect(req.get('referer'));
        }
    }
}

function updateCardValue(preco, quantidadeCartoes, cartoes) {
    // divide o valor total da compra pelo número de cartões disponíveis para pagamento
    let valorPorCartao = parseFloat((preco / quantidadeCartoes).toFixed(2));

    // atualiza o valor total do cartão para o valor por cartão
    cartoes.forEach(card => {
        card.cardTotal = valorPorCartao.toFixed(2);
    });
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
    togglePreferredCard,
    togglePreferredAddress,
    useCards,
    removeCard,
    confirmCardValue,
    updateCardValue
}