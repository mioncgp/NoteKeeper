const addPost = (req, res, db) => {
  const { id, input, inputText } = req.body;
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
};

const getPosts = (req, res, db) => {
  const { id } = req.body;
  db("posts")
    .select("*")
    .where("post_id", "=", id)
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400));
};

module.exports = {
  addPost: addPost,
  getPosts: getPosts,
};
