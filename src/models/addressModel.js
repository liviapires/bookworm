const db = require("../../config/db");

class Address {
    constructor(cep, street, number, neighborhood, complement, city, state, country, observation, deleted, createdAt, updatedAt, deletedAt) {
        this.cep = cep;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.city = city;
        this.state = state;
        this.country = country;
        this.observation = observation;
        this.deleted = deleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    async getAll() {
        const [results, metadata] = await db.query(
            "SELECT * FROM `addresses`;"
        );

        return results;
    }

    async create() {
        const [results, metadata] = await db.query(
            "INSERT INTO `addresses` (`cep`, `street`, `number`, `neighborhood`, `complement`, `city`, `state`, `country`, `observation`, `deleted`, `createdAt`, `updatedAt`, `deletedAt`) \
            VALUES ('?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?');"
        );

        return results;
    }

    async update() {
        const [results, metadata] = await db.query(
            "UPDATE `addresses` SET `cep` = ?, `street` = ?, `number` = ?, `neighborhood` = ?, `complement` = ?, `city` = ?, `state` = ?, `country` = ?, `observation` = ?, `deleted` = ?, `createdAt` = ?, `updatedAt` = ?, `deletedAt` = ? \
            WHERE `id` = ?;"
        );

        return results;
    }

    async delete() {
        const [results, metadata] = await db.query(
            "DELETE FROM `addresses` WHERE `id` = ?;"
        );

        return results;
    }

    async getById() {
        const [results, metadata] = await db.query(
            "SELECT * FROM `addresses` \
            WHERE `id` = ?;"
        );

        return results;
    }
    
}

module.exports = Address;