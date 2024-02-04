const express = require('express');
const routes = express.Router();

const Verifytoken = require('../middlewares/verifyAuth');
const fetchChats = require('../controllers/ChatControllers/fetchChats');
const createGroupChat = require('../controllers/ChatControllers/createGroupChat');
const {sendMessage} = require('../controllers/MessgaeControllers/SendMessages');
const allMessages = require('../controllers/MessgaeControllers/allMessages');
const addToGroup = require('../controllers/ChatControllers/addToGroup');


//Post Requests
routes.post('/createGroup',Verifytoken,createGroupChat);
routes.get('/fetchUserChats',Verifytoken,fetchChats);

//put Requests
routes.post('/addToGroup',addToGroup);

//Messaging Routes
//post Requests
routes.post('/sendMsg',Verifytoken,sendMessage);

//Get requests
routes.get('/getMsg/:chatID',Verifytoken,allMessages)


module.exports = routes;

