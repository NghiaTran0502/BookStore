const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
   username: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   name: {
      type: String
   },
   mail: String,
   phone: String,
   avatar: {
      type: String,
      default: ''
   },
   role: {
      type: Boolean,
      default: false
   },
   dateCreate: {
      type: Date,
      default: Date.now
   }
});


module.exports = User = mongoose.model('user', UserSchema);