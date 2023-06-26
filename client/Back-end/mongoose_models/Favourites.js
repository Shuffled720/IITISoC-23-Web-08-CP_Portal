const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    problem_tag:{
        type:String,
        required:true,
        unique:true

    },
    problem_name:{
        type: String,
        required: true,
        unique: true
    },
    user_note:{
        type:String,
        default:"No sticky notes were addded by you"

    },
    problem_date:{
        type: Date,
        default:Date.now
    }
   
  });

  module.exports =mongoose.model('fav',FavSchema);