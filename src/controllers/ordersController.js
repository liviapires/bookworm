// Renderiza a view orders
const ordersView = (req, res) => {
    res.render('orders', {
        title: 'Pedidos'
    });
}

module.exports = {
    ordersView
}