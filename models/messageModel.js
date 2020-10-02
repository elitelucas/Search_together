const { text } = require('body-parser');
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        max: 1000000
    },
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;
