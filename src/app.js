const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

const bodyParser = require("body-parser")

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const messageRouter = require("./message/index.js");
const chatroomRouter = require("./chatroom/index.js");

app.use(messageRouter);
app.use(chatroomRouter);

module.exports = {
    express,
    app,
    http,
    io
}
