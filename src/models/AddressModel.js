const db = require("../../config/db");

class Address {
    constructor(zipCode, street, addressNumber, neighborhood, complement, city, state, country, observation, createdAt, updatedAt, clientId) {
        this.zipCode = zipCode;
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
        this.clientId = clientId;
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
            `INSERT INTO addresses (zipCode, street, addressNumber, neighborhood, complement, city, state, country, observation, createdAt, updatedAt, clientId) \
            VALUES (
                '${address.zipCode}',
                '${address.street}',
                '${address.addressNumber}',
                '${address.neighborhood}',
                '${address.complement}',
                '${address.city}',
                '${address.state}',
                '${address.country}',
                '${address.observation}',
                '${address.createdAt}',
                '${address.updatedAt}',
                '${address.clientId}'
            );`
        );

        return results;
    }

    // update address by id
    async updateAddress(address) {
        const [results, metadata] = await db.query(
            `UPDATE addresses SET 
                zipCode = '${address.zipCode}', 
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
            `SELECT * FROM addresses WHERE addressId = '${id}';`
        );

        return results;
    }

    // get address by clientId
    async getAddressByClientId(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM addresses WHERE clientId = '${id}';`
        );

        return results;
    }

    // delete address by clientId
    async deleteAddressByClientId(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM addresses WHERE clientId = '${id}';`
        );

        return results;
    }

}

module.exports = Address;