const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const UsersModel = require('../../models/Users.model');
const auth = require('../../middleware/auth');


// @route   POST admin-api/account/add
// @desc    Create account
// @access  Private
router.post(
   '/add',
   [
      [auth],
      body('username', 'Username is required!').not().isEmpty(),
      body('password', 'Password is required!').not().isEmpty()
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, name, phone, mail, role } = req.body;

      let user = await UsersModel.findOne({ username });
      if (user) return res.status(400).json({ errors: [{ msg: 'Account already exists' }] });

      user = new UsersModel({
         username,
         password,
         name,
         phone,
         mail,
         role
      });

      // bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.json({ msg: "Done!!" });
   }
);

// @route   POST admin-api/account/me
// @desc    Get current user
// @access  Private
router.get('/me', [auth], async (req, res) => {
   try {
      let user = await UsersModel.findById(req.currentUser.id).select('-password');
      // console.log({ user })
      res.json(user);
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

// @route   POST admin-api/account/
// @desc    Get all user
// @access  Private
// router.get('/',[auth], async (req, res)=>{

// });

module.exports = router;