const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const deletePost = require("./controllers/deletePost");
const posts = require("./controllers/posts");

// connect to db
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "usa",
    database: "note-keeper",
  },
});

// init our express server
const app = express();

// enable middleware
app.use(bodyParser.json());
app.use(cors());

// sign in endpoint
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// retrieves profile from db endpoint
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

// add a post endpoint
app.post("/post", (req, res) => {
  posts.addPost(req, res, db);
});

// get all posts endpoint
app.post("/getposts", (req, res) => {
  posts.getPosts(req, res, db);
});

// register a user endpont
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// delete post endpoint
app.delete("/delete", (req, res) => {
  deletePost.handleDelete(req, res, db);
});

app.listen(3001, () => {
  console.log(`app is runnung on port ${3001}`);
});
