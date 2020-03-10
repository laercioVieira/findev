const httpClient = require("axios");
const Dev = require("../models/DevModel");

module.exports = {
  async list(req, res) {
    const listagem = await Dev.find({}, (error, res) => {
      if (error) {
        console.log(error);
      } else {
        console.debug(res);
      }
    });

    //console.log(listagem);

    return res.json(listagem);
  },

  async index(req, res) {
    try {
      const { user } = req.headers;

      const loggedDev = await Dev.findById(user);

      const users = await Dev.find({
        $and: [
          { _id: { $ne: user } },
          { _id: { $nin: loggedDev.likes } },
          { _id: { $nin: loggedDev.dislikes } }
        ]
      });

      return res.json(users);
    } catch (error) {
      return res.json({ ok: false, error: error });
    }
  },

  async save(req, res) {
    const { username } = req.body;

    try {
      const response = await httpClient.get(
        `https://api.github.com/users/${username}`
      );
      const { name, bio, avatar_url: avatar } = response.data;

      const persistedUser = await Dev.findOne({
        user: username
      });
      if (persistedUser) {
        return res.json(persistedUser);
      }

      const dev = await Dev.create({
        name: name || "(não informado)",
        user: username,
        bio,
        avatar
      });

      return res.json(dev);
    } catch (error) {
      return res.json({
        ok: false,
        error: error
      });
    }
  }
};
