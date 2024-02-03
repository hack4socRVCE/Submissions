const mongoose = require('mongoose');
mongoose.set('strictQuery' , false);

const connectDB = (url)=>{
    return mongoose.connect(url , console.log('Connected to MoongoDB Atlas'));
}

module.exports = connectDB;