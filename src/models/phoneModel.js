const db = require("../../config/db");

class Phone {
    constructor(ddd, number, type, deleted, createdAt, updatedAt, deletedAt) {
        this.ddd = ddd;
        this.number = number;
        this.type = type;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    async getAll() {
        const [results, metadata] = await db.query(
            "SELECT * FROM `phones`;"
        );

        return results;
    }

    async create() {
        const [results, metadata] = await db.query(
            "INSERT INTO `phones` (`ddd`, `number`, `type`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`) \
                VALUES (?, ?, ?, ?, ?, ?, ?);"
        );

        return results;
    }

    async update() {
        const [results, metadata] = await db.query(
            "UPDATE `phones` SET `ddd` = ?, `number` = ?, `type` = ?, `deleted` = ?, `createdAt` = ?, `updatedAt` = ?, `deletedAt` = ? \
                WHERE `id` = ?;"
        );

        return results;
    }

    async delete() {
        const [results, metadata] = await db.query(
            "DELETE FROM `phones` WHERE `id` = ?;"
        );

        return results;
    }

    async getById() {
        const [results, metadata] = await db.query(
            "SELECT * FROM `phones` \
                WHERE `id` = ?;"
        );

        return results;
    }

}

module.exports = Phone;