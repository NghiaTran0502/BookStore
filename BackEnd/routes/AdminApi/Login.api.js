const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require('../../models/Users.model');

// @route   POST admin-api/login
// @desc    Login
// @access  Public
router.post('/',
   [
      body('username', 'Username is required!').not().isEmpty(),
      body('password', 'Password is required!').not().isEmpty()
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      console.log({ username, password });

      try {
         let user = await UsersModel.findOne({ username });
         console.log(user);
         if (!user) return res.status(400).json({ msg: `Account does not exist!` });

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) return res.status(401).json({ msg: `Wrong password. Try again!` });

         // Json web token
         const payload = {
            currentUser: {
               id: user.id,
               role: user.role
            }
         }
         jwt.sign(
            payload,
            process.env.secretKey,
            {
               expiresIn: 360000
            },
            (err, token) => {
               if (err) throw err;
               res.json({ token });
            }
         )
      } catch (errors) {
         console.error(errors.message);
         res.send('Server Error~');
      }
   }
)

module.exports = router;