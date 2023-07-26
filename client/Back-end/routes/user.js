
const express= require('express');
const User = require('../mongoose_models/User');
const router = express.Router();
const { body , validationResult } = require('express-validator');
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


    // ROUTE 4: Update an existing user info using: PUT "/api/user/addusername". Login required
router.put('/addusername/:id', fetchuser, async (req, res) => {
  const {name , email , password, codeforces_user , codechef_user, leetcode_user, atcoder_user, hackerrank_user } = req.body;
  try{
      // Create a newUser object
      const newUser  = {};
      if(name){newUser.name= name}
      // if(password){newUser.password = password}
      if(email){newUser.email = email}
      if(codeforces_user){newUser.codeforces_user = codeforces_user}
      if(codechef_user){newUser.codechef_user = codechef_user}
      if(leetcode_user){newUser.leetcode_user = codeforces_user}
      if(atcoder_user){newUser.atcoder_user = atcoder_user}
      if(hackerrank_user){newUser.hackerrank_user = hackerrank_user}
  
      // Find the user ID to be updated and update it
      if(req.params.id.match(/^[0-9a-fA-F]{24}$/))
      {
        let users = await User.findById(req.params.id);
      }
     
  
       users = await User.findByIdAndUpdate(req.params.id, {$set: newUser}, {new:true})
      res.json({users});
  }
  catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
  
  })

  // ROUTE 5: Get  User Details using: POST "/api/user/getuserinfo". Login required
  router.post('/getuserinfo/:name', fetchuser,  async (req, res) => {

    try {
      console.log("this is test 123");
      let success = false;
      const username = req.params.name;
      const user = await User.findOne({name:username}).select("-password");
      if(user)
      {
        success = true;
        // res.send(user);
        res.send({user,success});
        console.log("this is "+ success)

      }
      else
      {
        // return res.status(404).send("Not Found")
        res.send({user,success});
        console.log("this is "+ success)
      }
    } catch (error) {
      console.log("wtf is this");
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router