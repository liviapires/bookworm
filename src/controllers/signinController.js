// Renderiza a view signin
const signinView = (req, res) => {
    res.render('signin', {
        title: 'signin',
    });
}

module.exports = {
    signinView
}