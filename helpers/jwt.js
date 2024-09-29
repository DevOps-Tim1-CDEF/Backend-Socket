require("dotenv").config();
const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "hidup#devops";

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
}

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
}