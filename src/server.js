const express = require('express');
const mongoose = require('mongoose');

const env = require('./config/Environmet');
const routes = require('./routes');
const server = express();

const connectionString = env.FINDEV_MONGODB_URL;

mongoose.connect(
    connectionString, {
        user: env.FINDEV_MONGODB_USER,
        pass: env.FINDEV_MONGODB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

server.use(express.json());
server.use(routes);
const port = env.FINDEV_BACKEND_PORT | 3333
server.listen(port, () => {
    console.log(`Express server started, Listening on port: ${port}`);
});