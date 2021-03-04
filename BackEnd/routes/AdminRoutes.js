const router = require('express').Router();

const Login = require('./AdminApi/Login.api');
const Account = require('./AdminApi/Accounts.api');
const Books = require('./AdminApi/Books.api');
const Category = require('./AdminApi/Category.api');

router.use('/login', Login);
router.use('/account', Account);
router.use('/books', Books);
router.use('/category', Category);



module.exports = router;