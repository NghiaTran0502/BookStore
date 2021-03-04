const router = require('express').Router();
const { check, validationResult, body } = require('express-validator');
const BooksModel = require('../../models/Books.model');
const CategoryModel = require('../../models/Category.model');


// @route   POST client-api/category
// @desc    Get all category
// @access  Public
router.get('/', async (req, res) => {
   try {
      const category = await CategoryModel.find();
      res.json({ category });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

// @route   POST client-api/category/:id
// @desc    Get books by categoryId
// @access  Public
router.get("/:id", async (req, res) => {
   const category = req.params.id;
   try {
      const books = await BooksModel.find({ category }).sort({ "dateCreate": -1 }).populate('category', ['name']);
      res.json({ books });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

module.exports = router;