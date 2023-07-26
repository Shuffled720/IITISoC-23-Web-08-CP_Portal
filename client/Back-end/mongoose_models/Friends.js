const mongoose = require('mongoose');
const { Schema } = mongoose;
const FriendsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    friend_name:{
        type:String,
        unique:true,
        required:true
    }
  });
  
  module.exports= mongoose.model('MyFriends',FriendsSchema);
