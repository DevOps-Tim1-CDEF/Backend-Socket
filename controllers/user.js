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
      let title = error.name;
      let message = error.message;
      
      if (message.toLowerCase().includes('duplicate key')){
        title = "Username/Email Already Exist!";
        message = "Please use another username or email to register your new account."
      }
      else if (message.toLowerCase().includes('validation')){
        title = "Empty Field!";
        message = "Please fill in your Registration info."
      }

      res.status(500).json({
        title,
        message,
      });
    });
};

exports.login = (req, res) => {
  userModel.findOne({ username: req.body.username, active: 1 }).then((user) => {
    if (!user) {
      res.status(404).json({
        title: "Login Failed!",
        message: "Wrong username. Please check again",
      });
    } else {
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          title: "Login Failed!",
          message: "Wrong password. Please check again",
        });
      } else {
        let token = jwt.sign({ id: user.id }, "hidup#devops", {
          expiresIn: "12h",
        });

        res.status(200).json({
          message: "Login Berhasil",
          token: token,
          idUser: user._id,
          data: user,
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
