
const express= require('express');
const User = require('../mongoose_models/User');
const router = express.Router();
const { body ,query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'codecrafter$#%compcp!@#';


// ROUTE 1  : create a User using: POST "/api/user/createuser"
router.post('/createuser',[
   body('name','The username must be atleast 5 characters and should be valid').isLength({min:5}),
   body('email','Enter a valid email').isEmail(),
   body('password','The password must be alteast 7 characters long and be valid').isLength({min:7}),
], async (req,res)=>{

  let success = false;
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    
    try{

       let user=await User.findOne({email:req.body.email});
       if(user)
       {
         return res.status(400).json({success,error:"Sorry a user with this  email already exists"})
       }
        user=await User.findOne({ name:req.body.name});
       if(user)
       {
         return res.status(400).json({success, error:"Sorry a user with this username  already exists"})
       }
       const salt = await  bcrypt.genSalt(10);
      
       const secure_password = await bcrypt.hash(req.body.password, salt)
       
       user = await User.create({
         name: req.body.name,
         password: secure_password,
         email: req.body.email,
       })

       const data = {
        user:{
          id: user.id
        }
      }
      success=true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({success,authtoken});

      //  res.json(user);
    }

catch (error) {
   console.error(error.message);
   res.status(500).send("Some Error occured");
}
})



// ROUTE 2 :  Authenticate a User using: POST "/api/user/login"
router.post('/login',[
  body('name','The username must be atleast 5 characters and should be valid').isLength({min:5}),
  body('password','The password cannot be blank').exists(),
], async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const {name, password} = req.body;
  try {
    let user = await User.findOne({name});
    if(!user){
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})


// ROUTE 3: Get loggedin User Details using: POST "/api/user/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router