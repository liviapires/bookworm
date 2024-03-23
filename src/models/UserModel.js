const db = require(`../../config/db`);

class user {
    constructor(code, name, admin, gender, birthDate, cpf, email, password, ranking, role, active, inactiveReason, inactiveDate, createdAt, updatedAt) {
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
        this.inactiveReason = inactiveReason;
        this.inactiveDate = inactiveDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all users with their phones, addresses and cards

    async getAllUsers() {
        const [results, metadata] = await db.query(
            `SELECT * FROM users 
                INNER JOIN phones ON users.userId = phones.userId
                INNER JOIN addresses ON users.userId = addresses.userId
                INNER JOIN creditCards ON users.userId = creditCards.userId;`
        );

        return results;
    }

    async createUser(user) {
        const [results, metadata] = await db.query(
            `INSERT INTO users (code, name, admin, gender, birthDate, cpf, email, password, ranking, role, active, inactiveReason, inactiveDate, createdAt, updatedAt)
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
                    '${user.inactiveReason}',
                    '${user.inactiveDate}',
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
            WHERE userId = '${user.userId}';`
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
                INNER JOIN phones ON users.userId = phones.userId
                INNER JOIN addresses ON users.userId = addresses.userId
                INNER JOIN creditCards ON users.userId = creditCards.userId
                WHERE users.userId = '${userId}';`
        );

        return results;
    }

    // get user id

    async getuserId(user) {
        const [results, metadata] = await db.query(
            `SELECT userId FROM users 
                WHERE code = '${user.code}';`
        );

        return results;
    }

}

module.exports = user;