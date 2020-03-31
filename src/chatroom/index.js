const express = require("express");
const router = new express.Router();


const checkAuth = require("../middleware/jwt_authenticator.js");
const db = require("./controller.js");
const tokenParser = require("../utils/token-parser.js");

router.get("/chatrooms/chatroom", checkAuth, (req, res) => {
    const authUsername = tokenParser(req.headers.authorization).username;
    db.getChatroomList(authUsername, (err, data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

router.post("/chatrooms/chatroom", checkAuth, (req, res) => {
    const authUsername = tokenParser(req.headers.authorization).username;
    db.createChatroom(authUsername, (err, data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

router.post("/chatrooms/join-chatroom", checkAuth, (req, res) => {
    const authUsername = tokenParser(req.headers.authorization).username;
    db.joinChatroom(req.body.chatroom._id, authUsername, (err,data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

router.post("/chatrooms/disable-chatroom", checkAuth, (req,res) => {
    const authUsername = tokenParser(req.headers.authorization).username;
    db.disableChatroom(req.body.chatroom._id, authUsername, (err,data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

router.post("/chatrooms/exit-chatroom", checkAuth, (req, res) => {
    const authUsername = tokenParser(req.headers.authorization).username;
    db.exitChatroom(req.body.chatroom._id, authUsername, (err, data) => {
        if(err) {
            res.status(err.status).send(err.message);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router;