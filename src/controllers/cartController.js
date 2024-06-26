const Book = require('../models/BookModel');
const Sale = require('../models/SaleModel');
const SaleBooks = require('../models/SaleBooksModel');
const SaleAddresses = require('../models/SaleAddressesModel');
const SalePayment = require('../models/SalePaymentModel');
const Cards = require('../models/CardModel');
const Coupon = require('../models/CouponModel');
const Category = require('../models/CategoryModel');

const moment = require('moment');

const aBook = new Book();
const aSale = new Sale();
const aSaleBooks = new SaleBooks();
const aSaleAddresses = new SaleAddresses();
const aSalePayment = new SalePayment();
const aCard = new Cards();
const aCoupon = new Coupon();
const aCategory = new Category();

// Renderiza a view cart
async function cartView(req, res) {

    let categories = await aCategory.getAllCategories();

    res.render('cart', {
        title: 'Carrinho',
        categories: categories,
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0,
        recommendation: req.session.recommendation || ''
    });
}

async function cartContinueView (req, res) {

    let categories = await aCategory.getAllCategories();

    // se o frete ainda não foi definido, randomiza o valor do frete
    if (!req.session.frete) {
        let frete = Math.random() * (50 - 10) + 10;
        req.session.frete = parseFloat((frete).toFixed(2));
        let precoFinalComFrete = parseFloat(req.session.total) + req.session.frete;
        req.session.precoFinalComFrete = parseFloat((precoFinalComFrete).toFixed(2));
    }


    res.render('cartContinue', {
        title: 'Carrinho',
        categories: categories,
        cliente: req.session.clientInfo || {},
        enderecos: req.session.addresses || [],
        telefones: req.session.phones || [],
        cartoes: req.session.cards || [],
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete,
        precoFinalComFrete: req.session.precoFinalComFrete || 0,
        useCards: req.session.useCards || 0,
        useCardsInfo: req.session.useCardsInfo || '',
        useCoupon: req.session.useCoupon || 0,
        coupons: req.session.coupons || [],
        couponInfo: req.session.couponInfo || '',
        precoComCupom: req.session.precoComCupom || 0,
        totalCouponValue: req.session.totalCouponValue || 0,
        valorExcedente: req.session.valorExcedente || 0
    });
}

// cartCheckoutView

async function cartCheckoutView(req, res) {

    let categories = await aCategory.getAllCategories();

    res.render('cartCheckout', {
        title: 'Carrinho',
        categories: categories,
        cliente: req.session.clientInfo || {},
        enderecos: req.session.addresses || [],
        telefones: req.session.phones || [],
        cartoes: req.session.cards || [],
        cart: req.session.cart || [],
        total: req.session.total || 0,
        frete: req.session.frete || 0,
        precoFinalComFrete: req.session.precoFinalComFrete || 0,
        useCards: req.session.useCards || 0,
        useCoupon: req.session.useCoupon || 0,
        coupons: req.session.coupons || [],
        precoComCupom: req.session.precoComCupom || 0,
        totalCouponValue: req.session.totalCouponValue || 0,
        valorExcedente: req.session.valorExcedente || 0
    });
}

