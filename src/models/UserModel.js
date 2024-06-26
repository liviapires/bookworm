const db = require(`../../config/db`);

class user {
    constructor(code, name, admin, gender, birthDate, cpf, email, password, ranking, role, active, createdAt, updatedAt) {
        this.code = code;
        this.name = name;
        this.admin = admin;
        this.gender = gender;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
        this.ranking = ranking;
        this.role = role;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all users with their phones, addresses and cards

    async getAllClients() {
        const [results, metadata] = await db.query(
            `SELECT * FROM users;`
        );

        return results;
    }

    async createUser(user) {
        const [results, metadata] = await db.query(
            `INSERT INTO users (code, name, admin, gender, birthDate, cpf, email, password, ranking, role, active, createdAt, updatedAt)
                VALUES (
                    '${user.code}',
                    '${user.name}',
                    '${user.admin}',
                    '${user.gender}',
                    '${user.birthDate}',
                    '${user.cpf}',
                    '${user.email}',
                    '${user.password}',
                    '${user.ranking}',
                    '${user.role}',
                    '${user.active}',
                    '${user.createdAt}',
                    '${user.updatedAt}'
                );`
        );

        return results;
    }

    async updateUser(user) {
        const [results, metadata] = await db.query(
            `UPDATE users SET 
                name = '${user.name}', 
                birthDate = '${user.birthDate}',
                gender = '${user.gender}',
                cpf = '${user.cpf}',
                email = '${user.email}',
                updatedAt = '${user.updatedAt}'
            WHERE userId = '${user.id}';`
        );

        return results;
    }

    // delete user by id and all its phones, addresses and cards

    async deleteUser(userId) {
        const [results, metadata] = await db.query(
            `DELETE FROM users WHERE userId = '${userId}';`
        );

        return results;
    }

    async getUserById(userId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM users 
                LEFT JOIN phones ON users.userId = phones.userId
                LEFT JOIN addresses ON users.userId = addresses.userId
                LEFT JOIN creditCards ON users.userId = creditCards.userId
                WHERE users.userId = '${userId}';`
        );

        return results;
    }

    // get client by id

    async getClientById(clientId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM users WHERE userId = '${clientId}';`
        );

        return results;
    }

    // get client id

    async getClientId(user) {
        const [results, metadata] = await db.query(
            `SELECT userId FROM users 
                WHERE code = '${user.code}';`
        );

        return results;
    }

    // get client by phone id

    async getClientByPhoneId(phoneId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM users 
                LEFT JOIN phones ON users.userId = phones.userId
                WHERE phones.phoneId = '${phoneId}';`
        );

        return results;
    }

    // get client by address id

    async getClientByAddressId(addressId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM users 
                LEFT JOIN addresses ON users.userId = addresses.userId
                WHERE addresses.addressId = '${addressId}';`
        );

        return results;
    }

    // get client by card id

    async getClientByCardId(cardId) {
        const [results, metadata] = await db.query(
            `SELECT * FROM users 
                LEFT JOIN creditCards ON users.userId = creditCards.userId
                WHERE creditCards.cardId = '${cardId}';`
        );

        return results;
    }

}

module.exports = user;