const db = require("../../config/db");

class Address {
    constructor(cep, street, addressNumber, neighborhood, complement, city, state, country, observation, createdAt, updatedAt) {
        this.cep = cep;
        this.street = street;
        this.addressNumber = addressNumber;
        this.neighborhood = neighborhood;
        this.complement = complement;
        this.city = city;
        this.state = state;
        this.country = country;
        this.observation = observation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all addresses
    async getAllAddresses() {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses;`
        );

        return results;
    }

    // create address
    async createAddress(address) {
        const [results, metadata] = await db.query(
            `INSERT INTO addresses (cep, street, addressNumber, neighborhood, complement, city, state, country, observation, createdAt, updatedAt) \
            VALUES (
                '${address.cep}',
                '${address.street}',
                '${address.addressNumber}',
                '${address.neighborhood}',
                '${address.complement}',
                '${address.city}',
                '${address.state}',
                '${address.country}',
                '${address.observation}',
                '${address.createdAt}',
                '${address.updatedAt}'
            );`
        );

        return results;
    }

    // update address by id
    async updateAddress(address) {
        const [results, metadata] = await db.query(
            `UPDATE addresses SET 
                cep = '${address.cep}', 
                street = '${address.street}', 
                addressNumber = '${address.addressNumber}',
                neighborhood = '${address.neighborhood}', 
                complement = '${address.complement}', 
                city = '${address.city}', 
                state = '${address.state}', 
                country = '${address.country}',
                observation = '${address.observation}',
                updatedAt = '${address.updatedAt}'
            WHERE addressId = '${address.addressId}';`
        );

        return results;
    }

    // delete address by id
    async deleteAddress(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM addresses WHERE addressId = '${id}';`
        );

        return results;
    }

    // get address by id
    async getAddressById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses
                WHERE addressId = '${id}';`
        );

        return results;
    }

    async getAddressId(address) {
        const [results, metadata] = await db.query(
            `SELECT addressId FROM addresses 
                WHERE cep = '${address.cep}' 
                    AND street = '${address.street}' 
                    AND addressNumber = '${address.addressNumber}' 
                    AND neighborhood = '${address.neighborhood}' 
                    AND complement = '${address.complement}' 
                    AND city = '${address.city}' 
                    AND state = '${address.state}' 
                    AND country = '${address.country}' 
                    AND observation = '${address.observation}'
                    AND createdAt = '${address.createdAt}';`
        );

        return results;
    }

}

module.exports = Address;