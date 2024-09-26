const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJs = require("crypto-js");
const userModel = require("../models/user");

exports.register = (req, res) => {
  const user = new userModel({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    nama: req.body.nama,
    profile: req.body.profile,
    email: req.body.email,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User Created",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error",
        data: error,
      });
    });
};

exports.login = (req, res) => {
  userModel.findOne({ username: req.body.username, active: 1 }).then((user) => {
    if (!user) {
      res.status(404).json({
        message: "User Tidak Ditemukan",
      });
    } else {
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Password Salah" });
      } else {
        let token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
          expiresIn: "12h",
        });

        res.status(200).json({
          message: "Login Berhasil",
          token: token,
          idUser: user._id,
        });
      }
    }
  });
};

exports.profile = (req, res) => {
  userModel.findById(req.body.idUser).then((user) => {
    if (user) {
      res.status(200).json({
        message: "Berhasil Menampilkan Profile",
        data: user,
      });
    } else {
      res.status(404).json({
        message: "User Tidak Ditemukan",
      });
    }
  });
};
