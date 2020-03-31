# PoolUp Backend - chat microservice

main service: https://github.com/poolup-devs/poolup_backend

This is the backend code repository for PoolUp's chat feature microservice: made with NodeJS, Express, and MongoDB w/ Mongoose.
For additional guidence/help, email bin315a1@g.ucla.edu or your current Lead Backend Manager.



1. [Setup](#setup)
2. [Dev-Rules](#dev-rules)
3. [Documentation](#documentation)
4. [Deployment](#deployment) - Temporarily Deprecated

# Setup
After the Local Environment Setup, using **Docker Commands** is advised for application setup & running the application.

The NPM Scripts and Local Development Setup is listed below for additional reference.

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

---

## NPM Scripts (for additional reference)
Use Docker commands for 

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

   > npm run test

   We are using [Jest](https://www.npmjs.com/package/jest) to test our JS code.
   Run tests related to changed files based on Git (uncommitted files).
   Uses the test.dev environment variables.

5. Initialize database with default creations

   > npm run init_db

   Removes all documents in all the collections, and initializes the database with default objects.
   Currently only removes and creates from User collection.

---



## Local Development Setup (for additional reference)

1. Open a terminal, and run the command `mongod` to start the mongodb daemon - may have to run `sudo mongod` for permission purposes
2. Open another terminal and run `npm run dev` in the home directory; this starts the backend application with nodemon
3. The local backend development port is set to 3000, now use Postman to test API endpoints.

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
|   .sample_env
|   init_db.js
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   setup.js
|   docker-compose.yml
|
+---config
|       .env-cmdrc
+---dockerfiles
|       main
|       mongo_seed
|
+---src
|   |   app.js
|   |   server.js
|   |
|   +---db
|   |       awsS3_controller.js
|   |       mongoose.js
|   |
|   +---middleware
|   |       cors_origin_control.js
|   |       jwt_authenticator.js
|   |
|   +---noti
|   |       controller.js
|   |       index.js
|   |       noti.js
|   +---request
|   |       controller.js
|   |       index.js
|   |       noti.js
|   |
|   +---ride
|   |       controller.js
|   |       index.js
|   |       ride.js
|   |
|   +---user
|   |       controller.js
|   |       index.js
|   |       user.js
|   |
|   \---utils
|           token-parser.js
|
\---tests
    \---user
            rating.test.js
```

---

# Dev-Rules

## Creating a new branch

**Naming Branches**

<nameOfCreator>-<feature/issuename>-<creationdate(mmddyyyy)>

ex) han-messagingFeature-12302019

## Posting Git Issues

**Formatting**

Copy and use the following format:

\*\*CURRENT ISSUE\*\*

Describe the reasoning of the new feature or the change in the current feature

\*\*TODO\*\*

Descriptively list out required tasks

\*\*POTENTIAL CONFLICTS/ ALTERNATIVES\*\*

Explain potential conflicts that may arise with the current code base, issues that should be discussed with the initial creator, and alternative solutions (if there exists)

\*\*ADDITIONAL COMMENT\*\*

Additional Comment

## Using Postman

## Using POSTMAN

We use a single account that is shared by everyone. Ask for PoolUp's dev gmail credential, login, and use the collection located in it.

**Creating a Postman Request**

All the requests under the workspace collection inherits a authToken variable automatically via a pre-request script;

When creating each requests:

- If authToken is required, go to the Authorization tab of the request, and select "inherit auth from parent" under the TYPE tab; no further authToken has to be passed through Headers
- The pre-request scripts are set to use "user1" (defined in init_db.js):
- Since it's a shared account, be wise when overwriting/saving a request

```
{
    "username":"admin",
    "email":"admin-noreply@g.ucla.edu",
    "password":"password"
}
```

- If you want to login as another user, use the login API to retrieve the authToken, set Authorization to "No Auth", and pass the authToken in the header file instead and follow the Auth Tokens syntax explained under Documentation below. **DO NOT** save the configuration into the Postman collection, as the default config should remain using the parent-inherited-variables

---

# Documentation

## Auth Tokens

For all API requests after login, the bearer token must be included in headers for authorization/ username extraction.

| Key           | Value               |
| ------------- | ------------------- |
| Authorization | Bearer [Auth token] |

There must be a white space between the string "Bearer" and the token string

## Models & API Endpoints Documentation

Models:

1. [User](#user-model)
2. [Ride](#ride-model)
3. [Noti](#noti-model)
4. [Review](#review-model)
5. [Request](#request-model)

---

### User Model

### Schema

| column      | type    | required | properties                    |        
| ----------- | ------- | -------- | ----------------------------- | 
| name        | String  | Yes      |                               | 
| email       | String  | Yes      |                               |                        
| username    | String  | Yes      |                               |                        
| password    | String  | Yes      |                               |                       
| phoneNumber | String  |          |                               |                        
| driverList  | Array   |          |                               |                        
| riderList   | Array   |          |                               |                        
| picUrl      | String  |          |                               |                        
| picType     | String  |          |                               |                        
| Verified    | Boolean | Yes      |                               |      
| rating      | Object  |          | sumOfAllRatings, totalRatings |                           


### API Endpoints

| url                          | HTTP Method | description                                                        |
| ---------------------------- | ----------- | ------------------------------------------------------------------ |
| /users/login                 | POST        | [User Login](#user-login)                                          |
| /users/signup                | POST        | [User Signup](#user-signup)                                        |
| /users/verify                | GET         | [Send a verification Email for signup](#email-verification)        |
| /users/emailValidation       | GET         | [Validation/usability of Email](#email-validation)                 |
| /users/usernameValidation    | GET         | [Validation/usability of a username](#username-validation)         |
| /users/phoneNumberValidation | GET         | [Validation/usability of a phone number](#phone-number-validation) |
| /users/upload-profile-pic    | PATCH       | [upload a user profile image](#upload-profile-image)               |
| /users/usersPic              | GET         | [Get a user's profile image](#get-profile-image)                   |
| /users/updateUser            | PATCH       | [Update a user's name or phonenumber](#update-user)                |
| /users/deleteUser            | DELETE      | [Delete a user account](#delete-user)                              |
| /users/checkCredential       | POST        | [Check a user's password before changing it](#check-credential)    |
| /users/changePassword        | PATCH       | [Change a user's password](#change-password)                       |
| /users/my-info               | GET         | [Get my account's information](#my-info)                           |
| /users/get-rating            | GET         | [Get a user's rating](#get-rating) 

---

### User Login

##### Initial Login:

POST request

DOES NOT require a Bearer token; after this signup, the authToken contains information of the user & lifetime of the token

**body**

```
{
	"email": "bin315a1@gmail.com",
	"password":"bin315a1"
}
```

**return value**

200 status,

```
{
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpbjMxNWExIiwiaWF0IjoxNTY1ODk2NzQzLCJleHAiOjE1NjU5MDAzNDN9.OLcXkfZWrTDo4r_VXK9sjOh7pa5--E1wRs7r0X-mK0I"
}
```

### User Signup

POST request

Only requiremetn for user signup is password and username; the email username + "@g.ucla.edu"; the frontend code should substring-ize the email and pass only the username part for the API call

ex) the username for bin315a1 would become bin315a1@g.ucla.edu

- Verifying the email should be done within the **30** minutes after signup; else the user must signup again
- A profile pic of Bruinbear with random color is assigned

**Body**

```
{
	"password": "samplePassword1",
	"username":"bin315a1"
}
```

**return value**

201 status,

```
Created
```

A confirmation email is sent, which contains a link the link: https://bruinpool.io/users/verify?token=TOKENATTACHEDHERE , with a email verification token attached on the url as query

---

### Email Verification

GET request

This is different from an "Email VALIDATION", since this is "verifying" that the user has the email that it claims to have

**params**

token

**example**

localhost:3000/users/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlhbWJyeWFuLmxlZUBnbWFpbC5jb20iLCJpYXQiOjE1NjU1ODIxMDUsImV4cCI6MTU2NTY0MjEwNX0.78CKxrCkfidoby-iYDKKe5_KQR4BKIV4D6LI4koHKEQ

**return value**

200 status, returns a redirection to https://bruinpool.io/login where the user can now login with the verified email & password

---

### Email Validation

Get request

**params**

email

**example**

localhost:3000/users/emailValidation?email=bin315a1@g.ucla.edu

**return value**

200 status, array of user objects with that email

```
[
    {
        "driverList": [],
        "riderList": [],
        "verified": true,
        "_id": "5d55af9f4c5458138f2efa85",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "username": "bin315a1",
        "name": "Han",
        "email": "bin315a1@g.ucla.edu",
        "__v": 0
    }
]
```

---

### Username Validation

GET request

**params**

username

**example**

localhost:3000/users/usernameValidation?username=bin315a1

**return value**

200 status, array of user objects with that username

```
[
    {
        "driverList": [],
        "riderList": [],
        "verified": true,
        "_id": "5d55af9f4c5458138f2efa85",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "username": "bin315a1",
        "name": "Han",
        "email": "bin315a1@g.ucla.edu",
        "__v": 0
    }
]
```

---

### Phone Number Validation

GET request

**params**

phoneNumber

**example**

localhost:3000/users/phoneNumberValidation?phoneNumber=1231231234

**return value**

200 status, array of user objects with that phoneNumber

---

### Upload Profile Image

PATCH request

**Body**

```
{
    "file": <img file>
}
```

**return value**

200 status

```
{
    "driverList": [],
    "riderList": [],
    "verified": true,
    "_id": "5d55af9f4c5458138f2efa85",
    "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "username": "bin315a1",
    "name": "Han",
    "email": "bin315a1@g.ucla.edu",
    "__v": 0,
    "picType": "jpg",
    "picUrl": "https://bruinpool-bucket-staging.s3.us-east-2.amazonaws.com/bucketFolder/bin315a1-pic.jpg"
}
```

---

### Get Profile Image

GET request

**params**

username (not id)

**example**

localhost:3000/users/usersPic?username=sampleUser1

**return value**

200 status

```
https://bruinpool-bucket-staging.s3.us-east-2.amazonaws.com/bucketFolder/bin315a1-pic.jpg
```

---

### Update User

PATCH request

**body**

```
{
    "name" : "NEWNAME",
    "phoneNumber" : "1234567891"
}
```

**return value**

200 status

---

### Delete User

DELETE request

Deletes the user account object, all drives (not rides) that the user posted, and all noti object of user

**params/body**

none required

**return value**

200 status

---

### Check Credential

POST request

**body**

password

```
{
	"password" : "password"
}
```

**return value**

200 status if successful ; 401 if password's incorrect

no further return data

---

### Change Password

PATCH request

**body**

newPassword

```
{
	"newPassword" : "password"
}
```

**return value**

200 status if successful

no further return data

---

### My Info

GET request

**params/body**

none required

**return value**

200 status if successful

```
{
    "username": "bin315a1",
    "name": "Han",
    "email": "bin315a1@g.ucla.edu",
    "createdAt": "2019-08-23T11:27:31.739Z",
    "picUrl": "https://bruinpool-bucket-alpha.s3.us-east-2.amazonaws.com/defaultProfilePic/BruinPoolLogo_blue.png"
}
```

---

### Get rating 
GET request 
- Get the rating of a user

**params/body**
- username 

**example** 
- localhost:3000/users/get-rating?username=elin4046

**return value** 
- An object containing the property averageRating, which is a floating point that is truncated to two decimal points, eg. 2.50 
```
{
    "averageRating": 2.50
}
```

---

### Ride Model

### Schema

| column               | type   | required |
| -------------------- | ------ | -------- |
| ownerEmail           | String | Yes      |
| ownerUsername        | String |          |
| ownerPhoneNumber     | String |          |
| from                 | String | Yes      |
| to                   | String | Yes      |
| date                 | Date   | Yes      |
| price                | String | Yes      |
| seats**(remaining)** | Number | Yes      |
| detail               | String |          |
| passengers           | Array  |          |

### API Endpoints

| url                       | HTTP Method | description                                                               |
| ------------------------- | ----------- | ------------------------------------------------------------------------- |
| /rides/matching-rides     | GET         | [Get List of Available future Rides](#get-list-of-available-future-rides) |
| /rides/user-rides-history | GET         | [Get ANOTHER USER's ride history](#get-another-users-ride-history)        |
| /rides/my-rides-history   | GET         | [Get MY ride history](#get-my-ride-history)                               |
| /rides/my-rides-upcoming  | GET         | [Get MY ride upcoming](#get-my-ride-upcoming)                             |
| /rides/drives-history     | GET         | [Get a user's (OTHER'S AND MINE) drive history](#get-drive-history)       |
| /rides/drives-upcoming    | GET         | [Get a user's (OTHER'S AND MINE) upcoming drives](#get-upcoming-drives)   |
| /rides/post-ride          | POST        | [Post a Ride](#post-a-ride)                                               |
| /rides/join-ride          | PUT         | [Join a Ride](#join-a-ride)                                               |
| /rides/cancel-ride        | PUT         | [Cancel a Ride](#cancel-a-ride)                                           |
| /rides/delete-ride        | DELETE      | [Delete a ride](#delete-a-ride)                                           |

- Note: all get ride apis (with some exception, which will be noted) require a pageNum query param for pagination; index starts at 0

---

### Get List of Available future Rides

GET request

**params**

filter(JSON object with fields: "from", "to", and "date"), pageNum

if FILTER IS UNDEFINED, returns ALL available drives sorted in date/time

filter Schema:

```
    {
        "from": "CITY",
        "to": "CITY",
        "date_from": "TIMERANGE_START",
        "date_to": "TIMERANGE_END"
    }
```

For both "from" and "to" fields, if the field is undefined it is ignored from the filter;
for example, {"from": "Irvine", "to": undefined, ... } will return all rides with any destination that start off in Irvine.

For "date_from" and "date_to" fields, if either is undefined the filter is set to return all available rides ("from" & "to" fields applied) AFTER THE CURRENT TIME (by new Date()).

**exmaple**:

URL syntax:

```
localhost:3000/rides/matching-rides?filter={"from": "Irvine",  "to" : "Los Angeles", "date_from": "2019-09-10T00:00:00.000Z", "date_to":"2019-09-12T00:00:00.000Z"}
```

Get all rides from Irvine to Los Angeles between 8:00 AM to 9:30 AM on 2019-09-13

```
    {
        "from": "Irvine",
        "to": "Los Angeles",
        "date_from": "2019-09-13T08:00:00.000Z",
        "date_to": "2019-09-13T09:30:00.000Z"
    }
```

Get all rides from Irvine to anywhere between 8:00 AM to 9:30 AM on 2019-09-13

```
    {
        "from": "Irvine",
        "date_from": "2019-09-13T08:00:00.000Z",
        "date_to": "2019-09-13T09:30:00.000Z"
    }
```

Get all rides from Irvine to anywhere anytime (after the current timestamp, of course)

```
    {
        "from": "Irvine"
    }
```

localhost:3000/rides/matching-rides?filter=

**return value**

200 status

```
[
    {
        "passengers": [],
        "_id": "5d505ed15482ec4e38597cdb",
        "ownerEmail": "bin315a1@gmail.com",
        "ownerUsername": "bin315a1",
        "ownerPhoneNumber": "1231231234",
        "from": "Irvine",
        "to": "Los Angeles",
        "date": "2019-09-11T00:00:00.000Z",
        "price": "20",
        "seats": 4,
        "detail": "Third test for post",
        "__v": 0
    },
    {
        "passengers": [],
        "_id": "5d505f005482ec4e38597cdc",
        "ownerEmail": "bin315a1@gmail.com",
        "ownerUsername": "bin315a1",
        "ownerPhoneNumber": "1231231234",
        "from": "Irvine",
        "to": "Los Angeles",
        "date": "2019-09-13T00:00:00.000Z",
        "price": "20",
        "seats": 4,
        "detail": "First test for post",
        "__v": 0
    }
]
```

---

### Get ANOTHER USERs ride history

GET request

- DOES NOT take a pageNum param

**params**

username

**example**

localhost:3000/rides/user-rides-history?username=bin315a1

**return value**

200 status with an array of rides that the user with the username had in the past (before current date&time)

---

### Get MY ride history

GET request

**params**

pageNum

**example**

localhost:3000/rides/my-rides-history?pageNum=0

**return value**

200 OK status with an array of rides that the user had in the past (before current date&time)

---

### Get MY ride upcoming

GET request

**params**

pageNum

**example**

localhost:3000/rides/my-rides-history?pageNum=0

**return value**

200 OK status with an array of rides that the user will have in the future (after current date&time)

---

### Get drive history

GET request

**params**

username, pageNum

**example**

localhost:3000/rides/my-rides-history?pageNum=0&username=bin315a1

**return value**

200 OK status with an array of rides that the user was the driver in the past (before current date&time)

---

### Get upcoming drives

GET request

**params**

username, pageNum

**example**

localhost:3000/rides/drives-upcoming?pageNum=0&username=bin315a1

**return value**

200 OK status with an array of rides that the user was the driver will drive in the future (after current date&time)

---

### Post a Ride

POST request

**body**

a new ride object:

```
{
	"rideInfo": {
		"ownerEmail": "bin315a1@gmail.com",
		"ownerUsername": "bin315a1",
		"from": "Irvine",
		"to": "Los Angeles",
		"date": "2019-07-30",
		"price": "20",
		"seats": 4,
		"detail": "Third test for post",
		"passengers": []
	}
}
```

**return value**

201 status

```
{
    "passengers": [],
    "_id": "5d55b5721e78951430fdcc66",
    "ownerEmail": "bin315a1@g.ucla.edu",
    "ownerUsername": "bin315a1",
    "from": "Irvine",
    "to": "Los Angeles",
    "date": "2019-07-30T00:00:00.000Z",
    "price": "10",
    "seats": 4,
    "detail": "before today's date",
    "__v": 0
}
```

---

### Join a Ride

PUT request

**body**

The ride object that the user is trying to join:

```
{
	"ride" : {
        "passengers": [],
        "_id": "5d505ed15482ec4e38597cdb",
        "ownerEmail": "bin315a1@gmail.com",
        "ownerUsername": "bin315a1",
        "ownerPhoneNumber": "1231231234",
        "from": "Irvine",
        "to": "Los Angeles",
        "date": "2019-09-11T00:00:00.000Z",
        "price": "20",
        "seats": 4,
        "detail": "Third test for post",
        "__v": 0

    }
}
```

**return value**

200 status with the same ride object joined

```
{
    "passengers": [
        "bin315a1"
    ],
    "_id": "5d505ed15482ec4e38597cdb",
    "ownerEmail": "bin315a1@gmail.com",
    "ownerUsername": "bin315a1",
    "ownerPhoneNumber": "1231231234",
    "from": "Irvine",
    "to": "Los Angeles",
    "date": "2019-09-11T00:00:00.000Z",
    "price": "20",
    "seats": 3,
    "detail": "Third test for post",
    "__v": 0
}
```

---

### Cancel a Ride

PUT request

**body**

The ride object that the user is trying to cancel:

```
{
	"ride" : {
        "passengers": [
            "bin315a1"
        ],
        "_id": "5d505f0d5482ec4e38597cdd",
        "ownerEmail": "bin315a1@gmail.com",
        "ownerUsername": "bin315a1",
        "ownerPhoneNumber": "1231231234",
        "from": "Irvine",
        "to": "Los Angeles",
        "date": "2019-08-30T00:00:00.000Z",
        "price": "20",
        "seats": 4,
        "detail": "Second test for post",
        "__v": 0
    }
}
```

**return value**

200 status with the same ride object cancelled

---

### Delete a ride

DELETE request

**body**

The ride object that the user is trying to delete (The ride object's owner has to be the logged in user):

```
{
	"ride" : {
        "passengers": [
            "bin315a1"
        ],
        "_id": "5d505f0d5482ec4e38597cdd",
        "ownerEmail": "bin315a1@gmail.com",
        "ownerUsername": "bin315a1",
        "ownerPhoneNumber": "1231231234",
        "from": "Irvine",
        "to": "Los Angeles",
        "date": "2019-08-30T00:00:00.000Z",
        "price": "20",
        "seats": 4,
        "detail": "Second test for post",
        "__v": 0
    }
}
```

**return value**

200 status with a debrief of action:

```
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
```

---

### Noti Model

### Schema

| column               | type    | required |
| -------------------- | ------- | -------- |
| username             | String  | Yes      |
| email                | String  | Yes      |
| msg                  | String  | Yes      |
| passengerPhoneNumber | String  |          |
| passengerEmail       | String  | Yes      |
| viewed               | Boolean | Yes      |

### API Endpoints

| url                      | HTTP Method | description                                                         |
| ------------------------ | ----------- | ------------------------------------------------------------------- |
| /notis/get-driverNotis   | GET         | [Get the notification for driver](#get-driver-notification)         |
| /notis/create-driverNoti | POST        | [Create a new notification for driver](#create-driver-notification) |
| /notis/view-driverNoti   | PUT         | [Modify a notification for driver](#view-driver-notification)       |

---

### Get Driver Notification

GET request

**params/body**

none needed

**return value**

200 status

```
[
    {
        "viewed": false,
        "_id": "5d55bb66261da0092430c990",
        "username": "bin315a1",
        "msg": "bin315a1 has joined your ride",
        "passengerEmail": "bin315a1@g.ucla.edu",
        "date": "2019-08-15T20:07:02.242Z",
        "__v": 0
    },
    {
        "viewed": false,
        "_id": "5d55bb485457802c949bb8f4",
        "username": "bin315a1",
        "msg": "bin315a1 has joined your ride",
        "passengerEmail": "bin315a1@g.ucla.edu",
        "date": "2019-08-15T20:06:32.716Z",
        "__v": 0
    }
]
```

---

### Create Driver Notification

POST request

- most likely not going to be used by frontend

**body**

```
{
    msg: <message>,
    passengerPhoneNumber: <String>,
    passengerEmail: <String>
}
```

**return value**

201 created status with data of the notification created, 500 error if failure

---

### View Driver Notification

PUT request

- After a notification is viewed, it is deleted after a **week**

**params/body**

none needed

**return value**

modifies the "viewed"(set as false by default) field of all notificationsof the user as true, the "nModified" field shows how many noti objects have been set as seen

200 status

```
{
    "n": 9,
    "nModified": 2,
    "ok": 1
}
```
--- 
### Review Model

### Schema

| property               | type     | required | 
| --------------------   | -------- | -------- |
| *reviewerUsername*     | String   | Yes      | 
| *revieweeUsername*     | String   | Yes      |  
| *rideId*               | ObjectId | Yes      | 
| datePosted             | Date     |          | 
| rating                 | Number   |          | 
| comment                | String   |          | 
| isDeclined             | Boolean  |          | 

* Italicized properties uniquely identify a Review document
* A Review document describes whether a reviewer chooses to review a reviewee, and if so, provides the details of the review
* Details on whether the users are drivers or riders in a carpooling session are abstracted 

---
### API Endpoints

| url                                    | HTTP Method | description                                                         
| -------------------------------------- | ----------- | ------------
| /reviews                               | POST        | [Add a review ](#add-review)         
| /reviews                               | GET         | [Get all of a user's reviews](#get-all-reviews)
| /reviews/decline-review                | POST        | [Decline to review a user](#decline-to-review)
| /reviews/get-eligible-users-to-review  | GET         | [Get list of usernames to review](#get-list-of-usernames-to-review)       

---
### Add Review
POST request
- Add a review using the currently logged in account as the reviewer

**params/body** 
- Required fields: revieweeUsername, rideId, and rating 
```
    {
        "revieweeUsername": "elin4046", 
        "rideId": "507f1f77bcf86cd799439011", 
        "rating": 1, 
        "comment": "Driver arrived really late and was super rude!"
    }
```


**return value**

- 200 status code w/ data on the newly created document
- 500 status code w/ database errors or in the case of duplicate reviews

```
{
	"isDeclined": false,
	"_id": "5e1e997e67eae745e865a233",
	"reviewerUsername": "admin", 
	"revieweeUsername": "elin4046",
	"rideId": "507f1f77bcf86cd799439011",
	"rating": 1,
	"comment": "Driver arrived really late and was super rude!",
	"datePosted": "2020-01-15T04:47:58.738Z",
	"__v": 0
}
```

---
### Get all reviews
GET request 
- Get all reviews received by a user 

**params/body** 

username 

**example**

localhost:3000/reviews?username=elin4046

**return value** 

- 200 status code - A list of review documents made to the user, empty [] if none exist.  

```
[
    {
        "isDeclined": false,
        "_id": "5e1ea29e94b3263a60b162da",
        "revieweeUsername": "elin4046",
        "rideId": "507f1f77bcf86cd799439012",
        "rating": 1,
        "comment": "Driver arrived really late and was super rude!",
        "reviewerUsername": "admin",
        "datePosted": "2020-01-15T05:26:54.837Z",
        "__v": 0
    },
    {
        "isDeclined": false,
        "_id": "5e1ea2e494b3263a60b162db",
        "revieweeUsername": "elin4046",
        "rideId": "507f1f77bcf86cd799439013",
        "rating": 4,
        "comment": "A super laid back guy. We had a great conversation the whole time.",
        "reviewerUsername": "admin",
        "datePosted": "2020-01-15T05:28:04.757Z",
        "__v": 0
    }
]
```

---
### Decline to review 
POST request
- Indicate the currently logged in user's decision to not review another user after being prompted to do so 
- This is important to prevent any further notifications 

**params/body** 
- revieweeUsername and the ride's rideId 

**example**

```
{
	"revieweeUsername": "john_smith",  
	"rideId": "507f191e810c19729de860ea"
}
```

**return value** 
- 200 status code w/ data on the newly created Review document
- 500 status code w/ database errors or in the case of duplicate declines 


---
### Get list of usernames to review
GET request 
- Get a list of usernames that may be reviewed using the currently logged in account
- For example: 
	- If a user was a driver in their latest carpooling session, the request will return the usernames of each of his/her passengers 
	- If a user was a passenger in their latest carpooling session, the request will return the username of the driver 
	- If a user has previously **declined** an opportunity to review a passenger, that passenger's username will not be returned 

**params/body**
- none required 

**return value** 
- An object containing a list of eligible usernames and the latest carpooling session's rideId, if there exists one.
	- rideId is a necessary property to uniquely identify a Review document 

```
{
    "usernamesToReview": ["elin4046", "michaelSB", "bin315a1"],
	"rideId": "507f191e810c19729de860ea"
}
```

---
# Deployment

## Deployment Instructions

Currently the website uses Netlify for frontend's deployment and AWS for backend's deployment. Backend Node application uses systemd to maintain app's continuous execution.

**Only the current engineering manager/ specified deployment manager should be able to access deployment servers**

**The servers are set to run continuously; unless there is a major patch or a server malfunction, do not run the following deployment instructions**

### Connecting to AWS EC2 instance

Ask your current engineering manager for the PEM key file, and connect to the instance via SSH with instructions that can be found online.
For root access, also ask your current engineering manager for root access privelages.

### Starting the web server in EC2

1. Switch to root user with:
   `sudo su`
2. Start mongodb daemon with:
   `sudo service mongod start`
3. Start the Node application service with:
   `systemctl start node-80`
   if it indicates an error in mongoose connection, make sure that mongodb.service is running correctly
4. Check that the service is up and running by listing all current running services with:
   `systemctl -r --type service --all`
   and check that node-80.service is active and running

- systemd service file's (for NodeJS app) location:
  /etc/systemd/system/node-80.service
- systemd's environment file's location:
  /root/sec/bruinPool_Backend_envFile
- the application is set to use the port 8080 (http); environment variable for the service is set for port 3000, but NGINX proxies it to port 8080
- the .env file in the server's repo doesn't have to be updated for the web server to work, but can be used with `npm run dev` if the server fails to run node-80.service and you need to check the error log

Further Resources regarding systemctl:
https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/
