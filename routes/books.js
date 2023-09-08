const express = require('express')
const router = express.Router();

const {
    getBooks,
    getBook,
    createBook
} = require('../controllers/books')

// router.get('/', getBooks);
// router.get('/:id', getBook);
// router.post('/', createBook);

router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getBook)

module.exports = router