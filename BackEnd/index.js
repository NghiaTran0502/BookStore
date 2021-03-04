const express = require('express')
const app = express()
const port = process.env.PORT || 9000;

app.get('/', (req, res) => {
   res.send('This is test');
   console.log("This is test")
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})