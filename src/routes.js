const express = require("express")
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ message: `Hello World! ${req.query.nome}`});
});

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.save);
routes.post('/devs/:devId/likes', LikeController.save);
routes.post('/devs/:devId/dislikes', DislikeController.save);

module.exports = routes;