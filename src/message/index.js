const express = require("express");
const router = new express.Router();

const db = require("./controller.js");
const checkAuth = require("../middleware/jwt_authenticator.js");

router.get("/messages/chatroom-message", checkAuth, (req, res) => {
    db.getMessageInChatroom(req.body.chatroom._id, (err, data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

// delete message
router.delete("/messages/chatroom-message", checkAuth, (req, res) => {
    db.deleteMessage(req.body.message._id, (err, data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router;