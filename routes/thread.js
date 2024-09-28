const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");

// router.post("/snippet", threadController.addSnippet);
router.post('/add', threadController.postThread);
router.get('/', threadController.getThreads);
router.get('/:id', threadController.findThread);

module.exports = router;