const Message = require("./message.js").Message;
const Chatroom = require("../chatroom/chatroom.js").Chatroom;

const errpkt = require("../utils/controller-errorPacket.js");

const createMessage = (chatroom_id, owner_username, content, callback) => {
  const message = 
  {
    chatroom_id: chatroom_id,
    owner_username: owner_username,
    content: content,
    createdAt: new Date()
  };
    Message.create(message, (err, res) => {
        if (err) {
          callback(errpkt(500, err), null);
        } else {
          Chatroom.updateOne({chatroom_id}, {updatedAt: new Date()}, (_err, _res) => {
            if(_err) {
              callback(errpkt(500, _err), null);
            } else {
              callback(null, res);
            }
          })
        }
    });
}

const getMessageInChatroom = (chatroom_id, callback) => {
  Message.find({chatroom_id}, (err, res) => {
    if (err) {
      callback(errpkt(500, err),null);
    } else {
      callback(null, res);
    }
  }).sort({createdAt: 1})
}

const deleteMessage = (_id, callback) => {
  Message.findByIdAndDelete(_id, (err, res) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = {
    createMessage,
    getMessageInChatroom,
    deleteMessage
}