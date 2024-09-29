const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");
const {authentication} = require("../middlewares/auth");

router.post('/', authentication, threadController.postThread);
router.get('/', threadController.getThreads);
router.get('/:id', threadController.findThread);

module.exports = router;