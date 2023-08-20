// Renderiza a view category
const categoryView = (req, res) => {
    res.render('category', {
        title: 'Categoria'
    });
}

module.exports = {
    categoryView
}