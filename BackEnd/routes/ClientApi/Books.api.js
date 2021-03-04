const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const BooksModel = require('../../models/Books.model');

// @route   POST client-api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
   const page = req.query.page || 1;
   const limit = 10;
   const SKIP = (page - 1) * limit;

   let books = await BooksModel
      .find()
      .skip(SKIP)
      .limit(limit)
      .sort({ "dateCreate": -1 })
      .populate('category');

   res.json({ books, page });
});

// @route   POST client-api/books/view/:id
// @desc    View Book
// @access  Public
router.get('/view/:id', async (req, res) => {
   const id = req.params.id;
   try {
      let book = await BooksModel.findById(id).populate('category');
      res.json({ book });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});




module.exports = router;
