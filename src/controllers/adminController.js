// Renderiza a view evaluateExchange
const evaluateExchangeView = (req, res) => {
    res.render('evaluateExchange', {
        title: 'Avaliar Troca ou Devolução'
    });
}

module.exports = {
    evaluateExchangeView
}