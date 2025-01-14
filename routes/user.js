const userController = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/profile", userController.profile);

// Percobaan ArgoCd
router.get("/", (req, res) => {
  res.send("Percobaan Argocd berhasil");
});

module.exports = router;
