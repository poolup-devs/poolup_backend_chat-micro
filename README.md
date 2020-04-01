# PoolUp Backend - chat microservice

main service: https://github.com/poolup-devs/poolup_backend

This is the backend code repository for PoolUp's chat feature microservice: made with NodeJS, Express, and MongoDB w/ Mongoose.
For additional guidence/help, email bin315a1@g.ucla.edu or your current Lead Backend Manager.



1. [Setup](#setup)
2. [Documentation](#documentation)

# Setup
After the Local Environment Setup, using **Docker Commands** is advised for application setup & running the application.

The NPM Scripts and Local Development Setup is listed below for additional reference.

1. [Local Environment Setup](#local-environment-setup)
2. [Running Docker](#running-docker)
3. [Npm Scripts](#npm-scripts)
4. [Local Development Setup](#local-development-setup)
5. [Additional Tools](#additional-tools)
6. [Directory Structure](#directory-structure)

## Local Environment Setup

1. Install nodeJS by following installation guides from https://nodejs.org/en/download/
2. Clone the repository to your local environment using `git clone https://github.com/poolup-devs/poolup_backend.git`
3. Install all used packages and dependencies using:
   > npm install
4. To connect to the development s3 bucket, run:

   > npm run setup

   This creates the files dev.env and test.env and places it in a directory named config in the root directory. There, enter the bucket name, access key, the secret access key, and the MongoDB database URL assigned from the engineering manager and save.

   !!!Make sure NOT to remove .env in .gitignore; publishing access keys publically causes bigger problems!!!

5. Install mongoDB by following installation guides from:
   Mac: https://treehouse.github.io/installation-guides/mac/mongo-mac.html
   Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

   This is different from the npm package listed in package.json: which is the driver that connects the DB to the nodeJS app.
   For choosing the inital db location, just use the default --dbpath=/data/db to prevent future confusion

---

## Running Docker 
**(Not implemented yet, disregard this portion; Use NPM scripts listed below)**


Currently the latest version of the app uses 3 docker containers:
1. web : main PoolUp application container
2. mongo : mongodb database container
3. mongo_seed : a database seeder that is removed upon creation, after db seeding

- All dockerfiles should be located under `/dockerfiles`, within a designated directory

- Docker conatainers and Docker networks is configured and maintained with docker-compose, with:
`docker-compose.yml`

- The local source code volume will be mounted on web container's volume; any changes made to the code will be accounted for in the container (there is no need to build everytime there's a change in code)

- However, if additional JS library needs to be installed, config files are changed, or etc, image should be built again before running docker compose

### Docker Commands

#### 1. Building the initial docker images
    > docker-compose build

#### 2. Run docker compose:
    > docker-compose up

Application is now running in port 3001

---

## NPM Scripts

1. Starting the NodeJS app

   > npm start

   Starts up the server by running `node src/server.js` with environment variables defined in dev.env.

2. Start Dev. mode of the NodeJS app

   > npm run dev

   Similar to npm start, but runs nodemon to automatically restart the node application when file chnages in the directory are detected

3. Setup .env variables

   > npm run setup

   Generates the config folder with env files. This is explained in [the next step](#local-environment-setup)

   Do NOT run this script twice; the second run will overwrite the env files, erasing the entered credentials

4. Run Test Scripts

   > npm run demo

   The demo run seeds the database, runs the backend server, and runs a demo front-end chat app at localhost:3001. As the server starts, it'll list the demo chatroom's chatroom_id and 3 users' usernames and authtokens that can be used to login to the demo front-end app. (Open two browser tabs and login to the same chatrooms, but with different user's authtokens)

5. Initialize database with default creations

   > npm run init_db

   Removes all documents in all the collections, and initializes the database with default objects.

---



## Local Development Setup 

**(for additional reference)**

1. Open a terminal, and run the command `mongod` to start the mongodb daemon - may have to run `sudo mongod` for permission purposes
2. Open another terminal and run `npm run dev` in the home directory; this starts the backend application with nodemon
3. The local backend development port is set to 3001, now use Postman to test API endpoints.

---

## Additional Tools

1. Install Postman to test backend REST APIs
   Here's a link to a sample set of HTTP requests w/Postman: press the import button on upper left, and use the url https://www.getpostman.com/collections/bcd0df61c8abfc805865
2. Install Robo 3T for mongoDB GUI and create a new connection to the DB using port 27017, the default mongoDB port

---

## Directory Structure

```
.
|   .gitignore
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|
+---config
|       .env-cmdrc
+---setup
|       .sample_env
|       init_db_demo.js
|       setup.js
+---public
|       index.html
+---public_demo
|   |   index.html
|   |   chat.html
|   +---css/
|   +---img/
|   +---js/
|
+---src
|   |   app.js
|   |   server.js
|   |
|   +---db
|   |       mongoose.js
|   |
|   +---middleware
|   |       jwt_authenticator.js
|   |
|   +---message
|   |       controller.js
|   |       index.js
|   |       message.js
|   |       socket.js
|   |
|   +---chatroom
|   |       controller.js
|   |       index.js
|   |       chatroom.js
|   |
|   \---utils
|           token-parser.js
|           controller-errorPacket
\
```

---

# Documentation

## Auth Tokens

For all API requests, the bearer token must be included in headers for authorization/ username extraction.

| Key           | Value               |
| ------------- | ------------------- |
| Authorization | Bearer [Auth token] |

There must be a white space between the string "Bearer" and the token string

## Models & API Endpoints Documentation

Models:

1. [Message](#message-model)
2. [Chatroom](#chatroom-model)

---

### Message Model

### Schema

| column      | type    | required | properties                    |        
| ----------- | ------- | -------- | ----------------------------- | 
| chatroom_id | String  | Yes      |                               | 
| owner_username       | String  |  Yes     |                user that sent the message               |                        
| content    | String  | Yes      |     The actual message being sent                          |                       
| createdAt | Date  |   Yes     |                               |                    

### API Endpoints

| url                          | HTTP Method | description                                                        |
| ---------------------------- | ----------- | ------------------------------------------------------------------ |
| /messages/chatroom-message                 | GET        | [Get all messages](#get-all-messages)                                          |
| /messages/chatroom-message              | DELETE        | [Delete Message](#delete-message)                                        |

---

### Get all messages

GET request

**body**
```
{
	"chatroom":
    {
        "user_list": [
            "sampleUser1",
            "sampleUser2",
        ],
        "live": true,
        "createdAt": "2020-03-31T07:29:53.986Z",
        "_id": "5e82f172a480a77d6b73357c",
        "driver_username": "sampleUser1",
        "updatedAt": "2020-03-31T07:29:53.986Z",
        "__v": 0
    }
}
```


**return value**

200 status, list of all message objects in the chat room

```
[
    {
        "createdAt": "2020-03-31T07:30:29.028Z",
        "_id": "5e82f195a480a77d6b73357d",
        "chatroom_id": "5e82f172a480a77d6b73357c",
        "owner_username": "sampleUser1",
        "content": "Hi bro",
        "__v": 0
    },
    {
        "createdAt": "2020-03-31T07:30:31.354Z",
        "_id": "5e82f197a480a77d6b73357e",
        "chatroom_id": "5e82f172a480a77d6b73357c",
        "owner_username": "sampleUser2",
        "content": "hey",
        "__v": 0
    }
]
```

---

### Delete Message

DELETE request

**Body**

```
    {
        "createdAt": "2020-03-31T07:30:29.028Z",
        "_id": "5e82f195a480a77d6b73357d",
        "chatroom_id": "5e82f172a480a77d6b73357c",
        "owner_username": "user1",
        "content": "Hi bro",
        "__v": 0
    }
```

**return value**

200 status, the message object that was deleted

---

### Chatroom Model

### Schema

| column      | type    | required | properties                    |        
| ----------- | ------- | -------- | ----------------------------- | 
| driver_username | String  | Yes      |                               | 
| user_list       | Array  |  Yes    |               List of users in the chatroom (including the driver of the ride)                 |                        
| updatedAt    | Date  | Yes      | The last time that a new message was sent/ deleted in the chatroom |                       
| createdAt | Date  |   Yes    |                               |                    
| live | Boolean  | Yes      |  Indicates if the chatroom is disabled or not   | 

### API Endpoints

| url                          | HTTP Method | description                                                        |
| ---------------------------- | ----------- | ------------------------------------------------------------------ |
| /chatrooms/chatroom                 | GET        | [Get Chatrooms](#get-chatrooms)                                          |
| /chatrooms/chatroom              | POST        | [Create Chatroom](#create-chatroom)                                        |
| /chatrooms/join-chatroom              | POST        | [Join Chatroom](#join-chatroom)                                        |
| /chatrooms/disable-chatroom              | POST        | [Disable Chatroom](#disable-chatroom)                                        |
| /chatrooms/exit-chatroom              | POST        | [Exit Chatroom](#exit-chatroom)                                        |

---

### Get Chatrooms

GET request

**params**
None

**return value**

200 status, list of all chatroom object that the currently logged in user is in

```
[
    {
        "user_list": [
            "user1",
            "user_rider1",
            "user_rider2"
        ],
        "live": true,
        "createdAt": "2020-03-31T07:41:44.199Z",
        "_id": "5e82f438887e8f7e723c4bcb",
        "driver_username": "user1",
        "updatedAt": "2020-03-31T07:41:44.199Z",
        "__v": 0
    }
]
```

---

### Create Chatroom

POST request

**params**
None

**return value**

200 status, the chatroom object that was created

```
{
    "user_list": [
        "user1"
    ],
    "live": true,
    "createdAt": "2020-04-01T05:12:01.042Z",
    "_id": "5e8422a160c548982e94bfdc",
    "driver_username": "user1",
    "updatedAt": "2020-04-01T05:12:01.042Z",
    "__v": 0
}
```

---

### Join Chatroom

POST request

**body**
Requires a formatted body with the chatroom object that is selected to be joined; Notice the "chatroom" key

```
{
	"chatroom":  
	{
	    "user_list": [
	        "user1"
	    ],
	    "live": true,
	    "createdAt": "2020-03-31T05:44:21.984Z",
	    "_id": "5e82d8b525ca7b76b515ddfa",
	    "driver_username": "user1",
	    "updatedAt": "2020-03-31T05:44:21.984Z",
	    "__v": 0
	}
}
```

**return value**

200 status, the chatroom object that the user joined

```
{
    "user_list": [
        "user1",
        "user_rider1"
    ],
    "live": true,
    "createdAt": "2020-04-01T05:15:31.449Z",
    "_id": "5e84237360c548982e94bfdd",
    "driver_username": "user1",
    "updatedAt": "2020-04-01T05:15:31.449Z",
    "__v": 0
}
```

---


### Disable Chatroom

POST request

**body**
Requires a formatted body with the chatroom object that is selected to be disabled; Notice the "chatroom" key

```
{
	"chatroom":  
	{
	    "user_list": [
	        "user1"
	    ],
	    "live": true,
	    "createdAt": "2020-03-31T05:44:21.984Z",
	    "_id": "5e82d8b525ca7b76b515ddfa",
	    "driver_username": "user1",
	    "updatedAt": "2020-03-31T05:44:21.984Z",
	    "__v": 0
	}
}
```

**return value**

200 status, the chatroom object that the user disabled

```
{
    "user_list": [
        "user1",
        "user_rider1"
    ],
    "live": false,
    "createdAt": "2020-04-01T05:15:31.449Z",
    "_id": "5e84237360c548982e94bfdd",
    "driver_username": "user1",
    "updatedAt": "2020-04-01T05:15:31.449Z",
    "__v": 0
}
```

---

### Exit Chatroom

POST request

**body**
Requires a formatted body with the chatroom object that is selected to be exit; Notice the "chatroom" key

```
{
	"chatroom": 
    {
        "user_list": [
            "user1",
            "user_rider1"
        ],
        "live": false,
        "createdAt": "2020-04-01T05:15:31.449Z",
        "_id": "5e84237360c548982e94bfdd",
        "driver_username": "user1",
        "updatedAt": "2020-04-01T05:15:31.449Z",
        "__v": 0
    }
}
```

**return value**

200 status, the chatroom object that the user exited

```
{
    "user_list": [
        "user1"
    ],
    "live": false,
    "createdAt": "2020-04-01T05:15:31.449Z",
    "_id": "5e84237360c548982e94bfdd",
    "driver_username": "user1",
    "updatedAt": "2020-04-01T05:15:31.449Z",
    "__v": 0
}
```

---