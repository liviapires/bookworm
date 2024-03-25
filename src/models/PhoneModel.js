const db = require("../../config/db");

class Phone {
    constructor(ddd, phoneNumber, phoneType, createdAt, updatedAt, userId) {
        this.ddd = ddd;
        this.phoneNumber = phoneNumber;
        this.phoneType = phoneType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
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
            `INSERT INTO phones (ddd, phoneNumber, phoneType, createdAt, updatedAt, userId) 
                VALUES (
                    '${phone.ddd}',
                    '${phone.phoneNumber}',
                    '${phone.phoneType}',
                    '${phone.createdAt}',
                    '${phone.updatedAt}',
                    '${phone.userId}'
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
                phoneType = '${phone.phoneType}',
                updatedAt = '${phone.updatedAt}'
            WHERE phoneId = '${phone.phoneId}';`
        );

        return results;
    }

    // delete phone by id
    async deletePhone(phoneId) {
        const [results, metadata] = await db.query(
            `DELETE FROM phones WHERE phoneId = '${phoneId}';`
        );

        return results;
    }

    // get phone by id
    async getPhoneById(phoneId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM phones WHERE phoneId = '${phoneId}';`
        );

        return results;
    }

    // get phone by userId
    async getPhoneByUserId(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM phones WHERE userId = '${userId}';`
        );

        return results;
    }

    // delete phone by userId
    async deletePhoneByUserId(userId) {
        const [results, metadata] = await db.query(
            `DELETE FROM phones WHERE userId = '${userId}';`
        );

        return results;
    }

}

module.exports = Phone;