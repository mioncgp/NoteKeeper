handleDelete = (req, res) => {
  db("posts")
    .select("post_id")
    .where("id", "=", req.body.id)
    .then((post) => {
      return db("users")
        .where("id", "=", post[0].post_id)
        .decrement("entries", 1)
        .returning("entries")
        .then((entries) => {});
    });
  db("posts")
    .where("id", "=", req.body.id)
    .del()
    .then((delPost) => {
      res.json("deleted");
    })
    .catch((err) => res.status(400));
};

module.exports = {
  handleDelete: this.handleDelete,
};
