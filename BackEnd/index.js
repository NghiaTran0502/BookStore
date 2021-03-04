const express = require('express');
const connectDB = require('./connection/db');
const app = express()
const port = process.env.PORT || 9000;

connectDB();

app.get('/', (req, res) => {
   res.send('This is test');
   console.log("This is test")
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})