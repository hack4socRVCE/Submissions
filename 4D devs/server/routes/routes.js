const express = require("express");
const Register = require("../controllers/Register");
const Login = require("../controllers/Login");
const Logout = require("../controllers/Logout");
const Verifytoken = require("../middlewares/verifyAuth");
const { getUser } = require("../controllers/getUser");
const { addBlog, getBlogs } = require("../controllers/uploadBlog");
const userController = require("../controllers/updateTaskScore");
const updateDailyTaskDone = require("../controllers/updateLevelScore");
const getUsersByAddictType = require("../controllers/getUsers");
const {
  getScheduledMeetings,
  scheduleMeetings,
} = require("../controllers/meetings");
const {
  addLiveMeetings,
  getLiveMeetings,
} = require("../controllers/liveMeetings");
const {AlertAgency} = require("../controllers/emergency");
const GPTNextDay = require("../controllers/AITasks/updateNextDay");
const route = express.Router();
//Post Requests
route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", Verifytoken, Logout);
route.post("/uploadBlog", addBlog);
route.post("/updateTaskScore/:userId", userController.updateTaskScore);
route.post('/updateNextDay',GPTNextDay);
//route.post("/users/updateDailyTaskDone/:userId", updateDailyTaskDone);
route.post("/scheduleMeeting", scheduleMeetings);
route.post("/addLiveMeeting", addLiveMeetings);
route.post('/emergencyCall',AlertAgency)

//Get Requests
route.get("/getUserDetails", Verifytoken, getUser);
route.get("/getBlogs", getBlogs);
route.get("/users/:addictType", getUsersByAddictType);
route.get("/getScheduledMeetings", getScheduledMeetings);
route.get("/getLiveMeetings", getLiveMeetings);

module.exports = route;
