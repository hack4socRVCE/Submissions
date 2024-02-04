const User = require("../models/UserModel");
const GPT = require("./AITasks/AIModel");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const Register = async (req, res) => {

    const {
        username,
        phonenumber,
        email,
        age,
        addictType,
        gender,
        isCounselor,
        password,

        PerDay,
        years,
        triedToGiveUp,
        reason,

        CounselorLicenseNumber,
        Specialization,
        Experience,
        WorkingIn,
        Portfolio,
    } = req.body;


    try {
        const exsistingEmail = await User.findOne({ email: email });
        if (exsistingEmail) return (res.status(400).json({ message: 'Email Already Registered' }))
    } catch (error) {
        throw new Error(error.message)
    }

    const hashedPass = bcrypt.hashSync(password)

    const USerObj = {
        username,
        phonenumber,
        email,
        age,
        addictType,
        gender,
        isCounselor,
        password: hashedPass,
    };

    const CounselorObj = {
        CounselorLicenseNumber,
        Specialization,
        Experience,
        WorkingIn,
        Portfolio
    }

    const AddictionDetails_Obj = {
        PerDay,
        years,
        triedToGiveUp,
        reason
    }

    

    try {
        if (!isCounselor) {
            const UserData = await User.create({
                ...USerObj,
                AddictionDetails: AddictionDetails_Obj
            });
            try {
                await GPT(PerDay,years,triedToGiveUp,reason,addictType,email);
            } catch (error) {
                console.log("Error in Calling GPT Function in Node");
            }
            return res.status(201).json({
                UserData: UserData
            })
        }
        const allDetailsPresent = CounselorLicenseNumber && Specialization;
        if (allDetailsPresent) {
            const UserData = await User.create({
                ...USerObj,
                counselorDetails: CounselorObj
            });
            try {
                await GPT(PerDay,years,triedToGiveUp,reason,addictType,email);
            } catch (error) {
                console.log("Error in Calling GPT Function in Node");
            }
            return res.status(201).json({
                UserData: UserData,
            });
        } else {
            const error = {
                message: "CounselorLicenseNumber and Specialization are required!",
                status: 400,
            };
            return res.status(error.status).json(error);
        }

    } catch (error) {
        throw new Error(error.message);
    }

}
module.exports = Register;