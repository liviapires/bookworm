// Renderiza a view cart
const cartView = (req, res) => {
    res.render('cart', {
        title: 'Carrinho'
    });
}

module.exports = {
    cartView
}