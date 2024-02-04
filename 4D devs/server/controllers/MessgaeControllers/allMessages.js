const Message = require("../../models/MessageModel");

const allMessages = async(req,res) => {

    //console.log(req.params.chatID);
    
    try{
        const msg = await Message.find({chat:req.params.chatID})
                                                .populate('sender','username email')
                                                .populate('chat');

        return res.status(200).json(msg);                                         
    }  catch (error) {
        console.log(error);
    }

}

module.exports = allMessages;