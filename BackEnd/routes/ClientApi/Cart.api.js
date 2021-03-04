const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const client = require('../../middleware/client');
const CartModel = require('../../models/Cart.model');


function randomString(length) {
   // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
   var result = '';
   var characters = 'ABCDEFGHJ';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function createCodeBill() {
   let result = '';
   const now = new Date()
   result = `${randomString(3)}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
   return result;
}
// @route   POST client-api/cart/add
// @desc    Create cart
// @access  Public
router.post(
   '/add',
   async (req, res) => {

      const { name, province_city, district, wards, street, phone, products, user } = req.body;

      try {
         let code_bill = createCodeBill();

         const total = products.reduce((total, product) => {
            return total + (product.price * product.quantity)
         }, 0)

         const cart = new CartModel({
            user,
            name,
            code_bill,
            province_city,
            district,
            wards,
            street,
            phone,
            products,
            total
         });
         cart.save();
         res.json({ cart });
      } catch (errors) {
         console.error(errors.message);
         res.status(500).send("Server error");
      }
   }
);

// @route   POST client-api/cart/findBill
// @desc    Find bill code
// @access  Public
router.get('/findBill', async (req, res) => {
   const code_bill = req.query.code_bill;
   try {
      let cart = await CartModel.findOne({ code_bill });
      res.json({ cart });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

// @route   POST client-api/cart/findPhone
// @desc    Find bill for phone number
// @access  Public
router.get('/findPhone', async (req, res) => {
   const phone = req.query.phone;
   try {
      let cart = await CartModel.find({ phone }).sort({ "dateCreate": -1 });
      res.json({ cart });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

// @route   POST client-api/cart/history
// @desc    Get history bill current user
// @access  Public
router.get('/find', [client], async (req, res) => {
   try {
      let bills = await CartModel.find({ user: req.currentUser.id }).sort({ "dateCreate": -1 });
      res.json({ bills });
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

// @route   POST client-api/cart/view/:id
// @desc    View bill
// @access  Public
router.get('/view/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const bill = await CartModel.findById(id);
      res.json({bill});
   } catch (errors) {
      console.error(errors.message);
      res.status(500).send('Server error');
   }
});

module.exports = router;