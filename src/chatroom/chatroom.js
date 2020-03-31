const mongoose = require("mongoose");

const chatroomSchema = mongoose.Schema({
    driver_username: String,
    user_list: Array,
    updatedAt: Date,
    live: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

module.exports = {Chatroom};