// Renderiza a view signin
const signinView = (req, res) => {
    res.render('signin', {
        title: 'Sign In',
    });
}

module.exports = {
    signinView
}