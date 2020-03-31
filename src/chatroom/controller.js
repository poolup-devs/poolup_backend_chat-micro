const mongoose = require("mongoose");

const Chatroom = require("../chatroom/chatroom.js").Chatroom;
const errpkt = require("../utils/controller-errorPacket");

const getChatroomList = (authUsername, callback) => {
    Chatroom.find({user_list: authUsername}, (err, res) => {
        if(err) {
            callback(errpkt(500, err), null);
        } else {
            callback(null, res);
        }
    }).sort({updatedAt: 1})
}

const createChatroom = (driver_authUsername, callback) => {
    const chatroom = {
        driver_username: driver_authUsername,
        user_list: [driver_authUsername],
        updatedAt: new Date(),
        createdAt: new Date()
    };
    Chatroom.create(chatroom, (err, res) => {
        if (err) {
            callback(errpkt(500, err), null);
        } else {
            callback(null, res);
        }
    });
}

const joinChatroom = (chatroom_id, authUsername, callback) => {
    try {
        var _id = mongoose.Types.ObjectId(chatroom_id)
    } catch(e) {
        callback(errpkt(400, "ERROR: invalid _id given, parsing error"), null);
        return;
    }
    Chatroom.findByIdAndUpdate(_id, {$addToSet: {user_list: authUsername}}, {new: true}, (err, res) => {
        if(err) {
            callback(errpkt(500, err), null);
        } else {
            if(res){
                callback(null, res);
            } else {
                callback(errpkt(404, "ERROR: chatroom not found"), null);
            }
        }
    });
}

// if request is denied/cancelled, if ride is cancelled by Driver
const disableChatroom = (chatroom_id, driver_authUsername, callback) => {  // driver's functionality
    try {
        var _id = mongoose.Types.ObjectId(chatroom_id)
    } catch(e) {
        callback(errpkt(400, "ERROR: invalid _id given, parsing error"), null);
        return;
    }
    Chatroom.findById(_id, (err, res) => {
        if(err) {
            callback(errpkt(500, err), null);
        } else {
            if(res) {
                if(res.driver_username == driver_authUsername) {
                    Chatroom.findByIdAndUpdate(chatroom_id, {live: false}, {new: true}, (_err, _res) => {
                        if(_err) { 
                            callback(errpkt(500, _err), null);
                        } else {
                            callback(null, _res);
                        }
                    });
                } else {
                    callback(errpkt(401, "ERROR: Unauthorized authtoken"), null)
                }
            } else {
                callback(errpkt(404, "ERROR: chatroom not found"), null);
            }
        }
    })
}

// if the ride is cancelled by rider, 
const exitChatroom = (chatroom_id, authUsername, callback) => {
    try {
        var _id = mongoose.Types.ObjectId(chatroom_id)
    } catch(e) {
        callback(errpkt(400, "ERROR: invalid _id given, parsing error"), null);
        return;
    }
    Chatroom.findById(_id, (err, res) => {
        if(err) {
            callback(errpkt(500, err), null);
        } else {
            if(res) {
                if(res.driver_username == authUsername) {
                    callback(errpkt(400, "ERROR: the driver cannot leave the chatroom"));
                } else {
                    Chatroom.findByIdAndUpdate(_id, {$pull: {user_list: authUsername}}, {new: true}, (_err, _res) => {
                        if(_err) {
                            callback(errpkt(500, _err), null);
                        } else {
                            callback(null, _res);
                        }
                    });
                }
            } else {
                callback(errpkt(404, "ERROR: chatroom not found"), null);
            }
        }
    })
}

module.exports = {
    createChatroom,
    joinChatroom,
    getChatroomList,
    disableChatroom,
    exitChatroom
}
