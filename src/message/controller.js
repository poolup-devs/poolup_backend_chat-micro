const Message = require("./message.js").Message;
const Chatroom = require("../chatroom/chatroom.js").Chatroom;

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
          callback(err, null);
        } else {
          Chatroom.updateOne({chatroom_id}, {updatedAt: new Date()}, (err_, res_) => {
            if(err_) {
              callback(err, null);
            } else {
              callback(null, res);
            }
          })
        }
    });
}

const getMessageHistory = (chatroom_id, callback) => {
  console.log("called with" + chatroom_id)
  Message.find({chatroom_id}, (err, res) => {
    if (err) {
      callback(err,null);
    } else {
      callback(null, res);
    }
  }).sort({createdAt: 1})
}

const deleteMessage = (_id, callback) => {
  console.log(_id)
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
    getMessageHistory,
    deleteMessage
}