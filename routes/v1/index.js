const {Router} = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');

const routes = Router();

routes.get('/status', (req, res) => res.send('OK'));

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);

module.exports = routes;
