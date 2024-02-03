const Chat = require('../../models/chatModel');


const createGroupChat = async(req,res) =>{

    const usersRecieved = req.body.users; // User._ids in array
    const GroupName = req.body.GroupName;
    const GroupAdmin = req.id;

    //console.log(usersRecieved,GroupName);

    if( !usersRecieved || !GroupName){
        return res.status(400).json({message:'Please Fill All the inputs'});
    }

    const users = (usersRecieved);

    if(users.length < 2){
        return res
                .status(400)
                .json({Error:'More than Two Users Needed to create Group'});
    }

    users.push(GroupAdmin);

    try {
        const createGroupChat = await Chat.create({
            chatName:GroupName,
            users:users,
            GroupChat:true,
            GroupAdmin:GroupAdmin
        })

        const fullChat = await Chat.findOne({_id:createGroupChat._id})
                                                                    .populate('users','-password')
                                                                    .populate('GroupAdmin','-password');

        return res.status(200).json(fullChat); 

    } catch (error) {
        console.log(error);
        return res.status(400);
    }

}

module.exports = createGroupChat;