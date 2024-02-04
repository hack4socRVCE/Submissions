const mongoose = require('mongoose');
const User = require('./UserModel');
const Message = require('./MessageModel');

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim:true
    },
    GroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Message
    },
    GroupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
},{timestamps:true});


module.exports = new mongoose.model('Chat',chatSchema)