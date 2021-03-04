const express = require('express');
const connectDB = require('./connection/db');
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 9000;
connectDB();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const AdminRoutes = require('./routes/AdminRoutes');
const ClientRoutes = require('./routes/ClientRoutes');

app.use('/admin-api', AdminRoutes);
app.use('/client-api', ClientRoutes);

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})