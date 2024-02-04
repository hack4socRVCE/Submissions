const mongoose = require('mongoose');
const User = require('./UserModel');


const MessageSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    content:{
        type:String,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{timestamps:true});

module.exports = new mongoose.model('Message',MessageSchema);