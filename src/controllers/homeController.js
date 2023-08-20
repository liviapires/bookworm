// Renderiza a view home
const homeView = (req, res) => {
    res.render('home', {
        title: 'Início'
    });
}

module.exports = {
    homeView
}