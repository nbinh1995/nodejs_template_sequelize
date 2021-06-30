const {Router} = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const checkJwtMiddleware = require('../../middlewares/checkJwtMiddleware');
const routes = Router();

routes.get('/status', (req, res) => res.send('OK'));

routes.use("/auth", authRoutes);
routes.use("/user",checkJwtMiddleware, userRoutes);

module.exports = routes;
