// Renderiza a view category
const categoryView = (req, res) => {
    res.render('category', {
        title: 'category',
    });
}

module.exports = {
    categoryView
}