const Chat = require('../../models/chatModel');


const addToGroup = async(req,res) =>{
    
    const { groupID , userID } = req.body;

    const add = await Chat.findByIdAndUpdate(groupID,
        {
            $push:{users : userID}
        },
        {new:true}
    ).populate('users','-password');

     if(!add){
        res.status(400)
        console.log('Group Not Found');
     } else{
        res.json(add);
     }
};

module.exports = addToGroup;