const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   name: {
      type: String,
      required: true
   },
   code_bill: {
      type: String,
      required: true
   },
   province_city: {
      type: String,
      required: true
   },
   district: {
      type: String,
      required: true
   },
   wards: {
      type: String,
      required: true
   },
   street: {
      type: String, required: true
   },
   phone: {
      type: String,
      required: true
   },
   products: [
      {
         product: String,
         price: String,
         quantity: Number
      }
   ],
   status: {
      type: Boolean,
      default: false
   },
   total: {
      type: String
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Cart = mongoose.model('cart', CartSchema);