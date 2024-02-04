const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
});

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    addictType:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },
    isCounselor:{
        type:Boolean,
        default:false,
        required:true,
    },
    TaskScore:{
        type:Number,
        default:0,
        required:true
    },
    DayCount:{
        type:Number,
        default:0
    },
    counselorDetails:{
        CounselorLicenseNumber:{
            type:Number,
        },
        Specialization:{
            type:String,
        },
        Experience:{
            type:Number,
        },
        WorkingIn:{
            type:String,
        },
        Portfolio:{
            type:String
        }
    },
    AddictionDetails:{
        PerDay:{
            type:Number,
            default:0,
        },
        years:{
            type:Number,
            default:0,
        },
        triedToGiveUp:{
            type:Number,
            default:0
        },
        reason:{
            type:String,
        },
        AvgMoney:{
            type:Number
        }
    },
    DailyTasks:{
        tasks:[taskSchema]
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
},{timestamps:true});

module.exports = new mongoose.model('User',UserSchema);