const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");

router.post('/', threadController.postThread);
router.get('/', threadController.getThreads);
router.get('/:id', threadController.findThread);

module.exports = router;