//  entry point for our application 

const connectToMongo = require('./database');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


//available routes
app.use('/api/user', require('./routes/user'))
app.use('/api/todo', require('./routes/todo'))
app.use('/api/fav', require('./routes/favourites'))
app.use('/api/friends', require('./routes/friends'))
// app.use('/api/problems', require('./routes/problems'))

app.listen(port, () => {
  console.log(`CodeCrafter listening on port ${port}`);
})