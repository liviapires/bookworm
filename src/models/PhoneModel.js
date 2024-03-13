const db = require("../../config/db");

class Phone {
    constructor(ddd, phonephoneNumber, type, createdAt, updatedAt, clientId) {
        this.ddd = ddd;
        this.phoneNumber = phonephoneNumber;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.clientId = clientId;
    }

    // get all phones
    async getAllPhones() {
        const [results, metadata] = await db.query(
            `SELECT * FROM phones;`
        );

        return results;
    }

    // create phone
    async createPhone(phone) {
        const [results, metadata] = await db.query(
            `INSERT INTO phones (ddd, phoneNumber, type, createdAt, updatedAt, clientId) 
                VALUES (
                    '${phone.ddd}',
                    '${phone.phoneNumber}',
                    '${phone.type}',
                    '${phone.createdAt}',
                    '${phone.updatedAt}',
                    '${phone.clientId}'
                );`
        );

        return results;
    }

    // update phone by id
    async updatePhone(phone) {
        const [results, metadata] = await db.query(
            `UPDATE phones SET 
                ddd = '${phone.ddd}',
                phoneNumber = '${phone.phoneNumber}',
                type = '${phone.type}',
                updatedAt = '${phone.updatedAt}'
            WHERE phoneId = '${phone.phoneId}';`
        );

        return results;
    }

    // delete phone by id
    async deletePhone(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM phones WHERE phoneId = '${id}';`
        );

        return results;
    }

    // get phone by id
    async getPhoneById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM phones WHERE phoneId = '${id}';`
        );

        return results;
    }

    // get phone by client id

    async getPhoneByClientId(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM phones WHERE clientId = '${id}';`
        );

        return results;
    }

    // delete phone by client id

    async deletePhoneByClientId(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM phones WHERE clientId = '${id}';`
        );

        return results;
    }

}

module.exports = Phone;