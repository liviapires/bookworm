const db = require(`../../config/db`);

class Client {
    constructor(code, name, birthDate, gender, cpf, email, password, ranking, active, createdAt, updatedAt, addressesIds, phonesIds, cardsIds) {
        this.code = code;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.ranking = ranking;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.addressesIds = addressesIds;
        this.phonesIds = phonesIds;
        this.cardsIds = cardsIds;
    }

    async getAllClients() {
        const [results, metadata] = await db.query(
            `SELECT * FROM teste.clients
                LEFT JOIN addresses ON clients.addressesIds = addresses.addressId
                LEFT JOIN phones ON clients.phonesIds = phones.phoneId
                LEFT JOIN cards ON clients.cardsIds = cards.cardId;
            `
        );

        return results;
    }

    async createClient(client) {
        const [results, metadata] = await db.query(
            `INSERT INTO clients (code, name, birthDate, gender, cpf, email, password, ranking, active, createdAt, updatedAt, addressesIds, phonesIds, cardsIds)
                VALUES (
                    '${client.code}',
                    '${client.name}',
                    '${client.birthDate}',
                    '${client.gender}',
                    '${client.cpf}',
                    '${client.email}',
                    '${client.password}',
                    '${client.ranking}',
                    '${client.active}',
                    '${client.createdAt}',
                    '${client.updatedAt}',
                    '${client.addressesIds}',
                    '${client.phonesIds}',
                    '${client.cardsIds}'
                );`
        );

        return results;
    }

    async updateClient(client) {
        const [results, metadata] = await db.query(
            `UPDATE clients SET 
                name = '${client.name}', 
                birthDate = '${client.birthDate}',
                gender = '${client.gender}',
                cpf = '${client.cpf}',
                email = '${client.email}',
                updatedAt = '${client.updatedAt}'
            WHERE id = '${client.id}';`
        );

        return results;
    }

    async deleteClient(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM clients WHERE id = '${id}';`
        );

        return results;
    }

    async getClientById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients 
                LEFT JOIN addresses ON clients.addressesIds = addresses.addressId 
                LEFT JOIN phones ON clients.phonesIds = phones.phoneId
                LEFT JOIN cards ON clients.cardsIds = cards.cardId
                WHERE clients.id = '${id}';`
        );

        return results;
    }

    async getClientByEmail(email) {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients WHERE clients.email = '${email}';`
        );

        return results;
    }

    async getClientByCpf(cpf) {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients WHERE clients.cpf = '${cpf}';`
        );

        return results;
    }

}

module.exports = Client;