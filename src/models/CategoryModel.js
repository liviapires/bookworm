const db = require("../../config/db");

class Category {
    constructor(name, createdAt, updatedAt) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all categories
    async getAllCategories() {
        const [results, metadata] = await db.query(
            `SELECT * FROM categories;`
        );

        return results;
    }

    // create category
    async createCategory(category) {
        const [results, metadata] = await db.query(
            `INSERT INTO categories (name, createdAt, updatedAt) \
            VALUES (
                '${category.name}',
                '${category.createdAt}',
                '${category.updatedAt}'
            );`
        );

        return results;
    }

    // update category by id
    async updateCategory(category) {
        const [results, metadata] = await db.query(
            `UPDATE categories SET 
                name = '${category.name}', 
                updatedAt = '${category.updatedAt}'
            WHERE id = ${category.id};`
        );

        return results;
    }

    // delete category by id
    async deleteCategory(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM categories WHERE id = ${id};`
        );

        return results;
    }

    // get category by id
    async getCategoryById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM categories WHERE id = ${id};`
        );

        return results;
    }
}

module.exports = Category;