// finishPurchase
async function finishPurchase(req, res) {
    let cart = req.session.cart;
    let addresses = req.session.addresses;
    let totalQuantity = 0;
    let saleAddressInfo;

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

    await aSaleAddresses.createSaleAddress(saleAddress);
    
    // get saleAddressId from the saleAddress
    let theSaleAddress = await aSaleAddresses.getSaleAddressIdByZipCode(saleAddress.zipCode);

    let sale = {
        code: code,
        status: 'Em Processamento',
        purchaseDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        totalQuantity: totalQuantity,
        totalValue: req.session.precoFinalComFrete,
        shipping: req.session.frete,
        withoutShipping: req.session.total,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        userId: req.session.clientId,
        saleAddressId: theSaleAddress[0].saleAddressId
    }

    await aSale.createSale(sale);

    let cards = req.session.cards;
    let coupons = req.session.coupons;
    let totalCouponValue = req.session.totalCouponValue;
    let useCoupon = req.session.useCoupon;
    let useCards = req.session.useCards;
    let precoFinalComFrete = req.session.precoFinalComFrete;
    let precoComCupom = req.session.precoComCupom;

    let paymentMethod = [];

    if (useCoupon == 1) {

        coupons.forEach(coupon => {
            coupon.paymentMethod = 'Cupom';
            paymentMethod.push(coupon);
        });

        if (useCards == 1) {
            cards.forEach(card => {
                card.paymentMethod = 'Cartão de Crédito';
                paymentMethod.push(card);
            });
        } else {
            cards.forEach(card => {
                if (card.preferred) {
                    card.paymentMethod = 'Cartão de Crédito';
                    card.cardTotal = precoComCupom;
                    paymentMethod.push(card);
                }
            });
        }
    } else {
        if (useCards == 1) {
            cards.forEach(card => {
                card.paymentMethod = 'Cartão de Crédito';
                paymentMethod.push(card);
            });
        } else {
            cards.forEach(card => {
                if (card.preferred) {
                    card.paymentMethod = 'Cartão de Crédito';
                    card.cardTotal = precoFinalComFrete;
                    paymentMethod.push(card);
                }
            });
        }
    }

    let theSale = await aSale.getSaleByCode(code);

    paymentMethod.forEach(async payment => {
        if (payment.paymentMethod == 'Cupom') {
            paymentValue = payment.couponValue;
        } else {
            paymentValue = payment.cardTotal;
        }

        let salePayment = {
            paymentMethod: payment.paymentMethod,
            paymentValue: paymentValue,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            saleId: theSale[0].saleId
        }

        await aSalePayment.createSalePayment(salePayment);
    });

    cart.forEach(async livro => {
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
    req.session.useCoupon = 0;
    req.session.coupons = [];
    req.session.totalCouponValue = 0;
    req.session.couponInfo = '';
    req.session.precoComCupom = 0;
    req.session.valorExcedente = 0;
    req.session.useCards = 0;
    req.session.useCardsInfo = '';
    req.session.recommendation = '';
    req.session.cards = await aCard.getCardByUserId(req.session.clientId);

    let categories = await aCategory.getAllCategories();

    res.render('finishPurchase', {
        title: 'Compra Realizada',
        categories: categories,
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
        livro.quantity++;
        livro.bookSubtotal = parseFloat((livro.quantity * livro.price).toFixed(2));
        req.session.total = parseFloat((req.session.total + livro.price).toFixed(2));
        if (req.session.frete) {
            req.session.precoFinalComFrete = parseFloat((req.session.total + req.session.frete).toFixed(2));
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

    // randomiza o valor do frete
    let frete = Math.random() * (50 - 10) + 10;
    req.session.frete = parseFloat((frete).toFixed(2));

    let precoFinalComFrete = parseFloat(req.session.total) + req.session.frete;
    req.session.precoFinalComFrete = parseFloat((precoFinalComFrete).toFixed(2));

    if (req.session.useCoupon == 1) {
        // atualiza o valor total da compra com o valor do cupom
        let precoComCupom = precoFinalComFrete - req.session.totalCouponValue;
        req.session.precoComCupom = parseFloat(precoComCupom).toFixed(2);

        if (req.session.useCards == 1) {
            let cartoes = req.session.cards;
            let quantidadeCartoes = cartoes.length;

            updateCardValue(precoComCupom, quantidadeCartoes, cartoes);
        }
    } else if (req.session.useCards == 1) {
        let cartoes = req.session.cards;
        let quantidadeCartoes = cartoes.length;

        updateCardValue(precoFinalComFrete, quantidadeCartoes, cartoes);
    }

    res.redirect(req.get('referer'));
}

// use cards
async function useCards(req, res) {

    // recebe o valor total da compra
    let preco;

    if (req.session.useCoupon == 1) {
        preco = req.session.precoComCupom;
    } else {
        preco = req.session.precoFinalComFrete;
    }

    let cartoes = req.session.cards || [];
    let quantidadeCartoes = cartoes.length;

    let precoMinimo = 10 * quantidadeCartoes;
    
    if (preco < precoMinimo) {
        req.session.useCards = 0;
        req.session.useCardsInfo = '❌ Você não pode usar mais de um cartão para pagar essa compra.';
        res.redirect(req.get('referer'));
    } else {
        req.session.useCards = 1;
        req.session.useCardsInfo = '✅ Você pode usar mais de um cartão para pagar essa compra.';

        updateCardValue(preco, quantidadeCartoes, cartoes);

        res.redirect(req.get('referer'));
    }
}

async function removeCard (req, res) {
    let cardId = req.params.id;
    let cards = req.session.cards || [];

    cards = cards.filter(card => card.cardId != cardId);

    // usa a função updateCardValue para atualizar o valor total de cada cartão

    let quantidadeCartoes = cards.length;
    let preco;

    if (req.session.useCoupon == 1) {
        preco = req.session.precoComCupom;
    } else {
        preco = req.session.precoFinalComFrete;
    }

    updateCardValue(preco, quantidadeCartoes, cards);

    req.session.cards = cards;

    res.redirect(req.get('referer'));
}

async function confirmCardValue (req, res) {

    let preco;

    if (req.session.useCoupon == 1) {
        preco = req.session.precoComCupom;
    } else {
        preco = req.session.precoFinalComFrete;
    }

    let cardId = req.body.cardId;

    // parseFloat req.body.cardValue considerando , como separador decimal
    let cardValue = parseFloat(req.body.cardValue.replace(',', '.'));

    let cartoes = req.session.cards;

    // verifica se o valor do cartão é maior ou igual a 10
    if (cardValue < 10) {
        req.session.useCardsInfo = '❌ O valor do cartão deve ser maior ou igual a R$ 10,00.';
        res.redirect(req.get('referer'));
    } else if (cardValue > preco) {
        req.session.useCardsInfo = '❌ O valor do cartão não pode ser maior que o valor total da compra.';
        res.redirect(req.get('referer'));
    } else if (cardValue == preco) {
        cartoes.forEach(card => {
            if (card.cardId == cardId) {
                card.cardTotal = cardValue.toFixed(2);
            }
        });

        // atualiza o valor total dos cartões restantes para a divisão do valor total que resta da compra pelo número de cartões restantes
        let cartoesRestantes = cartoes.filter(card => card.cardId != cardId);
        let quantidadeCartoesRestantes = cartoesRestantes.length;
        let precoRestante = preco - cardValue;

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
        let precoRestante = preco - cardValue;

        updateCardValue(precoRestante, quantidadeCartoesRestantes, cartoesRestantes);

        if (precoRestante < 10) {

            let cards = req.session.cards;
            let quantidadeCartoes = cards.length;

            updateCardValue(preco, quantidadeCartoes, cards);

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

async function searchCouponByCode(req, res) {
    const couponCode = req.body.couponCode;

    let coupon = await aCoupon.getCouponByCode(couponCode);

    if (coupon && coupon.length > 0) {
        coupon = coupon[0];

        if (coupon.active == 0) {
            req.session.couponInfo = '❌ O cupom informado está inativo.';
            res.redirect(req.get('referer'));
            return;
        }

        if (moment().isAfter(coupon.expirationDate)) {
            req.session.couponInfo = '❌ O cupom informado está expirado.';
            res.redirect(req.get('referer'));
            return;
        }

        // Retrieve existing coupons from session
        let existingCoupons = req.session.coupons || [];
        let totalCouponValue = existingCoupons.reduce((acc, c) => acc + parseFloat(c.couponValue), 0);
        totalCouponValue += parseFloat(coupon.couponValue);

        if (totalCouponValue > req.session.precoFinalComFrete) {
            req.session.couponInfo = '⚠️ O valor total dos cupons é maior que o valor total da compra. Valor excedente não será reembolsado.';

            let valorExcedente = totalCouponValue - req.session.precoFinalComFrete;
            req.session.valorExcedente = parseFloat(valorExcedente).toFixed(2);
            req.session.precoComCupom = '0.00';
        } else {
            let precoComCupom = req.session.precoFinalComFrete - totalCouponValue;
            req.session.precoComCupom = parseFloat(precoComCupom).toFixed(2);
            req.session.couponInfo = '✅ Cupom aplicado com sucesso.';

            if (req.session.useCards == 1) {
                let cartoes = req.session.cards;
                let quantidadeCartoes = cartoes.length;

                updateCardValue(precoComCupom, quantidadeCartoes, cartoes);
            }

            req.session.valorExcedente = '0.00';
        }

        // Add the new coupon to the session
        existingCoupons.push({
            ...coupon,
            couponValue: parseFloat(coupon.couponValue).toFixed(2)
        });

        req.session.coupons = existingCoupons;
        req.session.useCoupon = 1;
        req.session.totalCouponValue = (totalCouponValue).toFixed(2);

    } else {
        req.session.couponInfo = '❌ O cupom informado não foi encontrado.';
    }

    res.redirect(req.get('referer'));

}

async function removeCoupon(req, res) {
    
    let coupon = req.session.coupons.find(c => c.couponId == req.params.id);

    // remove the coupon from the session coupons array
    req.session.coupons = req.session.coupons.filter(c => c.couponId != req.params.id);

    if (req.session.coupons.length == 0) {
        req.session.couponInfo = '✅ O cupom foi removido com sucesso. O carrinho voltou ao valor original, visto que não há mais cupons aplicados.';
        req.session.useCoupon = 0;
        req.session.precoComCupom = 0;
        req.session.valorExcedente = 0;
        req.session.totalCouponValue = 0;

        if (req.session.useCards == 1) {
            let cartoes = req.session.cards;
            let quantidadeCartoes = cartoes.length;

            updateCardValue(req.session.precoFinalComFrete, quantidadeCartoes, cartoes);
        }
    } else {
        let totalCouponValue = req.session.coupons.reduce((acc, c) => acc + parseFloat(c.couponValue), 0);
        let precoComCupom = req.session.precoFinalComFrete - totalCouponValue;

        if (precoComCupom == req.session.precoFinalComFrete) {
            req.session.couponInfo = '⚠️ O valor total dos cupons é maior que o valor total da compra. Valor excedente não será reembolsado.';

            let valorExcedente = precoComCupom - req.session.precoFinalComFrete;
            req.session.valorExcedente = parseFloat(valorExcedente).toFixed(2);
            req.session.precoComCupom = '0.00';
            req.session.totalCouponValue = (totalCouponValue).toFixed(2);

            if (req.session.useCards == 1) {
                let cartoes = req.session.cards;
                let quantidadeCartoes = cartoes.length;

                updateCardValue(precoComCupom, quantidadeCartoes, cartoes);
            }

        } else {
            req.session.valorExcedente = '0.00';
            req.session.couponInfo = '✅ Cupom removido com sucesso.';
            req.session.precoComCupom = parseFloat(precoComCupom).toFixed(2);
            req.session.totalCouponValue = (totalCouponValue).toFixed(2);

            if (req.session.useCards == 1) {
                let cartoes = req.session.cards;
                let quantidadeCartoes = cartoes.length;

                updateCardValue(precoComCupom, quantidadeCartoes, cartoes);
            }
        }
    }

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
    togglePreferredCard,
    togglePreferredAddress,
    useCards,
    removeCard,
    confirmCardValue,
    updateCardValue,
    searchCouponByCode,
    removeCoupon
}