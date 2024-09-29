const { verifyToken } = require('../helpers/jwt');
const userModel = require('../models/user');

exports.authentication = async (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token){
    return res.status(401).json({message: "Token not provided"});
  }

  try{
    const decode = verifyToken(token);
    const user = await userModel.findOne({
      _id: decode.id,
      active: 1,
    });
    if (user){
      req.userData = user;
      next();
    }
    else{
      throw {
        code: 401,
        name: "Authentication Error",
        message: `User with id ${decode.id} not found in database`,
      }
    }
  } catch (e) {
    res.status(401).json(e);
  }
};