const Dev = require("../models/DevModel");
module.exports = {
  async save(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;
    console.log(user);
    console.log(devId);

    const loggedUser  = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res
        .status(400)
        .json({ error: "Target Dev to give like does not exists" });
    }

    loggedUser.dislikes.push(targetDev._id);
    await loggedUser.save();

    return res.json({
      loggedUser
    });
  }
};
