const db = require(`../../config/db`);

class Client {
    constructor(code, name, birthDate, gender, cpf, email, password, ranking, status, deleted, createdAt, updatedAt, deletedAt, addressesIds, phonesIds) {
        this.code = code;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.ranking = ranking;
        this.status = status;
        this.deteled = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.addressesIds = addressesIds;
        this.phonesIds = phonesIds;
    }

    async getAll() {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients \
                LEFT JOIN addresses ON clients.addressesIds = addresses.id \
                LEFT JOIN phones ON clients.phonesIds = phones.id;`
        );

        return results;
    }

    async create() {
        const [results, metadata] = await db.query(
            `INSERT INTO clients (code, name, birthDate, gender, cpf, email, password, ranking, status, deleted, createdAt, updatedAt, deletedAt, addressesIds, phonesIds) \
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        );

        return results;
    }

    async update(id) {
        const [results, metadata] = await db.query(
            `UPDATE clients SET code = ?, name = ?, birthDate = ?, gender = ?, cpf = ?, email = ?, password = ?, ranking = ?, status = ?, deleted = ?, createdAt = ?, updatedAt = ?, deletedAt = ?, addressesIds = ?, phonesIds = ? \
                WHERE id = ${id};`
        );

        return results;
    }

    async delete(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM clients WHERE id = ${id};`
        );

        return results;
    }

    async getById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM clients LEFT JOIN addresses ON clients.addressesIds = addresses.id LEFT JOIN phones ON clients.phonesIds = phones.id WHERE clients.id = ${id};`
        );

        return results;
    }

}

module.exports = Client;