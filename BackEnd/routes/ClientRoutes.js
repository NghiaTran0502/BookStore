const router = require('express').Router();

const Book = require('./ClientApi/Books.api');
const Category = require('./ClientApi/Category.api');
const Cart = require('./ClientApi/Cart.api');

router.use('/books', Book);
router.use('/category', Category);
router.use('/cart', Cart);

module.exports = router;