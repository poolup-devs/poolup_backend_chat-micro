const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const db = require("./controller.js");
const io = require("../app.js").io;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateMessage = ( username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

io.on("connection", (socket)=> {
    chalk.green("[NETWORK]: New Websocket Connection Established");

    var chatroom_id = "";
    var _username = "";
    socket.on("join", ({username, room}, callback) =>{
        chatroom_id = room;
        _username = jwt.verify(username, JWT_SECRET_KEY).username
        // console.log(_username)
        // console.log(chatroom_id)
        socket.join(chatroom_id)       //allows to join the given chatroom of the room name
        // socket.emit("message", generateMessage("Admin", "Welcome!"))
        
        // socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`))

        callback()
    })    

    // socket.on("join", ({authToken, chatroom_id}, callback) =>{

    //     if (error) {
    //         return callback(error)
    //     }

    //     socket.join(user.room)       //allows to join the given chatroom of the room name
        
    //     socket.emit("message", generateMessage("Admin", "Welcome!"))
        
    //     socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`))

    //     callback()
    // })

    socket.on("sendMessage", (message, callback) => {
        // console.log(chatroom_id)
        // const user = getUser(socket.id)
        // const filter = new Filter()
        // if(filter.isProfane(message)) {
        //     return callback('Profanity is NOT ALLOWED')
        // }
        // db.insertToDB(message, (err, data) => {
        //     if (err) {
        //         console.log("Error")
        //     }
        // })
        // io.to(chatroom_id).emit("message", {_username, message, createdAt: new Date().getTime()});
        db.createMessage(chatroom_id, _username, message, (err, data) => {
            if(err) {
                console.log("[ERROR]: db.createMessage() failure")
            }
        })
        io.to(chatroom_id).emit("message", generateMessage(_username, message));
        callback()
    })

//     socket.on("increment", () => {
//         count++;
// //        socket.emit("countUpdated", count)            // emits only to the specific connection
//         io.emit("countUpdated", count)                 // emits to all the connections in the io group
//     })

//     socket.on("sendLocation", (coords, callback)=>{
//         // const user = getUser(socket.id)
//         io.to(user.room).emit("locationMessage", generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
//         callback()
//     })

    // socket.on("disconnect", () => {                         // notice that Connection is done w/ io.on(), but this is w/ socket.on()
    //     // const user = removeUser(socket.id)
    //     if(user) {
    //         io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left!`))
    //     }
    // })
});