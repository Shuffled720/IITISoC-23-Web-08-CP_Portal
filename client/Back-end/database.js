const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/codecrafter"

const connectToMongo = async () =>
{
    mongoose.connect(mongoURI, await console.log("Connected to mongo Successful"));
}

module.exports = connectToMongo;
