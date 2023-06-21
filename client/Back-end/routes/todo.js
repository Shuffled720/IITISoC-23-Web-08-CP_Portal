// create a User using: POST "/api/auth"

const express= require('express');
const router = express.Router();
// const User = require('../mongoose_models/User');
// const { Schema } = mongoose;

router.post('/', (req,res)=>{
//    const user = User(req.body);
//    user.save();
//    res.send(req.body);
})


module.exports = router
