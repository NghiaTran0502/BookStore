const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const BooksModel = require('../../models/Books.model');

// @route   POST admin-api/books/add
// @desc    Create books
// @access  Private
router.post(
   '/add',
   [
      [auth],
      body('bookname', 'Name is required!').not().isEmpty(),
      body('_price', 'Price is required!').not().isEmpty(),
      body('quantity', 'Quantity is required!').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const {
         bookname,
         authors,
         _price,
         quantity,
         publishing,
         sale,
         image,
         category
      } = req.body;

      try {
         let author_list = authors.split(',');
         author_list = author_list.map(author => author.trim());
         const books = new BooksModel({
            bookname,
            _price,
            authors: author_list,
            quantity,
            publishing,
            sale,
            image,
            category
         });
         books.save();
         res.json({ books });
      } catch (errors) {
         console.error(errors.message);
         res.status(500).send('Server error');
      }
   }
);


// @route   GET admin-api/books/
// @desc    Get all books
// @access  Private
router.get('/', async (req, res) => {
   const page = req.query.page || 1;
   const limit = 10;
   const SKIP = (page - 1) * limit

   let books = await BooksModel
      .find()
      .skip(SKIP)
      .limit(limit)
      .sort({ "dateCreate": -1 });

   res.json({ books, page });
});






module.exports = router;