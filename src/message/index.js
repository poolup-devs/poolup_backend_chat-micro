const express = require("express");
const router = new express.Router();

const db = require("./controller.js");
const checkAuth = require("../middleware/jwt_authenticator.js");

router.get("/messages/chatroom-history", checkAuth, (req, res) => {
    db.getMessageHistory(req.query.chatroom_id, (err, data) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).send(data);
        }
    })
})

// delete message (?)
router.delete("/messages/chatroom-history", checkAuth, (req, res) => {
    db.deleteMessage(req.query._id, (err, data) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).send({data});
        }
    })
})

module.exports = router;