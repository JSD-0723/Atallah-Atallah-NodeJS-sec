const { books } = require('../books.json');
const fs = require('fs');

const getBooks = (req, res) => {
    fs.readFile('books.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('500: Internal Server Error');
        }
        const books = JSON.parse(data);
        res.render('books', { books });
    });
}

const getBook = (req, res) => {
    const id = Number(req.params.id);
    fs.readFile('books.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('500: Internal Server Error');
        }
        const books = JSON.parse(data);
        const book = books.find((book) => book.id === id);
        if (book) {
            res.render('book', { book });
        } else {
            res.status(404).send('404: Book Not Found');
        }
    });
}

const createBook = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide a name value' });
    }

    fs.readFile('books.json', 'utf8', (err, data) => {
        let books = [];

        if (!err) {
            try {
                books = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send('500: Internal Server Error (Invalid JSON)');
            }
        }

        const newBook = { id: books.length + 1, name };

        books.push(newBook);

        fs.writeFile('books.json', JSON.stringify(books, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).send('500: Internal Server Error (Failed to write to file)');
            }
            return res.status(201).json({ success: true, data: newBook });
        });
    });
}

module.exports = {
    getBooks,
    getBook,
    createBook
}