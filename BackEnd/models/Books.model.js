const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
   bookname: {
      type: String,
      required: true
   },
   authors: [String],
   _price: {
      type: String,
      required: true
   },
   quantity: {
      type: Number,
      required: true,
      default: 0
   },
   publishing: {
      type: String
   },
   sale: {
      type: Number,
      default: 0
   },
   image: [
      {
         url: {
            type: String
         }
      }
   ],
   show: {
      type: Boolean,
      default: true
   },
   dateCreate: {
      type: Date,
      default: Date.now
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
   },
   page: Number
});

module.exports = Book = mongoose.model('book', BooksSchema);