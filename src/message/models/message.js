const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  chatroom_id: String,
  owner_username: String,
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Message = mongoose.model("Message", messageSchema)

module.exports = {Message};