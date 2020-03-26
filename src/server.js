require('./db/mongoose')

const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require("socket.io")(http);

const path = require("path");
const chalk = require("chalk");
require("dotenv").config({override:true});

const port = process.env.PORT || 3001;
const mode = process.env.MODE;

// Demo version, serving interactive website
if(mode == "DEMO"){
  const public_dir_path = path.join(__dirname, "../public_tester");
  app.use(express.static(public_dir_path));

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });
}

console.log(
  chalk.green("[INIT]: Service is in ") +
    chalk.yellow(mode) +
    " MODE"
);

http.listen(port, () => {
  console.log(
    chalk.green("[INIT]: ") + "Server Listening on Port " + chalk.yellow(port)
  );
});

io.on("connection", (socket)=> {
    console.log("Connection Established");
})
