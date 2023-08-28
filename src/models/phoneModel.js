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
}