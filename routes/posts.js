const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/", PostController.create);
router.get("/createdb", PostController.createDB);
router.get("/createtable", PostController.createTable);
router.get("/", PostController.getAll);
router.get("/id/:id", PostController.getById);
router.put("/id/:id", PostController.update);
router.delete("/:id", PostController.delete);

module.exports = router;
