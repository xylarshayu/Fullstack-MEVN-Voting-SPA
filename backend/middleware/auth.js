const { TokenExpiredError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let str = process.env.TOKEN_SECRET;
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
      success: false,
      message: "Token not provided"
    });
    jwt.verify(token, str, {algorithms: ['HS256']}, (err, payload) => {

      if(err)
      {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid Token'
        }),
        console.log(err);
      }
       
      if(!mongoose.isValidObjectId(payload._id)) return res.status(403).json({
        success: false,
        message: 'Error in user id at authentication'
      });
      req.user = payload;
      next();
    })
  }
 
  module.exports = authenticateToken;