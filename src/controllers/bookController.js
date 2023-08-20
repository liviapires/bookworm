// Renderiza a view book
const bookView = (req, res) => {
    res.render('book', {
        title: 'Livro'
    });
}

module.exports = {
    bookView
}