const { Router } = require("express");
const UserController = require("../../controllers/UserController");

const router = Router();

//Get all users
router.get("/", UserController.list);

// Get one user
router.get(
  "/:id([0-9]+)",
  UserController.show
);

//Create a new user
router.post("/", UserController.store);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  UserController.update
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  UserController.delete
);

module.exports = router;
