const db = require(`../../config/db`);

class Client {
    constructor(code, name, birthDate, gender, cpf, email, password, ranking, active, createdAt, updatedAt) {
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
    }

    // get all clients with their phones, addresses and cards

    async getAllClients() {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients 
                INNER JOIN phones ON clients.clientId = phones.clientId
                INNER JOIN addresses ON clients.clientId = addresses.clientId
                INNER JOIN cards ON clients.clientId = cards.clientId;`
        );

        return results;
    }

    async createClient(client) {
        const [results, metadata] = await db.query(
            `INSERT INTO clients (code, name, birthDate, gender, cpf, email, password, ranking, active, createdAt, updatedAt)
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
                    '${client.updatedAt}'
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

    // delete client by id and all its phones, addresses and cards

    async deleteClient(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM clients WHERE clientId = '${id}';`
        );

        return results;
    }

    async getClientById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients 
                INNER JOIN phones ON clients.clientId = phones.clientId
                INNER JOIN addresses ON clients.clientId = addresses.clientId
                INNER JOIN cards ON clients.clientId = cards.clientId
                WHERE clients.clientId = '${id}';`
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

    // get client id

    async getClientId(client) {
        const [results, metadata] = await db.query(
            `SELECT clientId FROM clients 
                WHERE code = '${client.code}';`
        );

        return results;
    }

}

module.exports = Client;