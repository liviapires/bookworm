const db = require('../config/db.js');

class ClientModel {
    
    static async getClients() {
        return new Promise((resolve => {
            db.query('SELECT * FROM clientes', (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        }));
    }

}

module.exports = ClientModel;