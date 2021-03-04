const mongoose = require('mongoose');

const dbUrl = process.env.dbUrl;

const connectDB = async () => {
   try {
      await mongoose.connect(dbUrl, {
         useUnifiedTopology: true,
         useNewUrlParser: true
      });
      console.log("MongoDB connected!!!");
   } catch (err) {
      console.log(err.message);
      process.exit(1);
   }
}

module.exports = connectDB;

