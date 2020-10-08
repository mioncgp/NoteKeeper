handleProfile = (req, res) => {
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
};

module.exports = {
  handleProfile: this.handleProfile,
};
