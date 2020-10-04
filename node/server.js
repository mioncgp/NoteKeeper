const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
// const register = require("./controllers/register");
// const signin = require("./controllers/signin");
// const profile = require("./controllers/profile");
// const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "usa",
    database: "note-keeper",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("lol");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("*")
    .from("login")
    .where("email", "=", email)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("something went wrong");
      }
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .select("*")
    .where("id", "=", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("something went wrong");
      }
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.put("/posts", (req, res) => {
  const { post_id } = req.body;
  db("posts")
    .select("*")
    .where("post_id", "=", post_id)
    .then((posts) => {
      if (posts.length) {
        res.json(posts[0]);
      } else {
        res.status(400).json("something went wrong");
      }
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db("users")
    .returning("*")
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then((user) => res.json(user[0]))
    .catch((err) => res.status(400).json("unable to register"));
});

app.listen(3001, () => {
  console.log(`app is runnung on port ${3001}`);
});
