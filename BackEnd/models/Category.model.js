const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   background: {
      type: String,
      default: "https://i.picsum.photos/id/420/1024/300.jpg?hmac=6a4HXBcMf-CWpK37o8eYKOAgu-Lw43IeK_65VIY8ODs"
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Category = mongoose.model('category', categorySchema);
