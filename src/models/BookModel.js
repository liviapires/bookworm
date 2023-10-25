const db = require("../../config/db");

class Book {

    constructor(title, year, publisher, edition, isbn, pages, synopsis, height, width, depth, weight, price, barcode, createdAt, updatedAt) {
        this.title = title;
        this.year = year;
        this.publisher = publisher;
        this.edition = edition;
        this.isbn = isbn;
        this.pages = pages;
        this.synopsis = synopsis;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.weight = weight;
        this.price = price;
        this.barcode = barcode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // get all books
    async getAllBooks() {
        const [results, metadata] = await db.query(
            `SELECT * FROM books;`
        );

        return results;
    }

    // create book
    async createBook(book) {
        const [results, metadata] = await db.query(
            `INSERT INTO books (title, year, publisher, edition, isbn, pages, synopsis, height, width, depth, weight, price, barcode, createdAt, updatedAt) \
            VALUES (
                '${book.title}',
                '${book.year}',
                '${book.publisher}',
                '${book.edition}',
                '${book.isbn}',
                '${book.pages}',
                '${book.synopsis}',
                '${book.height}',
                '${book.width}',
                '${book.depth}',
                '${book.weight}',
                '${book.price}',
                '${book.barcode}',
                '${book.createdAt}',
                '${book.updatedAt}'
            );`
        );

        return results;
    }

    // update book by id
    async updateBook(book) {
        const [results, metadata] = await db.query(
            `UPDATE books SET 
                title = '${book.title}', 
                year = '${book.year}', 
                publisher = '${book.publisher}',
                edition = '${book.edition}', 
                isbn = '${book.isbn}', 
                pages = '${book.pages}', 
                synopsis = '${book.synopsis}', 
                height = '${book.height}',
                width = '${book.width}',
                depth = '${book.depth}',
                weight = '${book.weight}',
                price = '${book.price}',
                barcode = '${book.barcode}',
                updatedAt = '${book.updatedAt}'
            WHERE bookId = ${book.id};`
        );

        return results;
    }

    // delete book by id
    async deleteBook(id) {
        const [results, metadata] = await db.query(
            `DELETE FROM books WHERE bookId = ${id};`
        );

        return results;
    }

    // get book by id
    async getBookById(id) {
        const [results, metadata] = await db.query(
            `SELECT * FROM books WHERE bookId = ${id};`
        );

        return results;
    }
}

module.exports = Book;