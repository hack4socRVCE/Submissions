const jwt = require('jsonwebtoken');
require('dotenv').config();


const Verifytoken = (req,res,next) =>{

    const cookies = req.headers.cookie || '';
     
    const token = cookies.split('=')[1]
    //console.log(token);
    if(!token) res.status(404).json({message:'No token Recieved..!'});

    jwt.verify(String(token) , process.env.JWT_KEY , (err,user)=>{
        err ? res.status(400).json({message:'Inavlid Token'})
        :  req.id = user.id //console.log(user);
    })

    next();
}

module.exports = Verifytoken;