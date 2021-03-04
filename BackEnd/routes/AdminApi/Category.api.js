const router = require('express').Router();
const { check, validationResult, body } = require('express-validator');
const auth = require('../../middleware/auth');

const CategoryModel = require('../../models/Category.model');


// @route   POST admin-api/category/add
// @desc    Create category
// @access  Private
router.post(
   '/add',
   [
      [auth],
      check('name', 'name is required!').not().isEmpty()
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
      }
      const { name, background } = req.body;
      try {
         let category = await CategoryModel.findOne({ name });
         if (category) {
            res.status(400).json({ msg: 'Category already exists' });
         }
         category = new CategoryModel({
            name,
            background
         })
         await category.save();
         res.json({ category });
      } catch (errors) {
         console.error(errors.message);
         res.status(500).send("Server error");
      }
   }
);

// @route   POST admin-api/category
// @desc    Get all category
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const category = await CategoryModel.find();
      res.json({ category });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send("Server error");
   }
})

module.exports = router

