const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");
const { authentication } = require("../middlewares/auth");

router.post("/posting", authentication, threadController.postThread);
router.post("/", threadController.getThreads);
router.get("/:id", threadController.findThread);

module.exports = router;
