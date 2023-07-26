
const express= require('express');
const MyFriend = require('../mongoose_models/Friends');
const router = express.Router();
const { body , validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const User1 = require('../mongoose_models/User');
// const Friends = require('../mongoose_models/Friends');






// ROUTE 1  : create a friend using: POST "/api/friends/addfriend"
router.post('/addfriend', fetchuser,[
], async (req, res) => {


      try {
        const { friend_name } = req.body;
          
          // Find the list item to be updated and update it
        let friend = await User1.findOne({ name:friend_name});
        if(!friend){return res.status(404).send("Not Found")}
          const friends1 = new MyFriend({
               friend_name,
               user: req.user.id
          })
          const savedFriend = await friends1.save()
          res.json(savedFriend)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })




// ROUTE 2:Get all the user's friend list items using: GET "/api/friends/fetchfriends" . login will be required
router.get('/fetchfriends', fetchuser, async (req, res) => {
  try {
      const notes = await MyFriend.find({ user: req.user.id });
      res.json(notes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

    // ROUTE 3: Delete an existing friend using: DELETE "/api/friends/removefriend". Login required
    router.delete('/removefriend/:name', fetchuser, async (req, res) => {
      try {
          // Find the friend to be removed and delete it
          let friend = await MyFriend.findOne({friend_name:req.params.name});
          if (!friend) { return res.status(404).send("Not Found") }
  
          // Allow deletion only if user owns this Note
          if (friend.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
  
          friend = await MyFriend.findOneAndDelete({friend_name : req.params.name})
          res.json({ "Success": "Friend has been removed", friend: friend });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

  // ROUTE 4  : checking whether a user is a friend friend using: POST "/api/friends/iffriend"
router.post('/iffriend', fetchuser,[
], async (req, res) => {


      try {
        const { friend_name } = req.body;
          
        // Find the list item to be updated and update it
        // let friend = await User1.findOne({ name:friend_name});
        // if(!friend){return res.status(404).send("User Not Found")}
        let success =false;
        const friend1 = await MyFriend.findOne({friend_name:friend_name , user :req.user.id})
        if(friend1){success=true;}
          res.json(success)

      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  })

module.exports = router