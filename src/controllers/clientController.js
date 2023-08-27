const clientModel = require('../models/clientModel');

class clientController {

    static async getAll(req, res) {
        let results = await clientModel.getClients();

        if (results) {
            console.log(results);
        } else {
            console.log("No results found!");
        }
        
    }

}

// Renderiza a view signin
const signinView = (req, res) => {
    res.render('signin', {
        title: 'Sign In'
    });
}

module.exports = {
    signinView,
    clientController
}