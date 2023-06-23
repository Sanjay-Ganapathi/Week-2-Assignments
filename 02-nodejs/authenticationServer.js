/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

module.exports = app;
let userDatastore = [];

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello Authentication Server");
});

app.post("/signup", (req, res) => {
  user = req.body;
  const userExists = userDatastore.some((userData) => {
    return userData.username === user.username;
  });

  if (userExists) {
    res.status(400).json({ message: "Username already exists" });
  } else {
    const uuid = Math.random().toString(36).substring(2);
    userDatastore.push({ ...user, id: uuid });
    res.status(201).send("Signup successful");
    console.log(userDatastore);
  }
});

app.post("/login", (req, res) => {
  user = req.body;
  const userExists = userDatastore.some((userData) => {
    return userData.email === user.email && userData.password === user.password;
  });
  if (userExists) {
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);
    return res.status(200).json({ token: token });
  } else return res.status(401).json({ message: "Invalid Credentials" });
});

app.get("/data", (req, res) => {
  const email = req.headers.email;
  const password = req.headers.password;

  const userExists = userDatastore.some((userData) => {
    return userData.email === email && userData.password === password;
  });

  if (userExists) {
    usersToSend = [];
    userDatastore.forEach((userData) => {
      usersToSend.push({
        id: userData.id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    });

    return res.status(200).send(usersToSend);
  } else {
    return res.status(401).send("Unauthorized");
  }
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
