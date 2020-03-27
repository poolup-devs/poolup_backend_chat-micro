const Message = require("./models/message.js").Message;
const Chatroom = require("./models/chatroom.js");

const insertToDB = (chatroom_id, owner_username, content, callback) => {
  const message = 
  {
    chatroom_id: chatroom_id,
    owner_username: owner_username,
    content: content
  }
    Message.create({message}, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
    });
}

const getAllHistory = (chatroom_id, username, callback) => {
  Message.find({}, (err, res) => {
    callback(null, res);
  })
}

module.exports = {
    insertToDB,
    getAllHistory
}