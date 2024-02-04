const Chat = require('../../models/chatModel');
const User = require('../../models/UserModel');


const fetchChats = async(req,res)=>{

    const CurrentUser = req.id;
    console.log(CurrentUser);
    try {
    let result = await Chat.find({users:{$elemMatch : { $eq:CurrentUser}}})
        .populate('users','-password')
        .populate('lastMessage')
        .populate('GroupAdmin','-password')
        .sort({updatedAt:-1}); //1 for ascending and -1 for descending
        //console.log(result);
        result = await User.populate(result,{
                path:'lastMessage.sender',
                select:'username email'
        });
        return res.status(200).json({result});

    } catch (error) {
        res.status(400)
        console.log(error);
    }    
}

module.exports = fetchChats;