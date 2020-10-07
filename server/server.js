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
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
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

app.post("/post", (req, res) => {
  const { id, input, inputText } = req.body;
  console.log(input, inputText);
  db.transaction((trx) => {
    trx
      .insert({
        post_id: id,
        title: input,
        text: inputText,
      })
      .into("posts")
      .returning("*")
      .then((post) => {
        return trx("users")
          .where("id", "=", post[0].post_id)
          .increment("entries", 1)
          .returning("entries")
          .then((data) => {
            res.json({
              post: post,
              data: data,
            });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
});

app.post("/getposts", (req, res) => {
  const { id } = req.body;
  db("posts")
    .select("*")
    .where("post_id", "=", id)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
});

app.delete("/delete", (req, res) => {
  db("posts")
    .select("post_id")
    .where("id", "=", req.body.id)
    .then((post) => {
      return db("users")
        .where("id", "=", post[0].post_id)
        .decrement("entries", 1)
        .returning("entries")
        .then((entries) => {
          console.log(entries);
        });
    });
  db("posts")
    .where("id", "=", req.body.id)
    .del()
    .then((delPost) => {
      res.json("deleted");
    })
    .catch((err) => res.status(400));
});

app.listen(3001, () => {
  console.log(`app is runnung on port ${3001}`);
});
