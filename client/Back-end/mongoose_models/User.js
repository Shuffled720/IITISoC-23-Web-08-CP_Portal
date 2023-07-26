const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true

    },
    codeforces_user:{
        type:String,
        default:""

    },
    codechef_user:{
        type:String,
        default:""

    },
    atcoder_user:{
        type:String,
        default:""

    },
    leetcode_user:{
        type:String,
        default:""

    },
    hackerrank_user:{
        type:String,
        default:""

    },
  });
  
  const User = mongoose.model('user',UserSchema);
  User.createIndexes();
  module.exports = User;
