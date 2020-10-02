const express = require('express');
const Message = require('../models/messageModel.js');
const User = require('../models/usersModel.js');
const router = express.Router();

router.post('/sendChat', (req, res) => {
   const newMsg = new Message({
       sender: req.body.authUser,
       message: req.body.chatMsg
   })
   newMsg.save().then(() => {
        User.findOne({username: req.body.authUser}).then((auth) => {
            Message.find({ $or: [ { sender: auth.username }, { sender: { $in: auth.friends } } ] }).then((messages) => {
                res.status(200).json({messages});
            })
        })       
   })
})

router.post('/getAllMsg', (req, res) => {
    User.findOne({username: req.body.authUser}).then((auth) => {
        Message.find({ $or: [ { sender: auth.username }, { sender: { $in: auth.friends } } ] }).then((messages) => {
            res.status(200).json({messages});
        })
    })
})

router.post('/clearChat', (req, res) => {
    User.findOne({username: req.body.authUser}).then((auth) => {
        Message.find({ $or: [ { sender: auth.username }, { sender: { $in: auth.friends } } ] })
        .remove()
        .then(() => {
            res.status(200).json({message: "All messages are deleted!"})
        })
    })
})

module.exports = router;
