const mongoose = require("mongoose");

const chatroomSchema = mongoose.Schema({
    driver_username: String,
    passenger_list: Array,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = {Chatroom};