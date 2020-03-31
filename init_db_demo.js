require("./src/db/mongoose.js");
const jwt = require("jsonwebtoken");
const chalk = require("chalk")

const Chatroom = require("./src/chatroom/chatroom.js").Chatroom;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const JWT_SECRET_KEY = "E710E73E4A6A87286F4867761FEE9ED124544B86EB8E0C22E38B90ED27035A95";
const usernames = ["user1", "user_rider1", "user_rider2"];
const user1 = {
    username: usernames[0],
    authToken: jwt.sign({username: usernames[0]}, JWT_SECRET_KEY, {
        expiresIn: "24h"
    })
}
const user_rider1 = {
    username: usernames[1],
    authToken: jwt.sign({username: usernames[1]}, JWT_SECRET_KEY, {
        expiresIn: "24h"
    })
}
const user_rider2 = {
    username: usernames[2],
    authToken: jwt.sign({username: usernames[2]}, JWT_SECRET_KEY, {
        expiresIn: "24h"
    })
}

const users = [user1, user_rider1, user_rider2];

const chatroom_demo = {
    driver_username: user1.username,
    passenger_list: [user_rider1.username, user_rider2.username]
}

const chatroom_seed = () => {
    return Chatroom.deleteMany({}).then((res, err) => {
        try{
            Chatroom.create(chatroom_demo).then((chatroom) => {
                console.log(chalk.green("[DB_INIT]: ") + "Successfully initialized developement database with a Chatroom");
                console.log(chalk.green("[DB_INIT]: ") + "chatroom id: " + chalk.yellow(chatroom._id));
                for( i in users ){
                    console.log(chalk.magenta("\tusername:\t" + users[i].username));
                    console.log(chalk.cyan("\tauthToken: \t"+ users[i].authToken));
                }
                // process.exit(0);
            })
        } catch(e) {
            console.log(chalk.red("[ERROR]: ")+"Could not delete all existing documents in User")
            process.exit(1);
        }
    })
}

module.exports = chatroom_seed;