const db = require("../../config/db");

class Phone {
    constructor(ddd, phonephoneNumber, type, createdAt, updatedAt) {
        this.ddd = ddd;
        this.phoneNumber = phonephoneNumber;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
            `INSERT INTO phones (ddd, phoneNumber, type, createdAt, updatedAt) 
                VALUES (
                    '${phone.ddd}',
                    '${phone.phoneNumber}',
                    '${phone.type}',
                    '${phone.createdAt}',
                    '${phone.updatedAt}'
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
            `SELECT * FROM phones
                WHERE phoneId = '${id}';`
        );

        return results;
    }

    async getPhoneId(phone) {
        const [results, metadata] = await db.query(
            `SELECT phoneId FROM phones 
                WHERE ddd = '${phone.ddd}' 
                    AND phoneNumber = '${phone.phoneNumber}'
                    AND type = '${phone.type}'
                    AND createdAt = '${phone.createdAt}';`
        );

        return results;
    }

}

module.exports = Phone;