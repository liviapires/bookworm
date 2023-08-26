const clientModel = require('../models/ClientModel');

class clientController {

    static async getAll(req, res) {
        let results = await clientModel.getClients();

        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'Nenhum cliente encontrado' });
        }
        
    }

}

module.exports = clientController;