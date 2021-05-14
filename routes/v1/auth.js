const {Router} = require('express');
const AuthController = require("../../controllers/AuthController");

const router = Router();
//Login route
router.post("/login", AuthController.login);

router.post("/logout", AuthController.logout);

router.post("/register", AuthController.register);
module.exports =  router;
