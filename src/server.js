require('./db/mongoose')

const {express, app, http, io} = require("./app.js");

const path = require("path");
const chalk = require("chalk");
require("dotenv").config({override:true});

require("./message/socket.js");

const port = process.env.PORT || 3001;
const mode = process.env.MODE;

// Demo version, serving interactive website
if(mode == "DEMO"){
  const public_dir_path = path.join(__dirname, "../public_demo");
  app.use(express.static(public_dir_path));

  const chatroom_seed = require("../init_db_demo.js");
  chatroom_seed();

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });
}

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/../public/index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

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
