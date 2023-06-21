//  entry point for our application 

const connectToMongo = require('./database');
const express = require('express');

connectToMongo();
const app = express()
const port = 5000

app.use(express.json());

//available routes
app.use('/api/user', require('./routes/user'))
// app.use('/api/todo', require('./routes/todo'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})